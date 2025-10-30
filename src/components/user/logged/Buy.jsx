import React, { useState, useEffect } from 'react';
import { getAssetBalance } from '../../../service/balance';
import { getBusinessBalance } from '../../../service/balance';
import { postBusinessPurchase } from '../../../service/balance';
import { FaCoins, FaDollarSign, FaLeaf, FaSeedling } from 'react-icons/fa';

export default function Buy({ costoMXN, XLM, hectareas, handleBuyClick }) {
    const [showShopModal, setShowShopModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        const fetchAssetBalance = async () => {
            try {
                const response = await getAssetBalance();
                if (response && response.asset_balance) {
                    setCoins(response.asset_balance);
                }
            } catch (error) {
                console.error("Error al obtener el balance de activos:", error);
            }
        };

        fetchAssetBalance();
    }, []);

    return (
        <div className="dashboard-section">
            <h1 className="dashboard-title">Comprar ZUCOINS</h1>

            <div className="info-cards-grid">
                {/* Card 1: ZUCOINS Disponibles */}
                <div className="info-card">
                    <FaCoins className="card-icon" />
                    <h3 className="card-title">ZUCOINS Disponibles</h3>
                    <p className="card-value">{coins ? coins : "Cargando..."}</p> {/* Muestra el balance o "Cargando..." */}
                </div>

                {/* Card 2: Costo por Coin */}
                <div className="info-card">
                    <FaDollarSign className="card-icon" />
                    <h3 className="card-title">Costo por Coin</h3>
                    <p className="card-value">${costoMXN} MXN</p>
                    <p className="card-sub-value">{XLM} XLM </p>
                </div>

                {/* Card 3: Equivalente en Hectáreas */}
                <div className="info-card full-width"> {/* Usamos full-width para que ocupe todo el ancho */}
                    <FaSeedling className="card-icon" />
                    <h3 className="card-title">Impacto en Azúcar</h3>
                    <p className="card-value">{hectareas} Ha de Caña de Azúcar</p>
                    <p className="card-sub-value">Neutralizadas anualmente</p>
                </div>

                {/* Nueva Card: ZUCOINS en la empresa */}
                <div className="info-card full-width"> {/* Usamos full-width para que ocupe todo el ancho */}
                    <FaCoins className="card-icon" />
                    <h3 className="card-title">ZUCOINS de la Empresa</h3>
                    <p className="card-value">{coins ? coins : "Cargando..."}</p> {/* Muestra los ZUCOINS de la empresa */}
                    <p className="card-sub-value">Balance disponible para transacciones</p>
                </div>
            </div>

            {/* Sección de Compra y Mensaje */}
            <div className="action-section">
                <button className="buy-button" onClick={handleBuyClick}>
                    Comprar ZUCOINS Ahora
                </button>

                {/* Card 5: Mensaje Motivacional */}
                <div className="motivational-card">
                    <FaLeaf className="motivational-icon" />
                    <p>
                        Al adquirir ZUCOINS, no solo inviertes en un futuro sostenible a través de la tecnología blockchain,
                        sino que también contribuyes directamente a proyectos de reforestación y conservación.
                        ¡Cada coin cuenta para un planeta más verde!
                    </p>
                </div>
            </div>
        </div>
    );
}
