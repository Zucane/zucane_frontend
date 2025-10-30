import React, { useState, useEffect } from 'react';
import { FaUserTie, FaIndustry, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaPhoneAlt, FaClipboardCheck } from 'react-icons/fa';
import { getCompany } from '../../../service/companyService'; // Asegúrate de importar el método getCompany

const empresa_id = 7; // El ID de la empresa que vamos a usar

export default function Company() {
  const [companyData, setCompanyData] = useState(null); // Estado para los datos de la empresa

  // Llamar a getCompany cuando el componente se monta
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await getCompany(empresa_id); // Llamada a la API para obtener los datos de la empresa
        setCompanyData(data); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al obtener los datos de la empresa:", error);
      }
    };

    fetchCompanyData(); // Ejecutar la función al montar el componente
  }, []); // Solo ejecuta una vez al montar el componente

  // Si los datos no están disponibles, mostrar "Cargando..."
  if (!companyData) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="dashboard-section">
      <h1 className="dashboard-title">Mi Empresa</h1>

      <div className="profile-card">
        {/* === Sección de Imagen de Perfil (Wireframe) === */}
        <div className="profile-image-container">
          <div className="profile-wireframe">
            {/* Placeholder visual para el logo o imagen de la empresa */}
            
          </div>
          <h2 className="card-company-name">{companyData.nombre}</h2>
        </div>

        <hr className="divider" />

        {/* === Sección de Datos Centrados === */}
        <dl className="company-data-list">

          {/* Fila: RFC */}
          <div className="data-row">
            <dt><FaIdCard className="data-icon" /> RFC:</dt>
            <dd>{companyData.rfc}</dd>
          </div>

          {/* Fila: Email */}
          <div className="data-row">
            <dt><FaEnvelope className="data-icon" /> Correo:</dt>
            <dd>{companyData.email}</dd>
          </div>

          {/* Fila: Teléfono */}
          <div className="data-row">
            <dt><FaPhoneAlt className="data-icon" /> Teléfono:</dt>
            <dd>{companyData.telefono || 'No disponible'}</dd>
          </div>

          {/* Fila: Dirección */}
          <div className="data-row">
            <dt><FaMapMarkerAlt className="data-icon" /> Dirección:</dt>
            <dd>{companyData.direccion}</dd>
          </div>

          {/* Fila: Fecha de Registro */}
          <div className="data-row">
            <dt><FaCalendarAlt className="data-icon" /> Registro:</dt>
            <dd>{companyData.registro_fecha}</dd>
          </div>

          {/* Fila: Status */}
          <div className="data-row">
            <dt><FaClipboardCheck className="data-icon" /> Estado:</dt>
            <dd>{companyData.status}</dd>
          </div>
        </dl>

      </div>
    </section>
  );
}
