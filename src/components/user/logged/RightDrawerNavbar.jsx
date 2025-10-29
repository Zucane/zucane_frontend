import React from 'react';
import { FaShoppingCart, FaReceipt, FaIndustry } from 'react-icons/fa';
import '../managment/styles.css';

export default function RightDrawerNavbar({ activeSection, onSectionChange }) {
    return (
        <div className="right-navbar">
            <div
                className={`right-navbar-item${activeSection === 'shop' ? ' active' : ''}`}
                onClick={() => onSectionChange('shop')}
            >
                <FaShoppingCart size={24} />
                <span>Comprar CO₂</span>
            </div>
            <div
                className={`right-navbar-item${activeSection === 'receipt' ? ' active' : ''}`}
                onClick={() => onSectionChange('receipt')}
            >
                <FaReceipt size={24} />
                <span>Recibos</span>
            </div>
            <div
                className={`right-navbar-item${activeSection === 'business' ? ' active' : ''}`}
                onClick={() => onSectionChange('business')}
            >
                <FaIndustry size={24} />
                <span>Empresa</span>
            </div>
        </div>
    );
}
