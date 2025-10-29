import React from 'react'
import './styles.css';
import './form.css';
import logo from '../../../assets/logo.jpeg';
// import { Link } from 'react-router-dom' // <- si usas React Router

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-grid">

                    {/* LADO IZQUIERDO */}
                    <div className="login-form-section">

                        {/* LOGO (botón a landing) */}
                        <a href="/" className="brand-link" aria-label="Ir a la página de inicio">
                            <img
                                src={logo}  // <- cambia a tu archivo
                                alt="Nombre de tu marca"
                                className="brand-logo"
                            />
                        </a>
                        {/*
            <Link to="/" className="brand-link" aria-label="Ir a la página de inicio">
            <img src="/ruta/de/tu/logo.svg" alt="Nombre de tu marca" className="brand-logo" />
            </Link>
            */}

                        <h2 className="login-title">Iniciar sesión</h2>

                        <form className="login-form" noValidate>
                            <div className="form-field">
                                <label htmlFor="email" className="login-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="login-input"
                                    placeholder="nombre@ejemplo.com"
                                    autoComplete="email"
                                    required
                                    aria-describedby="email-hint"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="password" className="login-label">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="login-input"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                                <small id="password-hint" className="password-hint">
                                    ¿Olvidaste tu contraseña?
                                </small>
                            </div>

                            <button type="submit" className="login-button">Iniciar sesión</button>

                            <small id="login-hint" className="form-hint">
                                ¿Aún no te registras? Abre tu cuenta.
                            </small>
                        </form>
                    </div>

                    {/* DIVISOR */}
                    <div className="login-divider"></div>

                    {/* LADO DERECHO */}
                    <div className="login-image-section">
                        <img
                            src="/ruta/de/tu/imagen.jpg"
                            alt="Login visual"
                            className="login-img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
