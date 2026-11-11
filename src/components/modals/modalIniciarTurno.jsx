import React from 'react';
import modalsCss from './modalStyle.module.css';
import animationSupport from '../../assets/Support Animation.svg';

const ModalInicioTurno = ({ isOpen, mensaje, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={modalsCss.containerModal}>
            <div className={modalsCss.modal}>
                <figure className={modalsCss.figureModal}>
                    <img src={animationSupport} alt="Soporte Animación" />
                </figure>
                <p>{mensaje}</p>
                <div className={modalsCss.containerButtonsModal}>
                    <button onClick={onCancel}>Cancelar</button>
                    <button onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalInicioTurno;