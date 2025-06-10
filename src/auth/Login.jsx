import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3000/usuarios?email=" + email + "&password=" + password);
            const data = await response.json();

            if (data.length > 0) {
                const user = data[0];
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard");
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (err) {
            console.error(err);
            setError("Ocurrió un error al iniciar sesión");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Ingresar</button>

                {/* 👉 Enlace de registro */}
                <p className="auth-switch">
                    ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
