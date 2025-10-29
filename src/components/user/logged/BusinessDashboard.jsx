import React, { useState } from 'react';
import TopNavBar from '../../TopNavBar';
import RightDrawerNavbar from './RightDrawerNavbar';
import CO2ShopModal from './CO2ShopModal';
import CO2ConfirmModal from './CO2ConfirmModal';
import '../managment/styles.css';

export default function BusinessDashboard() {
    const [section, setSection] = useState('shop');
    const [showShopModal, setShowShopModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);

    // Simulación de datos
    const coins = 128;
    const costo = 50; // Ejemplo
    const hectareas = 24; // Ejemplo

    const handleBuyClick = () => setShowShopModal(true);

    const handleConfirmShop = (amount) => {
        setSelectedAmount(amount);
        setShowShopModal(false);
        setShowConfirmModal(true);
    };

    const handleAcceptBuy = () => {
        setShowConfirmModal(false);
        // Puedes poner un fetch/post o lógica aquí
        alert(`¡Has comprado ${selectedAmount} CO₂ Coins!`);
    };

    return (
        <div className="dashboard-main">
            <div className="dashboard-content">
                <div className="dashboard-section">
                    {section === 'shop' && (
                        <div>
                            <h2>CO₂ Coins Disponibles: {coins}</h2>
                            <p>Costo por coin: ${costo} MXN</p>
                            <p>Equivalente en hectáreas: {hectareas} Ha</p>
                            <button className="login-button" onClick={handleBuyClick}>Comprar CO₂ Coins</button>
                        </div>
                    )}
                    {section === 'receipt' && (
                        <div>
                            <h2>Tus Recibos</h2>
                            <p>Aquí aparecerán los recibos de tus compras.</p>
                        </div>
                    )}
                    {section === 'business' && (
                        <div>
                            <h2>Información de Empresa</h2>
                            <p>Detalles de perfil y métricas de tu empresa.</p>
                        </div>
                    )}
                </div>
                <RightDrawerNavbar activeSection={section} onSectionChange={setSection} />
            </div>
            <CO2ShopModal isOpen={showShopModal} onClose={() => setShowShopModal(false)} onConfirm={handleConfirmShop} />
            <CO2ConfirmModal isOpen={showConfirmModal} amount={selectedAmount} onCancel={() => setShowConfirmModal(false)} onAccept={handleAcceptBuy} />
        </div>
    );
}
