import React, { useState, useEffect } from 'react';
import { FaReceipt, FaCheckCircle, FaTimesCircle, FaBuilding } from 'react-icons/fa';
import { getAccountHistory } from '../../../service/historyService';

export default function Receipts() {
  const [recibos, setRecibos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountPublicKey = 'GAB4A637DQI6KJQOENLNQS52JMTRGTMWWODQRDRW2NNZ7ALQT4QZHUX5'; // Reemplaza con la clave pública real
        const data = await getAccountHistory(accountPublicKey);

        // Agrupar las transacciones en pares (usuario y tesorería)
        const groupedRecibos = [];
        for (let i = 0; i < data.length; i += 2) {
          // Agrupar dos elementos: una transacción del usuario y un pago de tesorería
          const userTransaction = data[i];
          const treasuryPayment = data[i + 1];
          groupedRecibos.push({ userTransaction, treasuryPayment });
        }

        setRecibos(groupedRecibos); // Guardar los recibos agrupados
      } catch (error) {
        console.error("Error al obtener los recibos:", error);
        setError("Hubo un error al cargar los recibos. Intenta nuevamente.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <section className="receipts-section">
        <h1 className="dashboard-title">Recibos de Compra</h1>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  // Función auxiliar para aplicar el estilo 'paid' o 'pending' a la card
  const getCardStatusClass = (userAssetCode) => {
    return userAssetCode === 'ZUCOIN' ? 'paid' : 'pending';
  };

  return (
    <section className="receipts-section">
      <h1 className="dashboard-title">Recibos de Compra</h1>
      <div className="receipts-list">
        {recibos.length === 0 ? (
          <div className="receipts-empty">
            <FaReceipt size={48} color="#bdd2c3" style={{ marginBottom: 16 }} />
            <p>Aún no tienes recibos registrados.</p>
          </div>
        ) : (
          recibos.map((r, index) => {
            // Verificamos que las transacciones existan antes de acceder a sus propiedades
            if (!r.userTransaction || !r.treasuryPayment) {
              return null; // Si alguna transacción está ausente, no renderizamos la card
            }

            return (
              <div className={`receipt-card ${getCardStatusClass(r.userTransaction.asset_code)}`} key={index}>
                <div className="receipt-card-header">
                  <FaReceipt className="receipt-icon" />
                  <span className="receipt-id">Transacción {index + 1}</span>
                  {/* En el ejemplo visual, ambas transacciones de cada card parecen ser un 'Pago del Usuario' (aunque la lógica del código dice lo contrario) */}
                  <span className={`receipt-status paid`}>
                    <FaCheckCircle style={{ color: '#309651', marginRight: 4 }} />
                    Pago del Usuario
                  </span>
                </div>

                <div className="receipt-card-body">
                  <h3>**Pago en XLM a Tesorería**</h3>
                  {/* Pago de Tesorería */}
                  <div className="receipt-field">
                    <FaBuilding className="receipt-field-icon" />
                    <strong>Pago a Tesorería:</strong> <span className="receipt-address">{r.treasuryPayment.from}</span> {/* <-- CLASE APLICADA */}
                  </div>
                  <div className="receipt-field">
                    <strong>Concepto:</strong> {r.treasuryPayment.asset_code}
                  </div>
                  <div className="receipt-field">
                    <strong>Fecha:</strong> {new Date(r.treasuryPayment.created_at).toLocaleString()}
                  </div>

                  <div className="receipt-details-row">
                    <div>
                      <strong>Cantidad:</strong> {r.treasuryPayment.amount} {r.treasuryPayment.asset_code}
                    </div>
                    <div>
                      <strong>Monto:</strong> ${parseFloat(r.treasuryPayment.amount * 0.1).toFixed(2)} MXN {/* Calculamos el monto de XLM */}
                    </div>
                  </div>

                  <h3>**Recepción de ZUCOIN**</h3>
                  {/* Transacción realizada por el usuario */}
                  <div className="receipt-field">
                    <FaBuilding className="receipt-field-icon" />
                    <strong>Tesorería:</strong> <span className="receipt-address">{r.userTransaction.from}</span> {/* <-- CLASE APLICADA */}
                  </div>
                  <div className="receipt-field">
                    <strong>Concepto:</strong> {r.userTransaction.asset_code}
                  </div>
                  <div className="receipt-field">
                    <strong>Fecha:</strong> {new Date(r.userTransaction.created_at).toLocaleString()}
                  </div>

                  <div className="receipt-details-row">
                    <div>
                      <strong>Cantidad:</strong> {r.userTransaction.amount} {r.userTransaction.asset_code}
                    </div>
                    <div>
                      <strong>Monto:</strong> ${parseFloat(r.userTransaction.amount * 100).toFixed(2)} MXN {/* Calculamos el monto en MXN */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}