import React, { useState } from 'react';
import './form.css';

export default function Register() {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return (
        <div className="login-container">
            <div className="register-card">
                <div className="login-form-section">
                    <h2 className="login-title">Registro</h2>
                    <form>
                        <div className="form-field">
                            <label className="login-label" htmlFor="name">Nombre de empresa</label>
                            <input className="login-input" type="text" id="name" placeholder="Tu empresa..." />
                        </div>
                        <div className="form-field">
                            <label className="login-label" htmlFor="email">Correo electrónico</label>
                            <input className="login-input" type="email" id="email" placeholder="tucorreo@ejemplo.com" />
                        </div>
                        <div className="form-field">
                            <label className="login-label" htmlFor="password">Contraseña</label>
                            <input className="login-input" type="password" id="password" placeholder="Contraseña segura" />
                        </div>
                        <div className="form-field">
                            <label className="login-label" htmlFor="confirm_password">Confirmar contraseña</label>
                            <input className="login-input" type="password" id="confirm_password" placeholder="Repite tu contraseña" />
                        </div>
                        <div className="form-field">
                            <label className="login-label" htmlFor="fiscal">Datos fiscales (opcional)</label>
                            <input className="login-input" type="text" id="fiscal" placeholder="RFC, dirección, etc." />
                        </div>
                        <div className="form" style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '.7rem' }}>
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptedTerms}
                                onChange={e => setAcceptedTerms(e.target.checked)}
                                style={{ marginRight: '8px', width: '18px', height: '18px' }}
                            />
                            <label className="login-label" htmlFor="terms" style={{ fontWeight: 400 }}>
                                Acepto los <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-500)', textDecoration: 'underline' }}>términos y condiciones</a>
                            </label>
                        </div>
                        <button
                            className="login-button"
                            type="submit"
                            disabled={!acceptedTerms}
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}