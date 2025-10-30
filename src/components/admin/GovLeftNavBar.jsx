import React from 'react';
import {
    MdAddCircle, MdInventory, MdReceiptLong,
    MdPayments, MdSearch, MdAnalytics, MdPeople, MdLogout, MdMenu
} from 'react-icons/md';
import './styles.css';

const tabs = [
    { key: 'emit', name: 'Emitir Tokens', icon: <MdAddCircle size={22} />, tooltip: 'Emitir Tokens' },
    { key: 'manage', name: 'Gestionar Tokens', icon: <MdInventory size={22} />, tooltip: 'Gestionar Tokens' },
    { key: 'transactions', name: 'Transacciones', icon: <MdReceiptLong size={22} />, tooltip: 'Transacciones' },
    { key: 'payments', name: 'Pagos Internos', icon: <MdPayments size={22} />, tooltip: 'Pagos Internos' },
    { key: 'audit', name: 'Auditoría', icon: <MdSearch size={22} />, tooltip: 'Auditoría' },
    { key: 'reports', name: 'Reportes', icon: <MdAnalytics size={22} />, tooltip: 'Reportes' },
    { key: 'users', name: 'Usuarios', icon: <MdPeople size={22} />, tooltip: 'Usuarios' }
];

export default function GovLeftNavBar({ activeTab, onSectionChange, isOpen, onToggle, onLogout }) {
    return (
        <>
            <div className={`sidenav-backdrop ${isOpen ? 'show' : ''}`} onClick={onToggle} aria-hidden="true" />
            <aside className={`sidenav ${isOpen ? 'open' : ''}`} aria-label="Navegación gobierno">
                <div className="sidenav-header">
                    <button
                        className="sidenav-toggle"
                        onClick={onToggle}
                        aria-label={isOpen ? 'Contraer menú' : 'Expandir menú'}
                        aria-expanded={isOpen}
                        type="button"
                    >
                        <MdMenu />
                    </button>
                    {isOpen && <span className="sidenav-brand">ZUCANE</span>}
                </div>
                <nav className="sidenav-content">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            className={`sidenav-item ${activeTab === tab.key ? 'active' : ''}`}
                            onClick={() => onSectionChange(tab.key)}
                            data-tooltip={tab.tooltip}
                            type="button"
                        >
                            {tab.icon}
                            {isOpen && <span>{tab.name}</span>}
                        </button>
                    ))}
                    <button
                        className="sidenav-item"
                        onClick={onLogout}
                        data-tooltip="Cerrar sesión"
                        type="button"
                        style={{ marginTop: '30px' }}
                    >
                        <MdLogout size={22} />
                        {isOpen && <span>Cerrar sesión</span>}
                    </button>
                </nav>
            </aside>
        </>
    );
}
