import React, { useEffect, useState } from "react";
import TopNavBar from "../TopNavBar";
import { FaBolt, FaShieldAlt, FaLeaf, FaGlobeAmericas, FaHandshake, FaChartLine, FaRocket} from "react-icons/fa";
import { LuShieldCheck, LuWallet, LuSparkles } from "react-icons/lu";

export default function Propuesta() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // progress bar (igual que en Landing/Solution/Users)
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
    <div className="landing-container vp-bg">
      <TopNavBar />
      <div className="scroll-indicator" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      {/* HERO */}
      <section className="vp-hero" id="propuesta">
        <h1 className="vp-title">Propuesta de Valor</h1>
        <div className="vp-underline" />
        <p className="vp-sub">
          Una solución <strong>accesible e innovadora</strong> que conecta la economía digital
          con la <strong>sostenibilidad local</strong>.
        </p>

        <div className="vp-badges">
          <span className="solution-badge"><FaBolt /> Liquidación instantánea</span>
          <span className="solution-badge"><LuShieldCheck /> Auditoría on-chain</span>
          <span className="solution-badge"><LuWallet /> Tokens negociables</span>
          <span className="solution-badge"><FaHandshake /> Impacto directo</span>
        </div>
      </section>

      {/* PILARES (2×2) */}
      <section className="section">
        <h2 className="section-title">¿Por qué Zucane?</h2>
        <div className="vp-grid">
          <div className="card vp-card">
            <div className="card-icon"><FaBolt /></div>
            <h3 className="card-title">Stellar + contratos inteligentes</h3>
            <p className="card-text">
              Operamos sobre Stellar para <strong>liquidaciones en segundos</strong> y comisiones bajas.
            </p>
          </div>

          <div className="card vp-card">
            <div className="card-icon"><FaShieldAlt /></div>
            <h3 className="card-title">Transparencia total</h3>
            <p className="card-text">
              Tokens <strong>auditables</strong> con registro público: origen, transferencias y retiros.
            </p>
          </div>

          <div className="card vp-card">
            <div className="card-icon"><FaLeaf /></div>
            <h3 className="card-title">Empoderamos al productor</h3>
            <p className="card-text">
              Las prácticas sostenibles se convierten en <strong>activos digitales negociables</strong>.
            </p>
          </div>

          <div className="card vp-card">
            <div className="card-icon"><FaGlobeAmericas /></div>
            <h3 className="card-title">Escala e impacto</h3>
            <p className="card-text">
              Mercado global 24/7 con <strong>métricas de impacto</strong> y trazabilidad por proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Lo que nos hace únicos</h2>

        <div className="vp-unique">
          <div className="vp-unique-head">
            <div className="col empty" />
            <div className="col col-bad">Mercado tradicional</div>
            <div className="col col-good">Zucane</div>
          </div>

          <div className="vp-unique-row">
            <div className="feat">
              <span className="feat-dot" />
              Liquidación y comisiones
            </div>
            <div className="bad">Lenta, costos altos</div>
            <div className="good">
              <span className="tag">Stellar</span> Segundos + comisiones bajas
            </div>
          </div>

          <div className="vp-unique-row">
            <div className="feat">
                <span className="feat-dot" />
                Transparencia y auditoría
            </div>
            <div className="bad">Documentos aislados</div>
            <div className="good">Token <strong>auditable on-chain</strong></div>
          </div>

          <div className="vp-unique-row">
            <div className="feat">
                <span className="feat-dot" />
                Beneficio al productor
            </div>
            <div className="bad">Intermediarios</div>
            <div className="good">Flujo <strong>directo al agricultor</strong></div>
          </div>

          <div className="vp-unique-row">
            <div className="feat">
                <span className="feat-dot" />
                Métricas de impacto
            </div>
            <div className="bad">Opacas / tardías</div>
            <div className="good"><strong>Dashboard</strong> en tiempo real</div>
          </div>
        </div>
      </section>
    </div>
  );
}