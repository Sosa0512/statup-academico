import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FilterBar from './FilterBar';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskSummary from './TaskSummary';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({ subject: '', status: '' });
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchTasks = async () => {
        const res = await fetch(`http://localhost:3000/tasks?userId=${user.id}`);
        const data = await res.json();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter(task => {
        const matchSubject = task.subject.toLowerCase().includes(filter.subject.toLowerCase());
        const matchStatus = filter.status ? task.status === filter.status : true;
        return matchSubject && matchStatus;
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleComplete = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'completada' })
        });
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
        fetchTasks();
    };

    const handleEdit = (task) => {
        setEditing(task);
    };

    const refreshTasks = () => {
        setEditing(null);
        fetchTasks();
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Panel de Tareas</h1>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>

            <FilterBar filter={filter} setFilter={setFilter} />
            <TaskForm editing={editing} onRefresh={refreshTasks} />
            <TaskSummary tasks={filteredTasks} />
            <TaskList
                tasks={filteredTasks}
                onComplete={handleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default Dashboard;