import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import FormFieldValidation from './FormFieldValidation';
import apiV1 from '../../../service/apiV1';

export default function Register() {
    const [rfc, setRfc] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitOk, setSubmitOk] = useState('');
    const [validateTick, setValidateTick] = useState(0);
    const navigate = useNavigate();

    const isEmailValid = (v) => v && v.includes('@');
    const isPasswordValid = (v) => v && v.length >= 6;
    const isRfcValid = (v) => v && (v.length === 12 || v.length === 13);
    const isNombreValid = (v) => v && v.trim().length > 1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setSubmitOk('');
        const ok = isEmailValid(email) && isPasswordValid(password) && isRfcValid(rfc) && isNombreValid(nombre);
        if (!ok) {
            setSubmitError('Por favor completa RFC (12-13), nombre, email y contraseña.');
            setValidateTick(t => t + 1);
            return;
        }

        try {
            const payload = { rfc, nombre, email, password, telefono, direccion };
            const { data, status } = await apiV1.post('/api/v1/empresas/', payload);
            if (status === 201 || data?.empresa_id) {
                setSubmitOk('Empresa creada correctamente. Redirigiendo al inicio de sesión...');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setSubmitError('No se pudo crear la empresa. Intenta de nuevo.');
            }
        } catch (err) {
            const apiMsg = err?.response?.data?.message || err?.response?.data?.detail;
            setSubmitError(apiMsg || 'Error al crear empresa.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-section register-wide">
                <h2 className="register-title">Crear empresa</h2>
                <p className="register-subtitle">Para empezar, ingresa los siguientes datos</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label className="login-label" htmlFor="rfc">RFC</label>
                        <input className="login-input" type="text" id="rfc" value={rfc} onChange={(e)=>setRfc(e.target.value.toUpperCase())} placeholder="RFC de 12 o 13 caracteres" />
                    </div>
                    <div className="form-field">
                        <label className="login-label" htmlFor="nombre">Nombre</label>
                        <input className="login-input" type="text" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} placeholder="Nombre de la empresa" />
                    </div>
                    <div className="form-field">
                        <label className="login-label" htmlFor="email">Correo electrónico</label>
                        <FormFieldValidation
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="empresa@ejemplo.com"
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
                        <label className="login-label" htmlFor="password">Contraseña</label>
                        <FormFieldValidation
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Contraseña"
                            autoComplete="new-password"
                            required
                            renderLabel={false}
                            wrapClassName="form-field"
                            inputClassName="login-input"
                            validateSignal={validateTick}
                            suppressValidation={true}
                        />
                    </div>
                    <div className="form-field">
                        <label className="login-label" htmlFor="telefono">Teléfono (opcional)</label>
                        <input className="login-input" type="text" id="telefono" value={telefono} onChange={(e)=>setTelefono(e.target.value)} placeholder="Teléfono" />
                    </div>
                    <div className="form-field">
                        <label className="login-label" htmlFor="direccion">Dirección (opcional)</label>
                        <input className="login-input" type="text" id="direccion" value={direccion} onChange={(e)=>setDireccion(e.target.value)} placeholder="Dirección" />
                    </div>

                    {submitError && (
                        <div className="form-error-msg" style={{ marginBottom: '10px' }}>{submitError}</div>
                    )}
                    {submitOk && (
                        <div className="form-success-msg" style={{ marginBottom: '10px' }}>{submitOk}</div>
                    )}

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Crear empresa
                    </button>
                </form>
            </div>
        </div>
    );
}