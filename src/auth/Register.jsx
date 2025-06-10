import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarUsuario, usuarios } from '../services/api.js';

function Register() {
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const existe = usuarios.some(u => u.usuario === usuario);
        if (existe) {
            setError('El nombre de usuario ya está en uso.');
            return;
        }

        const nuevoUsuario = {
            id: crypto.randomUUID(),
            nombre,
            usuario,
            contrasena
        };

        agregarUsuario(nuevoUsuario);
        localStorage.setItem('user', JSON.stringify(nuevoUsuario));
        navigate('/dashboard');
    };

    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
