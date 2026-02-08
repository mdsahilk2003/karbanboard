import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash } from 'lucide-react';
import { Task } from './types';

interface TaskCardProps {
    task: Task;
    deleteTask: (id: string) => void;
    updateTaskTitle: (id: string, newTitle: string) => void;
    borderClass?: string;
}

const TaskCard = ({ task, deleteTask, updateTaskTitle, borderClass }: TaskCardProps) => {
    const [editMode, setEditMode] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task._id,
        data: {
            type: 'Task',
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode(true);
    };

    const handleBlur = () => {
        setEditMode(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setEditMode(false);
        }
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={`task-card dragging ${borderClass}`}
            >
                <div className="task-content opacity-0">
                    {/* Invisible content to maintain size */}
                    {task.title}
                </div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`task-card ${borderClass}`}
        >
            <div className="task-content">
                {editMode ? (
                    <textarea
                        className="edit-input"
                        value={task.title}
                        autoFocus
                        onFocus={(e) => {
                            if (task.title.startsWith('New ') && task.title.endsWith(' Task')) {
                                e.target.select();
                            }
                        }}
                        onBlur={(e) => {
                            if (!e.target.value.trim()) {
                                updateTaskTitle(task._id, `New ${task.status} Task`);
                            }
                            handleBlur();
                        }}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => updateTaskTitle(task._id, e.target.value)}
                    />
                ) : (
                    <div
                        onClick={toggleEditMode}
                        className="task-title"
                    >
                        {task.title}
                    </div>
                )}
                <button
                    onClick={() => deleteTask(task._id)}
                    className="delete-btn"
                    aria-label="Delete task"
                >
                    <Trash size={16} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
