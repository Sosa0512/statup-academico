import { useEffect, useState } from 'react';

function TaskForm({ editing, onRefresh }) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (editing) {
            setTitle(editing.title);
            setSubject(editing.subject);
            setDueDate(editing.dueDate);
        }
    }, [editing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const task = { title, subject, dueDate, status: 'pendiente', userId: user.id };

        const url = editing
            ? `http://localhost:3000/tasks/${editing.id}`
            : 'http://localhost:3000/tasks';
        const method = editing ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        setTitle('');
        setSubject('');
        setDueDate('');
        onRefresh();
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h3>{editing ? 'Editar Tarea' : 'Nueva Tarea'}</h3>

            <div className="form-group">
                <label>Título</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Título"
                    required
                />
            </div>

            <div className="form-group">
                <label>Materia</label>
                <input
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Materia"
                    required
                />
            </div>

            <div className="form-group">
                <label>Fecha Límite</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    required
                />
            </div>

            <button type="submit">
                {editing ? 'Actualizar' : 'Crear'}
            </button>
        </form>
    );
}

export default TaskForm;