import React from 'react'
import './styles.css';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-grid">
                    {/* LADO IZQUIERDO: FORMULARIO (6 col) */}
                    <div className="login-form-section">
                        <h2 className="login-title">Iniciar sesión</h2>
                        {/* Aquí va tu formulario */}
                    </div>
                    {/* COLUMNA DE SEPARACIÓN (1 col - opcional, sólo para el espacio visual) */}
                    <div className="login-divider"></div>
                    {/* LADO DERECHO: IMAGEN (5 col) */}
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
    )
}
