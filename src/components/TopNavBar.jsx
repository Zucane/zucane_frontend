import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './nav.css';

export default function TopNavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const items = [
        { label: 'Inicio', to: '/' },
        { label: 'Servicios', to: '/services' },
        { label: 'Acerca', to: '/about' },
        { label: 'Contacto', to: '/contact' },
        { label: 'Iniciar', to: '/login' },
    ];

    const isActive = (to) => location.pathname === to;

    return (
        <header className="top-navbar">
            <div className="top-nav-container">
                <div
                    className="top-brand"
                    onClick={() => { setOpen(false); navigate('/'); }}
                    role="button"
                    tabIndex={0}
                >
                    QRise
                </div>

                <button
                    className="top-burger"
                    onClick={() => setOpen(v => !v)}
                    aria-label="Abrir menú"
                    aria-expanded={open}
                >
                    ☰
                </button>

                <nav className={`top-nav ${open ? 'open' : ''}`}>
                    {items.map(i => (
                        <button
                            key={i.to}
                            onClick={() => { setOpen(false); navigate(i.to); }}
                            className={`top-link ${isActive(i.to) ? 'active' : ''}`}
                        >
                            {i.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    )
}