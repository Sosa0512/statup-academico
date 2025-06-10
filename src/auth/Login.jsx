import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarios } from '../services/database';

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
        if (user) {
            onLogin(user);
            navigate('/dashboard');
        } else {
            alert('Credenciales inválidas');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
            <button type="submit">Ingresar</button>
        </form>
    );
}

export default Login;
