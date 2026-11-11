import React, { useState, useEffect } from 'react';
import tiempoCss from "./tiempoStyle.module.css";

const TiempoTurno = ({ activo, estadoExterno, onCambiarEstadoExterno }) => {
    const [segundosLaboral, setSegundosLaboral] = useState(0);
    const [segundosAlmuerzo, setSegundosAlmuerzo] = useState(0);
    const [segundosBreak, setSegundosBreak] = useState(0);

    const [menuAbierto, setMenuAbierto] = useState(false);

    const maxLaboral = 28800; 
    const maxAlmuerzo = 3600;
    const maxBreak = 900;

    // Si el turno deja de estar activo (se finaliza), reseteamos los contadores a 0
    useEffect(() => {
        if (!activo) {
            setSegundosLaboral(0);
            setSegundosAlmuerzo(0);
            setSegundosBreak(0);
        }
    }, [activo]);

    // Control de los cronómetros según el estado activo actual
    useEffect(() => {
        let intervalo = null;

        if (activo) {
            if (estadoExterno === 'disponible') {
                intervalo = setInterval(() => setSegundosLaboral(p => p + 1), 1000);
            } else if (estadoExterno === 'almuerzo') {
                intervalo = setInterval(() => setSegundosAlmuerzo(p => p + 1), 1000);
            } else if (estadoExterno === 'break') {
                intervalo = setInterval(() => setSegundosBreak(p => p + 1), 1000);
            }
        }

        return () => clearInterval(intervalo);
    }, [activo, estadoExterno]);

    const formatearTiempo = (segTotal) => {
        const horas = Math.floor(segTotal / 3600).toString().padStart(2, '0');
        const minutos = Math.floor((segTotal % 3600) / 60).toString().padStart(2, '0');
        const segundos = (segTotal % 60).toString().padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    };

    const calcularPorcentaje = (actual, max) => {
        const porcentaje = (actual / max) * 100;
        return porcentaje > 100 ? 100 : porcentaje;
    };

    const obtenerTextoEstado = () => {
        switch (estadoExterno) {
            case 'disponible': return 'Disponible';
            case 'almuerzo': return 'Almuerzo';
            case 'break': return 'Break';
            case 'otras': return 'Otra Actividades';
            default: return 'Seleccione Estado';
        }
    };

    return (
        <>
            <div className={tiempoCss.containerTiempo}>
                {/* Grupo Laboral */}
                <div className={tiempoCss.gruposTiempo}>
                    <h3>Laboral</h3>
                    <p>{formatearTiempo(segundosLaboral)}</p>
                    <div style={{ width: '100%', background: '#e9ecef', borderRadius: '4px', height: '8px', overflow: 'hidden', marginTop: '6px' }}>
                        <div style={{ width: `${calcularPorcentaje(segundosLaboral, maxLaboral)}%`, background: '#198754', height: '100%', transition: 'width 0.5s ease' }}></div>
                    </div>
                </div>

                {/* Grupo Almuerzo */}
                <div className={tiempoCss.gruposTiempo}>
                    <h3>Almuerzo</h3>
                    <p>{formatearTiempo(segundosAlmuerzo)}</p>
                    <div style={{ width: '100%', background: '#e9ecef', borderRadius: '4px', height: '8px', overflow: 'hidden', marginTop: '6px' }}>
                        <div style={{ width: `${calcularPorcentaje(segundosAlmuerzo, maxAlmuerzo)}%`, background: '#0d6efd', height: '100%', transition: 'width 0.5s ease' }}></div>
                    </div>
                </div>

                {/* Grupo Break */}
                <div className={tiempoCss.gruposTiempo}>
                    <h3>Break</h3>
                    <p>{formatearTiempo(segundosBreak)}</p>
                    <div style={{ width: '100%', background: '#e9ecef', borderRadius: '4px', height: '8px', overflow: 'hidden', marginTop: '6px' }}>
                        <div style={{ width: `${calcularPorcentaje(segundosBreak, maxBreak)}%`, background: '#ffc107', height: '100%', transition: 'width 0.5s ease' }}></div>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable de Estados */}
            <div className={tiempoCss.containerButtonesEstados} style={{ position: 'relative', marginTop: '15px' }}>
                <button 
                    disabled={!activo} 
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    style={{ cursor: activo ? 'pointer' : 'not-allowed', opacity: activo ? 1 : 0.6 }}
                >
                    {obtenerTextoEstado()} ▾
                </button>
                
                {menuAbierto && activo && (
                    <ul style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, background: '#fff', border: '1px solid #ccc', listStyle: 'none', padding: 0, margin: 0, width: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <li onClick={() => { onCambiarEstadoExterno('disponible'); setMenuAbierto(false); }} style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Disponible</li>
                        <li onClick={() => { onCambiarEstadoExterno('almuerzo'); setMenuAbierto(false); }} style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Almuerzo</li>
                        <li onClick={() => { onCambiarEstadoExterno('break'); setMenuAbierto(false); }} style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>Break</li>
                        <li onClick={() => { onCambiarEstadoExterno('otras'); setMenuAbierto(false); }} style={{ padding: '8px 12px', cursor: 'pointer' }}>Otra Actividades</li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default TiempoTurno;