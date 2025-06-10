function TaskSummary({ tasks }) {
    const total = tasks.length;
    const completadas = tasks.filter(t => t.status === 'completada').length;
    const pendientes = tasks.filter(t => t.status === 'pendiente').length;

    return (
        <div className="task-summary">
            <p>Total: {total}</p>
            <p>Completadas: {completadas}</p>
            <p>Pendientes: {pendientes}</p>
        </div>
    );
}

export default TaskSummary;