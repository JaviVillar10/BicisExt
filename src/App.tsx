import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import CrearRutaPage from './pages/dashboard/CrearRutaPage';
import MisRutasPage from './pages/dashboard/MisRutasPage';
import PerfilPage from './pages/dashboard/PerfilPage';
import RutaDetallePage from './pages/dashboard/RutaDetallePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<SignUpPage />} />

       <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="crear" element={<CrearRutaPage />} />
          <Route path="mis-rutas" element={<MisRutasPage />} />
          <Route path="perfil" element={<PerfilPage />} />
          <Route path="/dashboard/rutas/:id" element={<RutaDetallePage />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;