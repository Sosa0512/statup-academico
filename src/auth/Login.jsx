import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`http://localhost:3000/usuarios?usuario=${usuario}&contrasena=${contrasena}`);
            if (!res.ok) throw new Error('Servidor no disponible');

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
            <h2>Iniciar sesión</h2>
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
            <p>¿No tienes cuenta?{' '}
                <button
                    onClick={() => navigate('/register')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#007bff',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                >
                    Regístrate
                </button>
            </p>
        </div>
    );
}

export default Login;
