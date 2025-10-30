import React, { useState } from 'react';
import '../managment/styles.css';
import './modal.css';
import { postBusinessPurchase } from '../../../service/balance';

export default function CO2ShopModal({ isOpen, onClose, onConfirm }) {
  const [amount, setAmount] = useState(''); // Estado para la cantidad de CO₂ Coins
  const [businessPrivateKey, setBusinessPrivateKey] = useState(''); // Estado para el private key
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  if (!isOpen) return null;

  const handlePurchase = async () => {
    if (!amount || !businessPrivateKey) {
      setError('Por favor complete todos los campos');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await postBusinessPurchase(amount, businessPrivateKey);
      setIsLoading(false);
      
      // Primero redirigimos a Google (temporalmente)
      window.open('https://www.google.com', '_blank');
      
      // Esperamos un momento antes de cerrar el modal y recargar
      setTimeout(() => {
        onConfirm(response);
        // Recargamos la página después de cerrar el modal
        window.location.reload();
      }, 1000);
    } catch (error) {
      setError(error.message || 'Error al realizar la compra');
      console.error("Error al realizar la compra:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Comprar ZUCOINS</h2>
        
        <div className="input-container">
          {/* Input para la cantidad de CO₂ Coins */}
          <div className="input-group">
            <label htmlFor="amount">Monto a comprar</label>
            <input
              id="amount"
              className="login-input"
              type="number"
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          {/* Input para el business private key */}
          <div className="input-group">
            <label htmlFor="privateKey">Business Private Key</label>
            <input
              id="privateKey"
              className="login-input"
              type="text"
              value={businessPrivateKey}
              onChange={e => setBusinessPrivateKey(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="modal-actions">
          <button 
            className="login-button" 
            onClick={handlePurchase}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando compra...' : 'Comprar'}
          </button>
          <button 
            className="login-button button-ghost" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
