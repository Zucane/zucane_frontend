import React, { useState } from 'react';
import TopNavBar from '../../TopNavBar';
import RightDrawerNavbar from './LeftNavBar';
import CO2ShopModal from './CO2ShopModal';
import CO2ConfirmModal from './CO2ConfirmModal';
import Buy from './Buy';
import Receipts from './Receipts';
import Company from './Company';
import '../managment/styles.css';
import { useNavigate } from 'react-router-dom';

function LogoutModal({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;
    return (
        <div className="modal-backdrop" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.25)', zIndex:4000, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{background:'#fff', borderRadius:'10px', padding:'32px 28px', boxShadow: '0 2px 40px #0003', minWidth:330, textAlign:'center'}}>
                <h3 style={{marginBottom: '18px'}}>¿Seguro que deseas cerrar sesión?</h3>
                <div style={{display:'flex', gap:15, justifyContent:'center'}}>
                    <button type="button" className="login-button" style={{minWidth:94}} onClick={onConfirm}>Cerrar sesión</button>
                    <button type="button" className="login-button button-ghost" style={{minWidth:94}} onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default function BusinessDashboard() {
    const [section, setSection] = useState('shop');
    const [showShopModal, setShowShopModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        setShowLogoutModal(true);
    };
    const confirmLogout = () => {
        setShowLogoutModal(false);
        navigate('/');
    };
    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className="dashboard-main">
            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
            />
            <RightDrawerNavbar
                activeSection={section}
                onSectionChange={setSection}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen((o) => !o)}
                onLogout={handleLogout}
            />
            <div className="dashboard-content" style={{ marginLeft: sidebarOpen ? 220 : 62, transition: 'margin-left .23s' }}>
                <div className="dashboard-section">
                    {section === 'shop' && (
                        <Buy
                            coins={coins}
                            costo={costo}
                            hectareas={hectareas}
                            handleBuyClick={handleBuyClick}
                        />
                    )}
                    {section === 'receipt' && <Receipts />}
                    {section === 'business' && <Company />}
                </div>
            </div>
            <CO2ShopModal isOpen={showShopModal} onClose={() => setShowShopModal(false)} onConfirm={handleConfirmShop} />
            <CO2ConfirmModal isOpen={showConfirmModal} amount={selectedAmount} onCancel={() => setShowConfirmModal(false)} onAccept={handleAcceptBuy} />
        </div>
    );
}