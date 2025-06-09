import Swal from 'sweetalert2';

function TaskCard({ task, onComplete, onDelete, onEdit }) {
    const confirmDelete = () => {
        Swal.fire({
            title: '¿Eliminar tarea?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar'
        }).then(result => {
            if (result.isConfirmed) {
                onDelete(task.id);
            }
        });
    };

    return (
        <div className="task-card">
            <h4>{task.title}</h4>
            <p>Materia: {task.subject}</p>
            <p>Fecha límite: {task.dueDate}</p>
            <p>Estado: {task.status}</p>
            <button onClick={() => onEdit(task)}>Editar</button>
            {task.status !== 'completada' && <button onClick={() => onComplete(task.id)}>Completar</button>}
            <button onClick={confirmDelete}>Eliminar</button>
        </div>
    );
}

export default TaskCard;