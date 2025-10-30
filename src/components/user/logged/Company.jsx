import React from 'react';

const companyData = {
  nombre: 'Azúcar Bonanza S.A. de C.V.',
  email: 'contacto@azucarbonanza.com',
  industria: 'Agroindustria / Azucarera',
  rfc: 'ABO980312H12',
  direccion: 'Carretera 80 Km 12, Veracruz, México',
  fechaRegistro: '2024-04-12',
  representante: 'Laura Mendoza',
};

export default function Company() {
  return (
    <section className="dashboard-section">
      <h1 className="dashboard-title">Mi Empresa</h1>
      <form className="profile-form">
        <div className="profile-form-row">
          <label htmlFor="nombre">Nombre de la Empresa</label>
          <input id="nombre" type="text" value={companyData.nombre} disabled />
        </div>
        <div className="profile-form-row">
          <label htmlFor="industria">Industria</label>
          <input id="industria" type="text" value={companyData.industria} disabled />
        </div>
        <div className="profile-form-row">
          <label htmlFor="rfc">RFC</label>
          <input id="rfc" type="text" value={companyData.rfc} disabled />
        </div>
        <div className="profile-form-row">
          <label htmlFor="representante">Representante Legal</label>
          <input id="representante" type="text" value={companyData.representante} disabled />
        </div>
        <div className="profile-form-row">
          <label htmlFor="email">Correo de contacto</label>
          <input id="email" type="email" value={companyData.email} disabled />
        </div>
        <div className="profile-form-row">
          <label htmlFor="direccion">Dirección fiscal</label>
          <input id="direccion" type="text" value={companyData.direccion} disabled />
        </div>
        <div className="profile-form-row">
          <label htmlFor="fechaRegistro">Fecha de registro</label>
          <input id="fechaRegistro" type="text" value={companyData.fechaRegistro} disabled />
        </div>
      </form>
    </section>
  );
}
