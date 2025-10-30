import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GovLeftNavBar from './GovLeftNavBar';
import '../admin/styles.css';
import EmitTokens from './tabs/EmitTokens';
import ManageTokens from './tabs/ManageTokens';
import Transactions from './tabs/Transactions';
import Payments from './tabs/Payments';
import Audit from './tabs/Audit';
import Reports from './tabs/Reports';
import Users from './tabs/Users';

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

const tabComponents = {
  emit: EmitTokens,
  manage: ManageTokens,
  transactions: Transactions,
  payments: Payments,
  audit: Audit,
  reports: Reports,
  users: Users,
};

export default function GovernmentDashboard() {
    const [activeTab, setActiveTab] = useState('manage');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => setShowLogoutModal(true);
    const confirmLogout = () => {
        setShowLogoutModal(false);
        navigate('/');
    };
    const cancelLogout = () => setShowLogoutModal(false);

    const SectionComponent = tabComponents[activeTab] || (() => <div className="dashboard-section"><h2>Sección</h2></div>);

    return (
        <div className="dashboard-main">
            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
            />
            <GovLeftNavBar
                activeTab={activeTab}
                onSectionChange={setActiveTab}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(o => !o)}
                onLogout={handleLogout}
            />
            <div
                className="dashboard-content"
                style={{
                    marginLeft: sidebarOpen ? 220 : 62,
                    transition: 'margin-left .23s'
                }}
            >
                <SectionComponent />
            </div>
        </div>
    );
}
