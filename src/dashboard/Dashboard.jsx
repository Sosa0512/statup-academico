import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import FilterBar from './FilterBar';
import Sidebar from './Sidebar';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskSummary from './TaskSummary';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({ subject: '', status: '' });
    const [activeView, setActiveView] = useState('tasks'); // 'tasks' | 'summary' | 'form' | 'filter'
    const navigate = useNavigate();

    // Redirigir si no hay sesión
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="dashboard-layout">
            <Sidebar setActiveView={setActiveView} />

            <div className="dashboard-main">
                <div className="dashboard-header">
                    <h1>Panel de Tareas</h1>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user');
                            navigate('/');
                        }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>

                {activeView === 'filter' && (
                    <div className="dashboard-section">
                        <FilterBar filter={filter} setFilter={setFilter} />
                    </div>
                )}

                {activeView === 'form' && (
                    <div className="dashboard-section">
                        <TaskForm setTasks={setTasks} />
                    </div>
                )}

                {activeView === 'tasks' && (
                    <div className="dashboard-section">
                        <TaskList
                            tasks={tasks}
                            onComplete={(id) =>
                                setTasks(prev =>
                                    prev.map(t =>
                                        t.id === id ? { ...t, status: 'completada' } : t
                                    )
                                )
                            }
                            onDelete={(id) =>
                                setTasks(prev => prev.filter(t => t.id !== id))
                            }
                            onEdit={(updatedTask) =>
                                setTasks(prev =>
                                    prev.map(t => t.id === updatedTask.id ? updatedTask : t)
                                )
                            }
                        />
                    </div>
                )}

                {activeView === 'summary' && (
                    <div className="dashboard-section">
                        <TaskSummary tasks={tasks} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
