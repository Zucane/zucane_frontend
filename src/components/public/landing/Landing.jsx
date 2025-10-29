import React, { useEffect, useRef, useState } from 'react';
import '../styles.css';
import xoch1 from '../../../assets/xoch1.webp';
import xoch2 from '../../../assets/xoch2.jpg';
import xoch3 from '../../../assets/xoch3.jpg';
import xoch4 from '../../../assets/xoch4.jpg';
import xoch5 from '../../../assets/xoch5.jpg';
import { FaLandmark, FaHandshake, FaLeaf, FaBriefcase, FaCertificate, FaWind, FaSearch, FaLock, FaChartBar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBolt, FaDollarSign, FaGlobeAmericas } from 'react-icons/fa';
import { GiWheat } from 'react-icons/gi';

const Landing = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [xochiInView, setXochiInView] = useState(false);
  const fanRef = useRef(null);
  const [hoverI, setHoverI] = useState(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Indicador de scroll de tu header
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || 0;
      const dh = (document.documentElement?.scrollHeight || 0) - window.innerHeight;
      setScrollProgress(dh > 0 ? (st / dh) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Saber si el fan está visible
  useEffect(() => {
    const el = fanRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setXochiInView(e.isIntersecting)),
      { threshold: [0, 0.15, 0.35, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = fanRef.current;
    if (!el) return;

    let raf = 0;
    const computeSep = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const centerDist = Math.abs((rect.top + rect.height / 2) - vh / 2);
        const norm = Math.max(0, 1 - centerDist / (vh * 0.9));
        const sep = Math.min(0.9, Math.max(0, norm));
        el.style.setProperty('--sep', sep.toFixed(3));
      });
    };

    const onScrollGuarded = () => {
      if (xochiInView) computeSep();
      else el.style.setProperty('--sep', '0');
    };

    window.addEventListener('scroll', onScrollGuarded, { passive: true });
    onScrollGuarded();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollGuarded);
    };
  }, [xochiInView]);

  // Seguimiento del mouse (solo en vista y si no hay reduce-motion)
  useEffect(() => {
    const el = fanRef.current;
    if (!el) return;

    if (prefersReduced) {
      el.style.setProperty('--mx', '0');
      return;
    }

    const onMove = (ev) => {
      if (!xochiInView) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const mx = Math.max(-1, Math.min(1, (ev.clientX - cx) / (rect.width / 2)));
      el.style.setProperty('--mx', mx.toFixed(3));
    };
    const onLeave = () => el.style.setProperty('--mx', '0');

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [xochiInView, prefersReduced]);

  const fanItems = [
    { img: xoch1, alt: 'Xochitepec 1', i: -2 },
    { img: xoch2, alt: 'Xochitepec 2', i: -1 },
    { img: xoch3, alt: 'Xochitepec 3', i:  0 },
    { img: xoch4, alt: 'Xochitepec 4', i:  1 },
    { img: xoch5, alt: 'Xochitepec 5', i:  2 },
  ].map((it) => ({
    ...it,
    absI: Math.abs(it.i),
    tier: (Math.abs(it.i) * 8) * -1, // baja un poco las laterales
  }));

  return (
    <div className="landing-container">
      <div 
        className="scroll-indicator" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">CO₂ Coin</h1>
          <p className="hero-subtitle">
            Transforma el CO₂ capturado por la caña de azúcar de Xochitepec en tokens digitales sostenibles
          </p>
          <a href="#co2-coin" className="cta-button">
            Descubre Cómo Funciona
          </a>
        </div>
      </section>

      {/* Section 1: ¿Qué es Xochitepec? */}
      <section id="xochitepec" className="section">
        <h2 className="section-title">¿Qué es Xochitepec?</h2>

        <div className="card-grid">
          <div className="card">
            <div className="card-icon"><FaLandmark /></div>
            <h3 className="card-title">Pueblo Mágico</h3>
            <p className="card-text">
              Xochitepec es un encantador pueblo mágico ubicado en Morelos, México, 
              reconocido por su rica tradición cultural y su compromiso con la 
              sostenibilidad ambiental.
            </p>
          </div>
          <div className="card">
            <div className="card-icon"><GiWheat /></div>
            <h3 className="card-title">Tradición Agrícola</h3>
            <p className="card-text">
              Con una historia centenaria en el cultivo de caña de azúcar, 
              Xochitepec ha desarrollado técnicas agrícolas sostenibles que 
              benefician tanto al medio ambiente como a la comunidad local.
            </p>
          </div>
          <div className="card">
            <div className="card-icon"><FaHandshake /></div>
            <h3 className="card-title">Cultura Comunitaria</h3>
            <p className="card-text">
              La comunidad de Xochitepec mantiene valores arraigados de 
              cooperación, respeto por la naturaleza y desarrollo sostenible 
              que se reflejan en cada proyecto agrícola.
            </p>
          </div>
        </div>

        {/* Fan deck carousel */}
        <div className="fan-wrap">
        <div
            ref={fanRef}
            className={`fan ${xochiInView ? 'is-inview' : ''}`}
            role="region"
            aria-label="Galería estilo abanico de Xochitepec"
            data-hover={hoverI ?? ''}
        >
            {fanItems.map(({ img, alt, i, absI, tier }) => (
            <div
                key={i}
                className="fan-card"
                style={{ '--i': i, '--absI': absI, '--tier': `${tier}px` }}
                onMouseEnter={() => setHoverI(String(i))}
                onMouseLeave={() => setHoverI(null)}
            >
                <img src={img} alt={alt} loading="lazy" />
            </div>
            ))}
        </div>
        </div>
      </section>

      {/* Section 2: El valor de la Caña de Azúcar */}
      <section id="cana-azucar" className="section">
        <h2 className="section-title">El Valor de la Caña de Azúcar</h2>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', color: 'var(--dark-green)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            <FaLeaf /> Agroindustria Sostenible en Xochitepec
          </h3>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
            La caña de azúcar en Xochitepec no es solo un cultivo tradicional, sino una 
            poderosa herramienta de captura de CO₂. Durante su crecimiento, cada planta 
            absorbe dióxido de carbono de la atmósfera, contribuyendo significativamente 
            a la reducción de gases de efecto invernadero.
          </p>
          
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-number">+1,200</div>
              <div className="metric-label">Hectáreas de Caña</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">+40</div>
              <div className="metric-label">Empresas Beneficiadas</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">80,000</div>
              <div className="metric-label">Toneladas CO₂ Absorbidas</div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>
              Beneficios Ambientales y Económicos
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--primary-green)', marginRight: '0.5rem' }}><FaLeaf /></span>
                Captura natural de CO₂ durante el crecimiento
              </li>
              <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--primary-green)', marginRight: '0.5rem' }}><FaWind /></span>
                Mejora la calidad del aire local
              </li>
              <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--primary-green)', marginRight: '0.5rem' }}><FaBriefcase /></span>
                Genera empleos y desarrollo económico sostenible
              </li>
              <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--primary-green)', marginRight: '0.5rem' }}><FaLeaf /></span>
                Contribuye a los Objetivos de Desarrollo Sostenible
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: CO₂ Coin */}
      <section id="co2-coin" className="section">
        <h2 className="section-title">CO₂ Coin</h2>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--dark-green)', marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>
            <FaCertificate /> Conversión de CO₂ en Tokens Digitales
          </h3>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
            <strong>Cada CO₂ Coin representa una porción del CO₂ capturado por la caña local</strong>
          </p>
          
          <div className="card-grid">
            <div className="highlight-card">
              <h3><FaHandshake /> Beneficios a Agricultores</h3>
              <p>
                Los agricultores reciben compensación directa por su contribución 
                ambiental, incentivando prácticas sostenibles y mejorando su calidad de vida.
              </p>
            </div>
            <div className="highlight-card">
              <h3><FaCertificate /> Certificado de Sostenibilidad</h3>
              <p>
                Cada token viene respaldado por un certificado blockchain que 
                garantiza la trazabilidad y autenticidad del CO₂ capturado.
              </p>
            </div>
            <div className="highlight-card">
              <h3><FaWind /> Tu Inversión Limpia el Aire</h3>
              <p>
                Al adquirir CO₂ Coins, estás financiando directamente la captura 
                de carbono y contribuyendo a un futuro más limpio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Blockchain (Stellar) */}
      <section id="blockchain" className="section">
        <h2 className="section-title">Blockchain (Stellar)</h2>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--dark-green)', marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>
            <FaLock /> Tecnología Transparente y Segura
          </h3>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
            Utilizamos la red Stellar para garantizar transparencia, seguridad y trazabilidad completa
          </p>
          
          <div className="blockchain-features">
            <div className="feature-item">
              <div className="feature-icon"><FaSearch /></div>
              <h3 className="feature-title">Transparencia Total</h3>
              <p className="card-text">
                Todas las transacciones son públicas y verificables en la blockchain, 
                garantizando la confianza en cada CO₂ Coin.
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaLock /></div>
              <h3 className="feature-title">Seguridad Máxima</h3>
              <p className="card-text">
                La red Stellar utiliza criptografía avanzada para proteger 
                cada transacción y mantener la integridad de los datos.
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaChartBar /></div>
              <h3 className="feature-title">Registro Permanente</h3>
              <p className="card-text">
                Cada compra queda registrada de forma inmutable en Stellar, 
                creando un historial completo y auditable.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h4 style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>
              ¿Por qué elegimos Stellar?
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '10px' }}>
                <strong><FaBolt/> Velocidad</strong><br />
                Transacciones en segundos
              </div>
              <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '10px' }}>
                <strong><FaDollarSign/> Bajo Costo</strong><br />
                Tarifas mínimas
              </div>
              <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '10px' }}>
                <strong><FaGlobeAmericas/> Escalabilidad</strong><br />
                Soporte global
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Impacto Real */}
      <section id="impacto-real" className="section">
        <h2 className="section-title">Impacto Real</h2>
        <div className="impact-stats">
          <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1rem' }}>
            <FaChartBar/> Nuestros Logros en Números
          </h3>
          <p style={{ textAlign: 'center', opacity: '0.9', marginBottom: '2rem' }}>
            Proyectos alineados con los Objetivos de Desarrollo Sostenible de la ONU
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">2,500</div>
              <div className="stat-label">Toneladas Compensadas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150</div>
              <div className="stat-label">Familias Beneficiadas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,200</div>
              <div className="stat-label">Usuarios Activos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">ODS Alineados</div>
            </div>
          </div>
        </div>

        <div className="card-grid" style={{ marginTop: '2rem' }}>
          <div className="card">
            <div className="card-icon"><FaLeaf /></div>
            <h3 className="card-title">ODS 13: Acción por el Clima</h3>
            <p className="card-text">
              Contribuimos directamente a la reducción de emisiones de CO₂ 
              mediante la captura natural de carbono.
            </p>
          </div>
          <div className="card">
            <div className="card-icon"><FaLeaf /></div>
            <h3 className="card-title">ODS 15: Vida de Ecosistemas</h3>
            <p className="card-text">
              Promovemos prácticas agrícolas sostenibles que protegen 
              y restauran los ecosistemas terrestres.
            </p>
          </div>
          <div className="card">
            <div className="card-icon"><FaBriefcase /></div>
            <h3 className="card-title">ODS 8: Trabajo Decente</h3>
            <p className="card-text">
              Generamos empleos sostenibles en la comunidad agrícola 
              de Xochitepec, mejorando las condiciones laborales.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CO₂ Coin</h3>
            <p>
              Transformando el CO₂ capturado por la caña de azúcar de Xochitepec 
              en tokens digitales sostenibles para un futuro más limpio.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-link" aria-label="Twitter/X"><FaTwitter /></a>
              <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>📧 info@co2coin.mx</p>
            <p>📞 +52 777 123 4567</p>
            <p>📍 Xochitepec, Morelos, México</p>
            <p>🌐 www.co2coin.mx</p>
          </div>
          
          <div className="footer-section">
            <h3>Enlaces</h3>
            <p><a href="#xochitepec">Sobre Xochitepec</a></p>
            <p><a href="#cana-azucar">Caña de Azúcar</a></p>
            <p><a href="#co2-coin">CO₂ Coin</a></p>
            <p><a href="#blockchain">Blockchain</a></p>
            <p><a href="#impacto-real">Impacto Real</a></p>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <p><a href="#">Términos y Condiciones</a></p>
            <p><a href="#">Política de Privacidad</a></p>
            <p><a href="#">Certificaciones</a></p>
            <p><a href="#">Auditorías</a></p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 CO₂ Coin. Todos los derechos reservados. | Desarrollado con ❤️ en Xochitepec</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
