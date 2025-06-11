import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/usuarios?usuario=${usuario}&contrasena=${contrasena}`);
            const data = await res.json();

            if (data.length > 0) {
                localStorage.setItem('user', JSON.stringify(data[0]));
                navigate('/dashboard');
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Entrar</button>
            </form>

            {/* 🔽 Agregado: botón de registro */}
            <div className="auth-switch">
                ¿No tienes una cuenta?{' '}
                <button
                    onClick={() => navigate('/register')}
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
                    Regístrate
                </button>
            </div>
        </div>
    );
}

export default Login;

