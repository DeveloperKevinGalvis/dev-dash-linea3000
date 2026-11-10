import React from 'react';
import { Link } from 'react-router-dom';
import BarraCss from './barraNavegacionStyle.module.css';

const BarraNavegacion = () => {
    return (
        <nav className={BarraCss.containerBarra}>
            <ul className={BarraCss.barraNavegacion}>
                <li className={BarraCss.liBarra}>
                    <Link to="/dashboard" className={BarraCss.linkBarra}>
                        <i className="bi bi-speedometer2"></i> Tu DashBoard
                    </Link>
                </li>
                <li className={BarraCss.liBarra}>
                    <Link to="/turnos" className={BarraCss.linkBarra}>
                        <i className="bi bi-clock-history"></i> Turnos Activos
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default BarraNavegacion;