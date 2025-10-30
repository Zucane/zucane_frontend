import React from 'react';
// Importamos algunos iconos de react-icons para embellecer las cards
import { FaCoins, FaDollarSign, FaLeaf, FaSeedling } from 'react-icons/fa';

export default function Buy({ coins, costoMXN, costoUSD, hectareas, handleBuyClick }) {
    return (
        <div className="dashboard-section">
            <h1 className="dashboard-title">Comprar CO₂ Coins</h1>

            <div className="info-cards-grid">
                {/* Card 1: CO2 Coins Disponibles */}
                <div className="info-card">
                    <FaCoins className="card-icon" />
                    <h3 className="card-title">CO₂ Coins Disponibles</h3>
                    <p className="card-value">{coins}</p>
                </div>

                {/* Card 2: Costo por Coin */}
                <div className="info-card">
                    <FaDollarSign className="card-icon" />
                    <h3 className="card-title">Costo por Coin</h3>
                    <p className="card-value">${costoMXN} MXN</p>
                    <p className="card-sub-value">${costoUSD} USD (aprox)</p>
                </div>

                {/* Card 3: Equivalente en Hectáreas */}
                <div className="info-card full-width"> {/* Usamos full-width para que ocupe todo el ancho */}
                    <FaSeedling className="card-icon" />
                    <h3 className="card-title">Impacto en Azúcar</h3>
                    <p className="card-value">{hectareas} Ha de Caña de Azúcar</p>
                    <p className="card-sub-value">Neutralizadas anualmente</p>
                </div>
            </div>

            {/* Sección de Compra y Mensaje */}
            <div className="action-section">
                <button className="buy-button" onClick={handleBuyClick}>
                    Comprar CO₂ Coins Ahora
                </button>

                {/* Card 5: Mensaje Motivacional */}
                <div className="motivational-card">
                    <FaLeaf className="motivational-icon" />
                    <p>
                        Al adquirir CO₂ Coins, no solo inviertes en un futuro sostenible a través de la tecnología blockchain,
                        sino que también contribuyes directamente a proyectos de reforestación y conservación.
                        ¡Cada coin cuenta para un planeta más verde!
                    </p>
                </div>
            </div>
        </div>
    );
}