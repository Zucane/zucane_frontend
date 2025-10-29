import React, { useState } from 'react';
import '../managment/styles.css';

export default function CO2ShopModal({ isOpen, onClose, onConfirm }) {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Comprar CO₂ Coins</h2>
        <input
          className="login-input"
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="¿Cuántas CO₂ coins?"
        />
        <div className="modal-actions">
          <button className="login-button" onClick={() => onConfirm(amount)}>Comprar</button>
          <button className="login-button button-ghost" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
