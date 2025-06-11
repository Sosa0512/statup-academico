import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/usuarios?usuario=${usuario}`);
            const data = await res.json();

            if (data.length > 0) {
                setError('El usuario ya existe');
                return;
            }

            const nuevoUsuario = { nombre, usuario, contrasena };

            const createRes = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoUsuario)
            });

            const createdUser = await createRes.json();

            alert("Registro exitoso. Bienvenido a la plataforma.");
            navigate('/dashboard');
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={handleRegister} className="form">
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Usuario"
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

            <p className="auth-switch">
                ¿Ya tienes cuenta?{' '}
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#007bff',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: '1rem'
                    }}
                >
                    Inicia sesión
                </button>
            </p>
        </div>
    );
}

export default Register;
