// ProtectedRoute.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const accessToken = localStorage.getItem('accessToken');
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate("/login", { replace: true });
        } else if (tipoUsuario === "Administrador") {
            navigate("/inicio", { replace: true });
        } else if (tipoUsuario === "Profesor") {
            navigate("/formulario", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    }, [accessToken, tipoUsuario, navigate]);

    // Si no hay redirección, renderiza las rutas hijas
    return <Outlet />;
};

export default ProtectedRoute;