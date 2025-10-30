import React, { useRef, useEffect, useState } from "react";
import TopNavBar from "../TopNavBar";
import { FaLeaf, FaBuilding, FaUserTie, FaCheckCircle} from "react-icons/fa";
import { LuTarget, LuHandshake, LuWallet, LuShieldCheck } from "react-icons/lu";
import Timeline from "./timeLine";

export default function Users() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || 0;
      const dh = (document.documentElement?.scrollHeight || 0) - window.innerHeight;
      setScrollProgress(dh > 0 ? (st / dh) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-container users-bg">
      <TopNavBar />
      <div className="scroll-indicator" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      <section className="users-hero" id="usuarios">
        <h1 className="users-title">Usuario Objetivo</h1>
        <div className="users-underline" />
        <p className="users-sub">
          Zucane conecta <strong>campo y mercado</strong> con trazabilidad, facilidad de uso y respaldo verificable.
        </p>

        <div className="users-badges">
          <span className="users-badge"><LuTarget /> Segmentación clara</span>
          <span className="users-badge"><LuShieldCheck /> Verificable</span>
          <span className="users-badge"><LuHandshake /> Conexión directa</span>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">¿Para quién es Zucane?</h2>

        <div className="users-grid">
          <div className="card u-card">
            <div className="card-icon"><FaLeaf /></div>
            <h3 className="card-title">Agricultores locales</h3>
            <p className="card-text">
              Implementan prácticas sostenibles y buscan mercados digitales para vender sus créditos.
            </p>
            <ul className="u-list">
              <li><FaCheckCircle /> Monetización directa de créditos</li>
              <li><FaCheckCircle /> Acceso simple a compradores</li>
              <li><FaCheckCircle /> Recompensas por sostenibilidad</li>
            </ul>
          </div>

          <div className="card u-card">
            <div className="card-icon"><FaBuilding /></div>
            <h3 className="card-title">Empresas y ciudadanos</h3>
            <p className="card-text">
              Compensan emisiones de forma confiable, verificable y con impacto local.
            </p>
            <ul className="u-list">
              <li><FaCheckCircle /> Trazabilidad on-chain</li>
              <li><FaCheckCircle /> Certificados vinculados al token</li>
              <li><FaCheckCircle /> Experiencia sencilla</li>
            </ul>
          </div>

          {/* Inversionistas verdes */}
          <div className="card u-card">
            <div className="card-icon"><FaUserTie /></div>
            <h3 className="card-title">Inversionistas verdes</h3>
            <p className="card-text">
              Interesados en activos digitales con respaldo ambiental real.
            </p>
            <ul className="u-list">
              <li><FaCheckCircle /> Activo con utilidad climática</li>
              <li><FaCheckCircle /> Liquidez y mercado 24/7</li>
              <li><FaCheckCircle /> Riesgo/retorno transparente</li>
            </ul>
          </div>

          {/* Valor común */}
          <div className="card u-card">
            <div className="card-icon"><LuWallet /></div>
            <h3 className="card-title">Valor para todos</h3>
            <p className="card-text">
              Trazabilidad, facilidad de uso y conexión directa entre campo y mercado.
            </p>
            <ul className="u-list">
              <li><FaCheckCircle /> Compras/ventas seguras</li>
              <li><FaCheckCircle /> Impacto medible</li>
              <li><FaCheckCircle /> Comisiones bajas</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Viaje del usuario</h2>

        <Timeline />
      </section>
    </div>
  );
}