import React from 'react';
import { Link } from 'react-router-dom';
import BarraCss from './barraNavegacionStyle.module.css';

const BarraNavegacion = ({ estadoActual }) => {
    const usuarioData = JSON.parse(localStorage.getItem('usuarioLogueado')) || {};

    const nombreUsuario = usuarioData.nombre || 'Kevin David Zambrano Galvis';
    const cargoUsuario = usuarioData.cargo || 'Soporte Sitio';
    
    // Función para transformar el ID en minúscula a texto con formato visual
    const formatearTextoEstado = (estado) => {
        switch (estado) {
            case 'disponible': return 'Disponible';
            case 'almuerzo': return 'Almuerzo';
            case 'break': return 'Break';
            case 'otras': return 'Otra Actividades';
            default: return 'Disponible';
        }
    };

    const estadoTexto = formatearTextoEstado(estadoActual);

    const obtenerColorEstado = (estado) => {
        switch (estado) {
            case 'Disponible': return '#198754';
            case 'Almuerzo': return '#0d6efd';
            case 'Break': return '#ffc107';
            case 'Otra Actividades': return '#6c757d';
            default: return '#198754';
        }
    };

    return (
        <nav className={BarraCss.containerBarra}>
            <div className={BarraCss.barraTitulos}>
                <p>{nombreUsuario} | {cargoUsuario}</p>
                <div className={BarraCss.Estado} style={{ backgroundColor: obtenerColorEstado(estadoTexto) }}>
                    <p>{estadoTexto}</p>
                </div>
            </div>
            <ul className={BarraCss.barraNavegacion}>
                <li className={BarraCss.liBarra}>
                    <Link to="/dashboard" className={BarraCss.linkBarra}>
                        <i className="bi bi-speedometer2"></i> Tu DashBoard
                    </Link>
                </li>
                <li className={BarraCss.liBarra}>
                    <Link to="/mallaTurno" className={BarraCss.linkBarra}>
                        <i className="bi bi-clock-history"></i> Asignacion Turno 
                    </Link>
                </li>
                <li className={BarraCss.liBarra}>
                    <Link to="/crear" className={BarraCss.linkBarra}>
                        <i className="bi bi-clock-history"></i> Crear Usuario 
                    </Link>
                </li>
                <li className={BarraCss.liBarra}>
                    <Link to="/editar" className={BarraCss.linkBarra}>
                        <i className="bi bi-clock-history"></i> Editar Usuario 
                    </Link>
                </li>
                <li className={BarraCss.liBarra}>
                    <button>Cerrar Sesion</button>
                </li>
            </ul>
        </nav>
    );
};

export default BarraNavegacion;