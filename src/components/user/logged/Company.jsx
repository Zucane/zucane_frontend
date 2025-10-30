import React, { useState, useEffect } from 'react';
import { FaUserTie, FaIndustry, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaPhoneAlt, FaClipboardCheck, FaEdit } from 'react-icons/fa';
import { getCompany } from '../../../service/companyService';
import apiV1 from '../../../service/apiV1';

const empresa_id = 7; // El ID de la empresa que vamos a usar

export default function Company() {
  const [companyData, setCompanyData] = useState(null); // Estado para los datos de la empresa
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleEditClick = () => {
    setEditData({
      nombre: companyData.nombre || '',
      email: companyData.email || '',
      telefono: companyData.telefono || '',
      direccion: companyData.direccion || '',
      status: companyData.status || '',
      stellar_public_key: companyData.stellar_public_key || ''
    });
    setShowEditModal(true);
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Excluir stellar_public_key y status del payload ya que no deben editarse
      const { stellar_public_key, status, ...updatePayload } = editData;
      
      const response = await apiV1.put(`/api/v1/empresas/${empresa_id}`, updatePayload);
      
      if (response.data) {
        setCompanyData(response.data);
        setSuccess('¡Datos actualizados correctamente!');
        // Cerrar modal después de 1.5 segundos para que se vea el mensaje
        setTimeout(() => {
          setShowEditModal(false);
          setSuccess('');
        }, 1500);
      }
    } catch (err) {
      const apiMsg = err?.response?.data?.message || err?.response?.data?.detail;
      setError(apiMsg || 'Error al actualizar los datos de la empresa.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setError('');
    setSuccess('');
  };

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

        {/* Botón Editar Datos */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={handleEditClick}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              fontSize: '14px'
            }}
          >
            <FaEdit /> Editar datos
          </button>
        </div>

      </div>

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="modal-backdrop" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '32px 28px',
            boxShadow: '0 2px 40px #0003',
            minWidth: '400px',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ 
              marginBottom: '24px', 
              textAlign: 'center',
              color: '#2d5a27',
              fontSize: '20px',
              fontWeight: '600'
            }}>
              Editar datos de la empresa
            </h3>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label className="login-label" style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#2d5a27'
                }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  value={editData.nombre || ''}
                  onChange={(e) => setEditData({...editData, nombre: e.target.value})}
                  className="login-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label className="login-label" style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#2d5a27'
                }}>
                  Email:
                </label>
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="login-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label className="login-label" style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#2d5a27'
                }}>
                  Teléfono:
                </label>
                <input
                  type="text"
                  value={editData.telefono || ''}
                  onChange={(e) => setEditData({...editData, telefono: e.target.value})}
                  className="login-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label className="login-label" style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#2d5a27'
                }}>
                  Dirección:
                </label>
                <input
                  type="text"
                  value={editData.direccion || ''}
                  onChange={(e) => setEditData({...editData, direccion: e.target.value})}
                  className="login-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label className="login-label" style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#2d5a27'
                }}>
                  Status:
                </label>
                <input
                  type="text"
                  value={editData.status || ''}
                  disabled
                  className="login-input"
                  style={{ 
                    width: '100%',
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d',
                    cursor: 'not-allowed'
                  }}
                />
                <small style={{ 
                  color: '#6c757d',
                  fontSize: '12px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  Este campo no se puede editar
                </small>
              </div>

              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label className="login-label" style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#2d5a27'
                }}>
                  Stellar Public Key:
                </label>
                <input
                  type="text"
                  value={editData.stellar_public_key || ''}
                  disabled
                  className="login-input"
                  style={{ 
                    width: '100%',
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d',
                    cursor: 'not-allowed'
                  }}
                />
                <small style={{ 
                  color: '#6c757d',
                  fontSize: '12px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  Este campo no se puede editar
                </small>
              </div>

              {error && (
                <div className="form-error-msg" style={{ 
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{ 
                  color: '#2d5a27',
                  backgroundColor: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '4px',
                  padding: '12px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {success}
                </div>
              )}

              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'center',
                marginTop: '24px'
              }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="login-button"
                  style={{
                    minWidth: '120px',
                    opacity: isLoading ? 0.6 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="login-button button-ghost"
                  style={{
                    minWidth: '120px',
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
