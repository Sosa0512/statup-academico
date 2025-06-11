export let usuarios = [
    {
        id: '1',
        nombre: 'Samuel Torres',
        usuario: 'admin',
        contrasena: 'admin'
    },
    {
        id: '2',
        nombre: 'Sofia Perez',
        usuario: 'sofia',
        contrasena: 'sofia'
    }
];

export let tareas = [
    {
        id: 't1',
        userId: '1',
        subject: 'Matemáticas',
        description: 'Resolver integrales',
        status: 'pendiente'
    },
    {
        id: 't2',
        userId: '1',
        subject: 'Historia',
        description: 'Leer capítulo 3',
        status: 'completada'
    }
];

export function agregarUsuario(nuevoUsuario) {
    usuarios.push(nuevoUsuario);
}

export function obtenerTareasPorUsuario(userId) {
    return tareas.filter(t => t.userId === userId);
}

export function agregarTarea(nuevaTarea) {
    tareas.push(nuevaTarea);
}

export function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
}

export function actualizarTarea(id, camposActualizados) {
    tareas = tareas.map(t => (t.id === id ? { ...t, ...camposActualizados } : t));
}

export function obtenerTareaPorId(id) {
    return tareas.find(t => t.id === id);
}
