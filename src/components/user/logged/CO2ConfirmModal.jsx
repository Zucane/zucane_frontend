import React from 'react';
import '../managment/styles.css';

export default function CO2ConfirmModal({ isOpen, amount, onCancel, onAccept }) {
  if (!isOpen) return null;
  
  // Asegurarnos de que amount sea un número o string
  const displayAmount = typeof amount === 'object' ? '0' : amount;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Confirmar compra</h2>
        <p>¿Quieres comprar <b>{displayAmount}</b> CO₂ Coins?</p>
        <div className="modal-actions">
          <button className="login-button" onClick={onAccept}>Aceptar</button>
          <button className="login-button button-ghost" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}