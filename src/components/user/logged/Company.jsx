import React from 'react';
import { FaIndustry, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaUserTie } from 'react-icons/fa';

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

      <div className="profile-card">

        {/* === Sección de Imagen de Perfil (Wireframe) === */}
        <div className="profile-image-container">
          <div className="profile-wireframe">
            {/* Placeholder visual para el logo o imagen de la empresa */}
            <FaIndustry size={60} color="#6b7280" />
          </div>
          <h2 className="card-company-name">{companyData.nombre}</h2>
          <p className="card-industry">{companyData.industria}</p>
        </div>

        <hr className="divider" />

        {/* === Sección de Datos Centrados === */}
        <dl className="company-data-list">

          {/* Fila: RFC */}
          <div className="data-row">
            <dt><FaIdCard className="data-icon" /> RFC:</dt>
            <dd>{companyData.rfc}</dd>
          </div>

          {/* Fila: Representante */}
          <div className="data-row">
            <dt><FaUserTie className="data-icon" /> Representante:</dt>
            <dd>{companyData.representante}</dd>
          </div>

          {/* Fila: Email */}
          <div className="data-row">
            <dt><FaEnvelope className="data-icon" /> Correo:</dt>
            <dd>{companyData.email}</dd>
          </div>

          {/* Fila: Dirección */}
          <div className="data-row">
            <dt><FaMapMarkerAlt className="data-icon" /> Dirección:</dt>
            <dd>{companyData.direccion}</dd>
          </div>

          {/* Fila: Fecha de Registro */}
          <div className="data-row">
            <dt><FaCalendarAlt className="data-icon" /> Registro:</dt>
            <dd>{companyData.fechaRegistro}</dd>
          </div>
        </dl>

      </div>
    </section>
  );
}
