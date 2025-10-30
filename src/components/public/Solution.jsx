import React, { useEffect, useState } from "react";
import TopNavBar from "../TopNavBar";
import { FaLeaf, FaChartLine, FaWallet, FaCertificate, FaShieldAlt } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";

export default function Solution() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
    const onScroll = () => {
        const st = window.scrollY || 0;
        const dh =
        (document.documentElement?.scrollHeight || 0) - window.innerHeight;
        setScrollProgress(dh > 0 ? (st / dh) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    }, []);

  return (
    <div className="landing-container solution-bg">
      <TopNavBar />

      <div
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* HERO */}
      <section className="solution-hero" id="solucion">
        <h1 className="solution-title">Zucane: créditos de carbono tokenizados en Stellar</h1>
        <div className="solution-underline" />
        <p className="solution-sub">
          Tokenizamos créditos de carbono generados por agricultura local de caña. 
          Contratos inteligentes en <strong>Stellar</strong> garantizan transparencia, trazabilidad y liquidez casi inmediata.
        </p>

        <div className="solution-badges">
          <span className="solution-badge"><LuNetwork /> Red Stellar</span>
          <span className="solution-badge"><FaCertificate /> Respaldado y verificable</span>
          <span className="solution-badge"><FaShieldAlt /> Trazabilidad pública</span>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section solution-how">
        <h2 className="section-title">¿Cómo funciona?</h2>

        <div className="how-grid">
          <div className="how-step">
            <div className="how-num">1</div>
            <h3>Generación & Verificación</h3>
            <p>
              Proyectos agrícolas locales capturan CO₂. Un verificador valida la metodología y emite certificados.
            </p>
          </div>
          <div className="how-step">
            <div className="how-num">2</div>
            <h3>Tokenización en Stellar</h3>
            <p>
              Cada tonelada de CO₂ se convierte en un <strong>token CO₂</strong> con metadatos auditables on-chain.
            </p>
          </div>
          <div className="how-step">
            <div className="how-num">3</div>
            <h3>Compra / Venta / Retiro</h3>
            <p>
              Usuarios y empresas compran, intercambian o retiran tokens para compensar su huella y apoyar a productores.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="section">
        <h2 className="section-title">Beneficios clave</h2>
        <div className="benefits-grid">
          <div className="card">
            <div className="card-icon"><FaWallet /></div>
            <h3 className="card-title">Liquidez inmediata</h3>
            <p className="card-text">Mercado 24/7 con liquidación rápida y comisiones bajas gracias a Stellar.</p>
          </div>
          <div className="card">
            <div className="card-icon"><FaShieldAlt /></div>
            <h3 className="card-title">Transparencia y trazabilidad</h3>
            <p className="card-text">Origen y transferencias visibles en blockchain; certificados vinculados al token.</p>
          </div>
          <div className="card">
            <div className="card-icon"><FaChartLine /></div>
            <h3 className="card-title">Impacto medible</h3>
            <p className="card-text">Dashboard con toneladas compensadas, proyectos apoyados y métricas por periodo.</p>
          </div>
          <div className="card">
            <div className="card-icon"><FaLeaf /></div>
            <h3 className="card-title">Apoyo directo</h3>
            <p className="card-text">Parte del flujo va a los agricultores: incentivos por prácticas sostenibles.</p>
          </div>
        </div>
      </section>

      {/* TOKEN ESPECIFICACIÓN / CTA */}
      <section className="section">
        <h2 className="section-title">Especificación del token CO₂</h2>
        <div className="token-spec">
          <div className="token-row">
            <span>Unidad</span><strong>1 token = 1 tonelada CO₂</strong>
          </div>
          <div className="token-row">
            <span>Red</span><strong>Stellar (asset emitido)</strong>
          </div>
          <div className="token-row">
            <span>Respaldo</span><strong>Certificados de proyectos agrícolas verificados</strong>
          </div>
          <div className="token-row">
            <span>Uso</span><strong>Compra, venta, hold o retiro (offset)</strong>
          </div>
        </div>
      </section>

      {/* MINI FAQ */}
      <section className="section">
        <h2 className="section-title">Preguntas rápidas</h2>
        <div className="faq">
          <details>
            <summary>¿Cómo sé que el crédito es real?</summary>
            <p>Cada token vincula su certificado y metadatos del proyecto. Todo es auditable on-chain.</p>
          </details>
          <details>
            <summary>¿Puedo retirar para compensar?</summary>
            <p>Sí. Al retirar, el token se marca como “retirado” y queda fuera de circulación permanente.</p>
          </details>
          <details>
            <summary>¿Qué comisiones tiene?</summary>
            <p>Comisiones bajas de red Stellar y un pequeño fee de servicio para operación y verificación.</p>
          </details>
        </div>
      </section>
    </div>
  );
}