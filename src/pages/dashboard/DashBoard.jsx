import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MapsDashBoard from "../../components/mapsDashBoard/MapsDashBoard";
import TiempoTurno from "../../components/tiempoTurno/TiempoTurno";
import ModalInicioTurno from "../../components/modals/modalIniciarTurno";
import DashBoardCss from "./dashBoardStyle.module.css";

const DashBoard = () => {
    const [turnoIniciado, setTurnoIniciado] = useState(false);
    
    // Obtenemos el estado y el disparador del ProtectedRoute
    const { estadoActual, setEstadoActual } = useOutletContext();

    const [modalAbierto, setModalAbierto] = useState(false);
    const [tipoAccion, setTipoAccion] = useState(null);

    const handleSolicitarCambioTurno = () => {
        if (turnoIniciado) {
            setTipoAccion('FINALIZAR');
        } else {
            setTipoAccion('INICIAR');
        }
        setModalAbierto(true);
    };

    const handleConfirmarAccion = () => {
        if (tipoAccion === 'INICIAR') {
            setTurnoIniciado(true);
            setEstadoActual('disponible');
        } else {
            setTurnoIniciado(false);
            setEstadoActual('disponible');
        }
        setModalAbierto(false);
    };

    const handleCancelarAccion = {
        // ... tu lógica de cancelar ...
    };

    return (
        <>
            <section className={DashBoardCss.containerSection}>
                <div className={DashBoardCss.containerMaps}>
                    <MapsDashBoard 
                        turnoIniciado={turnoIniciado} 
                        onToggleTurno={handleSolicitarCambioTurno} 
                    />
                </div>
                <div className={DashBoardCss.containerTiempo}>
                    <TiempoTurno 
                        activo={turnoIniciado} 
                        estadoExterno={estadoActual}
                        onCambiarEstadoExterno={(nuevoEstado) => setEstadoActual(nuevoEstado)}
                    />
                </div>
            </section>

            <ModalInicioTurno 
                isOpen={modalAbierto}
                mensaje={tipoAccion === 'INICIAR' ? 'Confirma Inicio Turno' : 'Confirma Finalizar Turno'}
                onCancel={() => setModalAbierto(false)}
                onConfirm={handleConfirmarAccion}
            />
        </>
    );
};

export default DashBoard;