import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
        const data = await res.json();
        if (data.length > 0) {
            localStorage.setItem('user', JSON.stringify(data[0]));
            navigate('/dashboard');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <form onSubmit={handleLogin} className="form">
            <h2>Iniciar Sesión</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button type="submit">Ingresar</button>
            <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
        </form>
    );
}

export default Login;
