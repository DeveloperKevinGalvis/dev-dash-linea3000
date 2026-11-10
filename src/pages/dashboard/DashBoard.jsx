import React, { useState } from 'react';
import MapsDashBoard from "../../components/mapsDashBoard/MapsDashBoard";
import TiempoTurno from "../../components/tiempoTurno/TiempoTurno";
import DashBoardCss from "./dashBoardStyle.module.css";

const DashBoard = () => {
    const [turnoIniciado, setTurnoIniciado] = useState(false);

    return (
        <>
            <section className={DashBoardCss.containerSection}>
                <div className={DashBoardCss.containerMaps}>
                    <MapsDashBoard onIniciarTurno={() => setTurnoIniciado(true)} />
                </div>
                <div className={DashBoardCss.containerTiempo}>
                    <TiempoTurno activo={turnoIniciado} />
                </div>
            </section>
        </>
    );
};

export default DashBoard;