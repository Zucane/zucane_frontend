import React, { useState } from 'react';
import './form.css';
import FormFieldValidation from './FormFieldValidation';

export default function Register() {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [validateTick, setValidateTick] = useState(0);

    const isEmailValid = (v) => v && v.includes('@') && v.endsWith('.com');
    const isPasswordValid = (v) => v && v.length >= 6;
    const isConfirmValid = (a, b) => a && b && a === b;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError('');
        const okEmail = isEmailValid(email);
        const okPass = isPasswordValid(password);
        const okConfirm = isConfirmValid(confirmPassword, password);
        const okTerms = acceptedTerms;
        if (!okEmail || !okPass || !okConfirm || !okTerms) {
            setSubmitError('Por favor corrige los campos marcados.');
            setValidateTick(t => t + 1); // fuerza mostrar errores en inputs
            return;
        }
        alert('Registro válido. Continuando...');
    };

    return (
        <div className="login-container">
            <div className="login-form-section register-wide">
                <h2 className="register-title">Obtén tu cuenta y empieza a cuidar el medio ambiente</h2>
                <p className="register-subtitle">Para empezar, ingresa los siguientes datos</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label className="login-label" htmlFor="name">Nombre de empresa</label>
                        <input className="login-input" type="text" id="name" placeholder="Tu empresa..." />
                    </div>
                    <div className="form-field">
                        <label className="login-label" htmlFor="email">Correo electrónico</label>
                        <FormFieldValidation
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            autoComplete="email"
                            required
                            renderLabel={false}
                            wrapClassName="form-field"
                            inputClassName="login-input"
                            validateSignal={validateTick}
                        />
                    </div>
                    <div className="form-field">
                        <label className="login-label" htmlFor="password">Contraseña</label>
                        <FormFieldValidation
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Contraseña segura"
                            autoComplete="new-password"
                            required
                            renderLabel={false}
                            wrapClassName="form-field"
                            inputClassName="login-input"
                            validateSignal={validateTick}
                        />
                    </div>
                    <div className="form-field">
                        <label className="login-label" htmlFor="confirm_password">Confirmar contraseña</label>
                        <FormFieldValidation
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            compareValue={password}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            placeholder="Repite tu contraseña"
                            autoComplete="new-password"
                            required
                            renderLabel={false}
                            wrapClassName="form-field"
                            inputClassName="login-input"
                            validateSignal={validateTick}
                        />
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

                    {submitError && (
                        <div className="form-error-msg" style={{ marginBottom: '10px' }}>{submitError}</div>
                    )}

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
    );
}