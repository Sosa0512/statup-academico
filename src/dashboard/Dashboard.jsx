import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tasks as taskData } from '../services/database';
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

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            // Simula fetch: filtra solo las tareas del usuario actual
            const userTasks = taskData.filter(t => t.userId === user.id);
            setTasks(userTasks);
        }
    }, [user]);

    const filteredTasks = tasks.filter(task => {
        const matchSubject = task.subject.toLowerCase().includes(filter.subject.toLowerCase());
        const matchStatus = filter.status ? task.status === filter.status : true;
        return matchSubject && matchStatus;
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleComplete = (id) => {
        const index = taskData.findIndex(t => t.id === id);
        if (index !== -1) {
            taskData[index].status = 'completada';
            refreshTasks();
        }
    };

    const handleDelete = (id) => {
        const index = taskData.findIndex(t => t.id === id);
        if (index !== -1) {
            taskData.splice(index, 1);
            refreshTasks();
        }
    };

    const handleEdit = (task) => {
        setEditing(task);
    };

    const refreshTasks = () => {
        const userTasks = taskData.filter(t => t.userId === user.id);
        setTasks(userTasks);
        setEditing(null);
    };

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