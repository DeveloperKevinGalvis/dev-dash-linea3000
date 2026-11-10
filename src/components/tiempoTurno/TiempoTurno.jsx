import React, { useState, useEffect } from 'react';
import tiempoCss from "./tiempoStyle.module.css";

const TiempoTurno = ({ activo }) => {
    const [segundosLaboral, setSegundosLaboral] = useState(0);

    useEffect(() => {
        let intervalo = null;
        if (activo) {
            // Inicia el cronómetro cuando el turno está activo
            intervalo = setInterval(() => {
                setSegundosLaboral((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(intervalo);
        }
        return () => clearInterval(intervalo);
    }, [activo]);

    // Función para convertir segundos totales a formato HH:MM:SS
    const formatearTiempo = (segTotal) => {
        const horas = Math.floor(segTotal / 3600).toString().padStart(2, '0');
        const minutos = Math.floor((segTotal % 3600) / 60).toString().padStart(2, '0');
        const segundos = (segTotal % 60).toString().padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    };

    return (
        <div className={tiempoCss.containerTiempo}>
            <div className={tiempoCss.gruposTiempo}>
                <h3>Laboral</h3>
                <p>{formatearTiempo(segundosLaboral)}</p>
            </div>
            <div className={tiempoCss.gruposTiempo}>
                <h3>Almuerzo</h3>
                <p>00:00:00</p>
            </div>
            <div className={tiempoCss.gruposTiempo}>
                <h3>Break</h3>
                <p>00:00:00</p>
            </div>
        </div>
    );
};

export default TiempoTurno;