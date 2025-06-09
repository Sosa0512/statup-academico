import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        navigate('/');
    };

    return (
        <form onSubmit={handleRegister} className="form">
            <h2>Registro</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
        </form>
    );
}

export default Register;