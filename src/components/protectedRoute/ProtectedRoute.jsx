import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import BarraNavegacion from '../barraNavegacion/BarraNavegacion'; // Ajusta la ruta según tu estructura

const ProtectedRoute = () => {
    const usuario = localStorage.getItem('usuarioLogueado');

    // Si no hay usuario, lo saca al login
    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    // Si SÍ hay usuario, muestra la barra de navegación arriba y la página protegida correspondiente abajo (<Outlet />)
    return (
        <>
            <BarraNavegacion />
            <Outlet />
        </>
    );
}

export default ProtectedRoute;