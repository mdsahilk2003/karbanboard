import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useMemo } from 'react';
import TaskCard from './TaskCard';
import { Status, Task } from './types.ts';
import { Plus } from 'lucide-react';

interface ColumnProps {
    status: Status;
    tasks: Task[];
    deleteTask: (id: string) => void;
    updateTaskTitle: (id: string, newTitle: string) => void;
    createTask: (status: Status) => void;
}

const Column = ({ status, tasks, deleteTask, updateTaskTitle, createTask }: ColumnProps) => {
    const tasksIds = useMemo(() => tasks.map((task) => task._id), [tasks]);

    const { setNodeRef } = useDroppable({
        id: status,
        data: {
            type: 'Column',
            status,
        },
    });

    const getStyles = (status: Status) => {
        switch (status) {
            case 'Todo': return { headerClass: 'header-todo', borderClass: 'border-todo' };
            case 'In Progress': return { headerClass: 'header-inprogress', borderClass: 'border-inprogress' };
            case 'Done': return { headerClass: 'header-done', borderClass: 'border-done' };
            default: return { headerClass: '', borderClass: '' };
        }
    };

    const { headerClass, borderClass } = getStyles(status);

    return (
        <div ref={setNodeRef} className="column">
            {/* Header */}
            <div className={`column-header ${headerClass}`}>
                <div className="flex items-center">
                    <span>{status}</span>
                    <span className="count-badge">{tasks.length}</span>
                </div>
                <button
                    className="header-icon-btn"
                    onClick={() => createTask(status)}
                    aria-label="Add Task"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Body */}
            <div className="column-body">
                {/* Inline Add Button at Top */}
                <button
                    className="add-card-btn-inline"
                    onClick={() => createTask(status)}
                >
                    <Plus size={18} />
                    <span>Add Card</span>
                </button>

                <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTaskTitle={updateTaskTitle}
                            borderClass={borderClass}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};

export default Column;
