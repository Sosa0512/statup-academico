import TaskCard from './TaskCard';

function TaskList({ tasks, onComplete, onDelete, onEdit }) {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}

export default TaskList;