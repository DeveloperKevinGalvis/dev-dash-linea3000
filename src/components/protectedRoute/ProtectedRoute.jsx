import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import BarraNavegacion from '../barraNavegacion/BarraNavegacion';

const ProtectedRoute = () => {
    const usuario = localStorage.getItem('usuarioLogueado');
    // Creamos el estado global de la sesión aquí para compartirlo
    const [estadoActual, setEstadoActual] = useState('disponible');

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            {/* Le pasamos el estado actual a la barra */}
            <BarraNavegacion estadoActual={estadoActual} />
            {/* Compartimos el estado y la función para modificarlo a las páginas hijas (<Outlet>) */}
            <Outlet context={{ estadoActual, setEstadoActual }} />
        </>
    );
};

export default ProtectedRoute;