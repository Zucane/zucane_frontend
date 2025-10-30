import React from 'react';
import { FaReceipt, FaCheckCircle, FaTimesCircle, FaBuilding } from 'react-icons/fa';

// Datos ficticios de recibos
const recibos = [
  {
    id: 'RCPT-001',
    empresa: 'Azúcar Bonanza S.A. de C.V.',
    fecha: '2024-06-28',
    concepto: 'Compra de 50 CO₂ Coins',
    cantidad: 50,
    monto: 2500,
    estado: 'Pagado',
  },
  {
    id: 'RCPT-002',
    empresa: 'Frutiverde S.A.',
    fecha: '2024-06-12',
    concepto: 'Compra de 20 CO₂ Coins',
    cantidad: 20,
    monto: 1000,
    estado: 'Pagado',
  },
  {
    id: 'RCPT-003',
    empresa: 'BioEco Consultores',
    fecha: '2024-05-20',
    concepto: 'Compra de 10 CO₂ Coins',
    cantidad: 10,
    monto: 500,
    estado: 'Pendiente',
  },
];

export default function Receipts() {
  return (
    <section className="dashboard-section">
      <h1 className="dashboard-title">Recibos de Compra</h1>
      <div className="receipts-list">
        {recibos.length === 0 ? (
          <div className="receipts-empty">
            <FaReceipt size={48} color="#bdd2c3" style={{marginBottom: 16}}/>
            <p>Aún no tienes recibos registrados.</p>
          </div>
        ) : (
          recibos.map(r => (
            <div className={`receipt-card ${r.estado === 'Pagado' ? 'paid' : 'pending'}`} key={r.id}>
              <div className="receipt-card-header">
                <FaReceipt className="receipt-icon" />
                <span className="receipt-id">{r.id}</span>
                <span className={`receipt-status ${r.estado === 'Pagado' ? 'paid' : 'pending'}`}>{r.estado === 'Pagado' ? <FaCheckCircle style={{color:'#309651', marginRight:4}}/> : <FaTimesCircle style={{color:'#de2323', marginRight:4}}/>}{r.estado}</span>
              </div>
              <div className="receipt-card-body">
                <div className="receipt-field"><FaBuilding className="receipt-field-icon"/> <strong>Empresa:</strong> {r.empresa}</div>
                <div className="receipt-field"><strong>Concepto:</strong> {r.concepto}</div>
                <div className="receipt-field"><strong>Fecha:</strong> {r.fecha}</div>
                <div className="receipt-details-row">
                  <div><strong>Cantidad:</strong> {r.cantidad} CO₂ Coins</div>
                  <div><strong>Monto:</strong> ${r.monto} MXN</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
