import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? <Navigate to="/dashboard" /> : children;
};

function AppRouter() {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* Ruta protegida */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Ruta por defecto para cualquier URL no válida */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRouter;
