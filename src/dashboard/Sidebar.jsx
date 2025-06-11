import './Sidebar.css';

const Sidebar = ({ setActiveView, onLogout }) => {
    return (
        <div className="sidebar">
            <h2>Menú</h2>
            <button onClick={() => setActiveView('filter')}>Filtrar tareas</button>
            <button onClick={() => setActiveView('form')}>Nueva tarea</button>
            <button onClick={() => setActiveView('tasks')}>Lista de tareas</button>
            <button onClick={() => setActiveView('summary')}>Resumen</button>
            <hr />
            <button onClick={onLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Sidebar;
