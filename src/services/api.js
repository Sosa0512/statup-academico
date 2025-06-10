const API_URL = "http://localhost:3000";

export async function loginUser(email, password) {
    const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
    const data = await res.json();
    if (data.length > 0) {
        return data[0];
    } else {
        throw new Error("Usuario o contraseña incorrectos");
    }
}

export async function registerUser(userData) {
    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Error al registrar usuario");
    return await res.json();
}

export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    return await res.json();
}

export async function createTask(task) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return await res.json();
}

export async function updateTask(id, updatedTask) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
    });
    return await res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}