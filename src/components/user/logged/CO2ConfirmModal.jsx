import React from 'react';
import '../managment/styles.css';

export default function CO2ConfirmModal({ isOpen, amount, onCancel, onAccept }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Confirmar compra</h2>
        <p>¿Quieres comprar <b>{amount}</b> CO₂ Coins?</p>
        <div className="modal-actions">
          <button className="login-button" onClick={onAccept}>Aceptar</button>
          <button className="login-button button-ghost" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}