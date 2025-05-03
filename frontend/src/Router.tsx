import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSistema from "./components/generales/LoginSistema" // Página de login
import PaginaInicio from "./components/generales/PaginaInicio"; // Página de inicio
import ProtectedRoute from "./ProtectorRutas"; // Componente para proteger rutas
import Formularios from "./components/generales/formularios";


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/inicio" element={<PaginaInicio />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/formulario" element={<Formularios />} />
        </Route>
        <Route path="/login" element={<LoginSistema />} />
        <Route path="/" element={<LoginSistema />} />
      </Routes>

    </Router>
  );
}

export default AppRouter;
