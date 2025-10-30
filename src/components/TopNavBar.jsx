import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import './nav.css';

export default function TopNavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const itemsCenter = [
        { label: 'Problema', to: '/problema' },
        { label: 'Solución', to: '/solution' },
        { label: 'Usuario', to: '/contact' },
        { label: 'Propuesta', to: '/proposal' },
        { label: 'Impacto', to: '/impact' },
        { label: 'Equipo', to: '/team' },
    ];
    const login = [
        { label: 'Iniciar Sesión', to: '/login' },
    ];
    const register = [
        { label: 'Registrarse', to: '/register' },
    ];

    const isActive = (to) => location.pathname === to;

    return (
        <header className="top-navbar">
            <div className="top-nav-container">
                <a
                    className="top-brand"
                    onClick={() => { setOpen(false); navigate('/'); }}
                    role="button"
                    tabIndex={0}
                >
                    <img src={logo} alt="Logo" style={{ width: '70px' }} />
                </a>

                <button
                    className="top-burger"
                    onClick={() => setOpen(v => !v)}
                    aria-label="Abrir menú"
                    aria-expanded={open}
                >
                    ☰
                </button>

                <nav className={`top-nav ${open ? 'open' : ''} center-nav`}>
                    {itemsCenter.map(i => (
                        <button
                            key={i.to}
                            onClick={() => { setOpen(false); navigate(i.to); }}
                            className={`top-link ${isActive(i.to) ? 'active' : ''}`}
                        >
                            {i.label}
                        </button>
                    ))}
                </nav>
                <nav className={`top-nav right-nav`}>
                    {login.map(i => (
                        <button
                            key={i.to}
                            onClick={() => { setOpen(false); navigate(i.to); }}
                            className={`top-link-login ${isActive(i.to) ? 'active' : ''}`}
                        >
                            {i.label}
                        </button>
                    ))}
                    {register.map(i => (
                        <button
                            key={i.to}
                            onClick={() => { setOpen(false); navigate(i.to); }}
                            className={`top-link-register ${isActive(i.to) ? 'active' : ''}`}
                        >
                            {i.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    )
}