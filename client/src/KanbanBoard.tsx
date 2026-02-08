import { useEffect, useState, useMemo } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import axios from 'axios';
import Column from './Column';

import { Task, Status } from './types.ts';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const columns: Status[] = useMemo(() => ['Todo', 'In Progress', 'Done'], []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            const sortedTasks = response.data.sort((a: Task, b: Task) => a.order - b.order);
            setTasks(sortedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createTask = async (status: Status) => {
        const newTask = {
            title: `New ${status} Task`,
            status,
            order: tasks.filter((t) => t.status === status).length,
        };

        try {
            const response = await axios.post('/api/tasks', newTask);
            setTasks([...tasks, response.data]);
        } catch (error: any) {
            console.error('Error creating task:', error);
            const serverMessage = error.response?.data?.message || error.message;
            alert(`Failed to add card. Error: ${serverMessage}`);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateTaskTitle = async (id: string, newTitle: string) => {
        const updatedTasks = tasks.map((task) => {
            if (task._id === id) return { ...task, title: newTitle };
            return task;
        });
        setTasks(updatedTasks);
        try {
            await axios.put(`/api/tasks/${id}`, { title: newTitle });
        } catch (error) {
            console.error('Error updating task title:', error);
        }
    };

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task);
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';
        const isOverColumn = over.data.current?.type === 'Column'; // Identify if we are over a column

        if (!isActiveTask) return;

        // Moving a task over another task
        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t._id === activeId);
                const overIndex = tasks.findIndex((t) => t._id === overId);

                if (tasks[activeIndex].status !== tasks[overIndex].status) {
                    const updatedTasks = [...tasks];
                    updatedTasks[activeIndex].status = tasks[overIndex].status;
                    return arrayMove(updatedTasks, activeIndex, overIndex);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        // Moving a task over an empty column or column container
        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t._id === activeId);
                const updatedTasks = [...tasks];

                // If the task is not already in this column
                if (updatedTasks[activeIndex].status !== overId) {
                    updatedTasks[activeIndex].status = overId as Status;
                    // No need to change index significantly, just update status
                    // Depending on implementation, we might want to put at end of list?
                    return arrayMove(updatedTasks, activeIndex, activeIndex);
                }
                return updatedTasks;
            });
        }
    };

    const onDragEnd = async (event: DragEndEvent) => {
        setActiveTask(null);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // We assume the state `tasks` is already updated by `onDragOver` for visual changes (order and status).
        // Now we must persist this order to the backend.

        // However, getting the LATEST valid `tasks` state inside onDragEnd might be tricky if based on closure.
        // The `tasks` variable here comes from the render cycle where `onDragEnd` was created. A re-render happens on every dragOver change.
        // So `tasks` SHOULD be up to date.

        // But `setTasks` is asynchronous. The last `onDragOver` might have triggered a state update that hasn't re-rendered yet?
        // Usually dnd-kit handles this smoothly.

        // Let's identify the task that moved.
        const task = tasks.find((t) => t._id === activeId);
        if (!task) return;

        // We need to saving the order of ALL tasks in the relevant column to be safe.
        const relevantTasks = tasks.filter(t => t.status === task.status); // task.status is now the NEW status (if onDragOver worked)

        // Wait, if I just dropped it, `tasks` state has the new order.
        // So I iterate through `relevantTasks` and update their orders in backend.

        // Optimization: check if anything actually changed?
        // Just update everything for robustness in this demo.

        relevantTasks.forEach((t, index) => {
            axios.put(`/api/tasks/${t._id}`, {
                status: t.status,
                order: index
            }).catch(err => console.error(err));
        });
    };

    return (
        <div className="kanban-board-container min-h-screen bg-gray-100 p-8">
            <div className="kanban-header mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Kanban Board</h1>
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="kanban-board flex gap-6 overflow-x-auto pb-4 items-start justify-center">
                    {columns.map((colId) => (
                        <Column
                            key={colId}
                            status={colId}
                            tasks={tasks.filter((task) => task.status === colId)}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            updateTaskTitle={updateTaskTitle}
                        />
                    ))}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeTask && (
                            <div className="drag-overlay-card opacity-80 rotate-3">
                                <div className="task-card bg-white p-4 rounded-lg shadow-xl border-2 border-indigo-500 cursor-grabbing">
                                    <div className="task-content">
                                        <div className="task-title text-gray-800 font-medium">{activeTask.title}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
