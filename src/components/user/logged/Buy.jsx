import React, { useState, useEffect } from 'react';
import { getAssetBalance, getBusinessBalance } from '../../../service/balance'; // Asegúrate de importar getBusinessBalance
import { FaCoins, FaDollarSign, FaLeaf, FaSeedling } from 'react-icons/fa';

export default function Buy({ costoMXN, XLM, hectareas, handleBuyClick }) {
    const [showShopModal, setShowShopModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [coins, setCoins] = useState(0); // Estado para el balance de CO₂ Coins
    const [businessBalance, setBusinessBalance] = useState({ asset_balance: 0, asset_to_XLM: 0, asset_to_MXN: 0, hectares: 0 }); // Estado para el balance de la empresa

    // Definir la public key de la empresa
    const businessPublicKey = 'GAB4A637DQI6KJQOENLNQS52JMTRGTMWWODQRDRW2NNZ7ALQT4QZHUX5'; // Reemplaza con la clave pública correcta

    // Llamar a la API para obtener el balance de activos de la empresa
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

        const fetchBusinessBalance = async () => {
            try {
                const response = await getBusinessBalance(businessPublicKey);
                if (response) {
                    setBusinessBalance({
                        asset_balance: response.asset_balance,
                        asset_to_XLM: response.asset_to_XLM,
                        asset_to_MXN: response.asset_to_MXN,
                        hectares: response.hectares,
                    });
                }
            } catch (error) {
                console.error("Error al obtener el balance de la empresa:", error);
            }
        };

        fetchAssetBalance(); // Obtener balance de CO₂ Coins
        fetchBusinessBalance(); // Obtener balance de la empresa
    }, []); // Solo ejecuta al montar el componente

    return (
        <div className="dashboard-section">
            <h1 className="dashboard-title">Comprar ZUCOINS</h1>

            <div className="info-cards-grid">
                {/* Card 1: ZUCOINS Disponibles */}
                <div className="info-card">
                    <FaCoins className="card-icon" />
                    <h3 className="card-title">ZUCOINS en existencia</h3>
                    <p className="card-value">{coins ? coins : "Cargando..."}</p> {/* Muestra el balance o "Cargando..." */}
                </div>

                {/* Card 2: Costo por Coin */}
                <div className="info-card">
                    <FaDollarSign className="card-icon" />
                    <h3 className="card-title">Costo por ZUCOIN</h3>
                    <p className="card-value">${businessBalance.asset_to_MXN ? businessBalance.asset_to_MXN : "Cargando..."} MXN</p>
                    <p className="card-sub-value">{businessBalance.asset_to_XLM ? businessBalance.asset_to_XLM : "Cargando..."} XLM</p>
                </div>

                {/* Card 3: Equivalente en Hectáreas */}
                <div className="info-card full-width"> {/* Usamos full-width para que ocupe todo el ancho */}
                    <FaSeedling className="card-icon" />
                    <h3 className="card-title">Impacto en CO2</h3>
                    <p className="card-value">{businessBalance.hectares ? businessBalance.hectares : "Cargando..."} Hectáreas de Caña de Azúcar</p>
                    <p className="card-sub-value">Neutralizadas anualmente</p>
                </div>

                {/* Card 4: ZUCOINS de la Empresa */}
                <div className="info-card full-width"> {/* Usamos full-width para que ocupe todo el ancho */}
                    <FaCoins className="card-icon" />
                    <h3 className="card-title">ZUCOINS de la Empresa</h3>
                    <p className="card-value">{businessBalance.asset_balance ? businessBalance.asset_balance : "Cargando..."}</p> {/* Muestra el balance de ZUCOINS de la empresa */}
                    <p className="card-sub-value">Balance disponible para transacciones</p>
                </div>
            </div>

            {/* Sección de Compra y Mensaje */}
            <div className="action-section">
                <button className="buy-button" onClick={handleBuyClick}>
                    Comprar ZUCOINS Ahora
                </button>

                {/* Card 8: Mensaje Motivacional */}
                <div className="motivational-card">
                    <FaLeaf className="motivational-icon" />
                    <p>
                        Al adquirir ZUCOINS, no solo inviertes en un futuro sostenible a través de la tecnología blockchain,
                        sino que también contribuyes directamente a campesinos y comunidades agrícolas.
                        ¡Cada coin cuenta para un planeta más verde!
                    </p>
                </div>
            </div>
        </div>
    );
}
