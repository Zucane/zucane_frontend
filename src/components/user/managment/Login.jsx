import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css';
import './form.css';
import granjero from '../../../assets/granjero.jpg';
import logo from '../../../assets/logo.jpeg';
// import { Link } from 'react-router-dom' // <- si usas React Router
import FormFieldValidation from './FormFieldValidation';
import apiV1 from '../../../service/apiV1';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [validateTick, setValidateTick] = useState(0);
    const navigate = useNavigate();

    const isEmailValid = (v) => {
        if (!v) return false;
        const value = String(v).toLowerCase();
        return value.includes('@');
    };
    const isPasswordValid = (v) => v && v.length >= 6;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        const okEmail = isEmailValid(email);
        const okPass = isPasswordValid(password);
        if (!okEmail || !okPass) {
            setSubmitError('Por favor corrige los campos marcados.');
            setValidateTick(t => t + 1);
            return;
        }

        try {
            console.log('[LOGIN] BaseURL:', apiV1?.defaults?.baseURL);
            console.log('[LOGIN] Request payload:', { email, password: '********' });
            const { data } = await apiV1.post('/api/v1/auth/login', { email, password });
            console.log('[LOGIN] Response data:', data);
            if (data && data.success) {
                const destination = Number(data.user_id) === 4 ? '/government' : '/business';
                console.log('[LOGIN] Success. user_id:', data.user_id, '-> navigating to', destination);
                navigate(destination);
            } else {
                setSubmitError(data?.message || 'Credenciales inválidas.');
                console.warn('[LOGIN] API responded without success flag:', data);
            }
        } catch (err) {
            const status = err?.response?.status;
            const respData = err?.response?.data;
            const headers = err?.response?.headers;
            console.error('[LOGIN] Error response:', { status, data: respData, headers });
            console.error('[LOGIN] Error config:', err?.config);
            const apiMsg = respData?.message || respData?.detail;
            setSubmitError(apiMsg || (status === 401 ? 'No autorizado. Verifica tus credenciales.' : 'No se pudo iniciar sesión. Intenta de nuevo.'));
        }
    };

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

                        <form className="login-form" noValidate onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label htmlFor="email" className="login-label">Correo electrónico</label>
                                <FormFieldValidation
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder="nombre@ejemplo.com"
                                    autoComplete="email"
                                    required
                                    renderLabel={false}
                                    wrapClassName="form-field"
                                    inputClassName="login-input"
                                    validateSignal={validateTick}
                                    suppressValidation={true}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="password" className="login-label">Contraseña</label>
                                <FormFieldValidation
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    renderLabel={false}
                                    wrapClassName="form-field"
                                    inputClassName="login-input"
                                    validateSignal={validateTick}
                                    suppressValidation={true}
                                />
                                <small id="password-hint" className="password-hint">
                                    ¿Olvidaste tu contraseña?
                                </small>
                            </div>

                            {submitError && (
                                <div className="form-error-msg" style={{ marginBottom: '10px' }}>{submitError}</div>
                            )}

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
                            src={granjero}  // <- cambia a tu archivo
                            alt="Login visual"
                            className="login-img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}