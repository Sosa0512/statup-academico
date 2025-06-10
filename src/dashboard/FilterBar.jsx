function FilterBar({ filter, setFilter }) {
    return (
        <div className="filter-bar">
            <input
                placeholder="Filtrar por materia"
                value={filter.subject}
                onChange={e => setFilter({ ...filter, subject: e.target.value })}
            />
            <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
                <option value="">Todos</option>
                <option value="pendiente">Pendientes</option>
                <option value="completada">Completadas</option>
            </select>
        </div>
    );
}

export default FilterBar;
