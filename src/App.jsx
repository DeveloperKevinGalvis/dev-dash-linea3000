import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

import DashBoard from './pages/dashboard/DashBoard';
import LoginPage from './pages/login/LoginPage';

const App = () => {
  const usuarioLogueado = localStorage.getItem('usuarioLogueado');

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta del Login: Si ya inició sesión, lo rebota al dashboard */}
        <Route 
          path="/" 
          element={usuarioLogueado ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />

        {/* Grupo de Rutas Protegidas: Aquí se inyecta automáticamente la barra de navegación */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
          {/* Aquí puedes agregar más páginas protegidas en el futuro y todas tendrán la barra */}
        </Route>

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;