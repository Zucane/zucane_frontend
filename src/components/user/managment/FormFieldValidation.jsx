import React, { useState, useEffect } from 'react';

export default function FormFieldValidation({
  type = 'text',
  label = '',
  value,
  onChange,
  placeholder = '',
  name,
  required = false,
  autoComplete,
  compareValue, // para confirm password
  renderLabel = true,
  wrapClassName = 'formfield-validation',
  inputClassName = '',
  validateSignal = 0, // cambia para forzar validación externa
}) {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (touched) {
      validate();
    }
    // eslint-disable-next-line
  }, [value, compareValue]);

  useEffect(() => {
    if (validateSignal > 0) {
      setTouched(true);
      validate();
    }
    // eslint-disable-next-line
  }, [validateSignal]);

  const validate = () => {
    let err = '';
    let ok = false;

    // Requerido / Vacío
    if (required && (!value || String(value).trim() === '')) {
      err = 'Este campo es obligatorio.';
    }

    if (!err) {
      if (type === 'email') {
        if (!value || !value.includes('@') || !String(value).endsWith('.com')) {
          err = "El correo electrónico debe ser válido y contener un '@' y un '.com'";
        }
      } else if (type === 'password' && name === 'password') {
        if (!value || String(value).length < 6) {
          err = 'La contraseña debe tener al menos 6 caracteres.';
        }
      } else if (type === 'password' && name === 'confirmPassword') {
        if (!value || value !== compareValue) {
          err = 'Las contraseñas no coinciden.';
        }
      }
    }

    if (!err) ok = true;
    setError(err);
    setSuccess(ok);
    return ok;
  };

  const handleChange = (e) => {
    onChange && onChange(e);
    if (!touched) setTouched(true);
  };

  const containerClasses = `${wrapClassName}${error ? ' error' : ''}${success ? ' success' : ''}`.trim();
  const inputClasses = `${inputClassName} ${error ? 'input-error' : success ? 'input-success' : ''}`.trim();

  return (
    <div className={containerClasses}>
      {renderLabel && label && <label htmlFor={name}>{label}{required ? ' *' : ''}</label>}
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        className={inputClasses}
        required={required}
      />
      {error && <div className="form-error-msg">{error}</div>}
      {!error && success && touched && (
        <div className="form-success-msg">Campo válido</div>
      )}
    </div>
  );
}
