import React from 'react';
import { FaShoppingCart, FaReceipt, FaIndustry, FaSignOutAlt } from 'react-icons/fa'; // <- importa el ícono de logout
import { MdMenu } from "react-icons/md";
import './styles.css';

export default function LeftNavbar({ activeSection, onSectionChange, isOpen, onToggle, onLogout }) {
    return (
        <>
            <div className={`sidenav-backdrop ${isOpen ? 'show' : ''}`} onClick={onToggle} aria-hidden="true" />

            <aside className={`sidenav ${isOpen ? 'open' : ''}`} aria-label="Navegación lateral">
                <div className="sidenav-header">
                    <button
                        className="sidenav-toggle"
                        onClick={onToggle}
                        aria-label={isOpen ? 'Contraer menú' : 'Expandir menú'}
                        aria-expanded={isOpen}
                        type="button"
                    >
                        {isOpen ? <MdMenu /> : <MdMenu />}
                    </button>

                    {isOpen && <span className="sidenav-brand">ZUCANE</span>}
                </div>

                <nav className="sidenav-content">
                    <button
                        className={`sidenav-item ${activeSection === 'shop' ? 'active' : ''}`}
                        onClick={() => onSectionChange('shop')}
                        data-tooltip="Comprar CO₂"
                        type="button"
                    >
                        <FaShoppingCart size={20} />
                        {isOpen && <span>Comprar CO₂</span>}
                    </button>

                    <button
                        className={`sidenav-item ${activeSection === 'receipt' ? 'active' : ''}`}
                        onClick={() => onSectionChange('receipt')}
                        data-tooltip="Recibos"
                        type="button"
                    >
                        <FaReceipt size={20} />
                        {isOpen && <span>Recibos</span>}
                    </button>

                    <button
                        className={`sidenav-item ${activeSection === 'business' ? 'active' : ''}`}
                        onClick={() => onSectionChange('business')}
                        data-tooltip="Empresa"
                        type="button"
                    >
                        <FaIndustry size={20} />
                        {isOpen && <span>Empresa</span>}
                    </button>

                    {/* Botón de Logout */}
                    <button
                        className="sidenav-item"
                        onClick={onLogout}
                        data-tooltip="Cerrar sesión"
                        type="button"
                    >
                        <FaSignOutAlt size={20} />
                        {isOpen && <span>Cerrar sesión</span>}
                    </button>
                </nav>
            </aside>
        </>
    );
}

