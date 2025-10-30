import React, { useState } from 'react';
import '../managment/styles.css';
import { postBusinessPurchase } from '../../../service/balance';

export default function CO2ShopModal({ isOpen, onClose, onConfirm }) {
  const [amount, setAmount] = useState(''); // Estado para la cantidad de CO₂ Coins
  const [businessPrivateKey, setBusinessPrivateKey] = useState(''); // Estado para el private key

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      // Llamada al método postBusinessPurchase con amount y business_private_key
      const response = await postBusinessPurchase(amount, businessPrivateKey);
      onConfirm(response); // Pasamos la respuesta al callback onConfirm
      onClose(); // Cerramos el modal
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Comprar CO₂ Coins</h2>

        {/* Input para la cantidad de CO₂ Coins */}
        <input
          className="login-input"
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="¿Cuántas CO₂ coins?"
        />

        {/* Input para el business private key */}
        <input
          className="login-input"
          type="text"
          value={businessPrivateKey}
          onChange={e => setBusinessPrivateKey(e.target.value)}
          placeholder="Business Private Key"
        />

        <div className="modal-actions">
          <button className="login-button" onClick={handleConfirm}>Comprar</button>
          <button className="login-button button-ghost" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
