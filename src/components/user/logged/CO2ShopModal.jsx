import React, { useState } from 'react';
import '../managment/styles.css';
import './modal.css';
import { postBusinessPurchase } from '../../../service/balance';

export default function CO2ShopModal({ isOpen, onClose, onConfirm }) {
  const [amount, setAmount] = useState('');
  const [businessPrivateKey, setBusinessPrivateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handlePurchase = async () => {
    if (!amount || !businessPrivateKey) {
      setError('Por favor complete todos los campos');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { blob, filename } = await postBusinessPurchase(amount, businessPrivateKey);
      setIsLoading(false);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setTimeout(() => {
        onConfirm();
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      setError(error.message || 'Error al realizar la compra');
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Comprar ZUCOINS</h2>
        
        <div className="input-container">
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

        {error && <div className="error-message">{error}</div>}

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