import React, { useEffect, useState } from "react";
import TopNavBar from "../TopNavBar";
import {
  FaUsers, FaLeaf, FaDollarSign, FaChartBar, FaRocket, FaGlobeAmericas
} from "react-icons/fa";
import { LuTrendingUp, LuLayers, LuSparkles } from "react-icons/lu";

export default function Impacto() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // progress bar (igual que Landing/Solution/Users)
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
    <div className="landing-container imp-bg">
      <TopNavBar />
      <div className="scroll-indicator" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      {/* HERO */}
      <section className="imp-hero" id="impacto">
        <h1 className="imp-title">Impacto y Escalabilidad</h1>
        <div className="imp-underline" />
        <p className="imp-sub">
          Métricas medibles, beneficios directos y un modelo listo para replicarse en Latinoamérica.
        </p>

        <div className="solution-badges">
          <span className="solution-badge"><FaUsers /> Inclusión financiera</span>
          <span className="solution-badge"><FaLeaf /> Reducción de emisiones</span>
          <span className="solution-badge"><FaDollarSign /> Mercado de créditos verdes</span>
          <span className="solution-badge"><LuTrendingUp /> Escalabilidad regional</span>
        </div>
      </section>

      <section className="section">
        <div className="impact-kpis">
          <div className="kpi">
            <div className="kpi-num">+150</div>
            <div className="kpi-label">Agricultores incluidos</div>
          </div>
          <div className="kpi">
            <div className="kpi-num">2,500 t</div>
            <div className="kpi-label">CO₂ compensado</div>
          </div>
          <div className="kpi">
            <div className="kpi-num">24/7</div>
            <div className="kpi-label">Liquidez del mercado</div>
          </div>
        </div>
      </section>

      {/* TRES PILARES DE IMPACTO */}
      <section className="section">
        <h2 className="section-title">Impacto</h2>
        <div className="imp-grid">
          <div className="card imp-card">
            <div className="card-icon"><FaUsers /></div>
            <h3 className="card-title">Social</h3>
            <p className="card-text">
              Inclusión financiera para agricultores con acceso directo a compradores y recompensas por prácticas sostenibles.
            </p>
          </div>
          <div className="card imp-card">
            <div className="card-icon"><FaLeaf /></div>
            <h3 className="card-title">Ambiental</h3>
            <p className="card-text">
              Reducción <strong>medible</strong> de emisiones vía agricultura regenerativa y retiro de tokens on-chain.
            </p>
          </div>
          <div className="card imp-card">
            <div className="card-icon"><FaDollarSign /></div>
            <h3 className="card-title">Económico</h3>
            <p className="card-text">
              Mercado local de créditos verdes con liquidez global y comisiones bajas en Stellar.
            </p>
          </div>
        </div>
      </section>

      {/* ESCALABILIDAD */}
    <section className="section scal-section">
    <h2 className="section-title">Escalabilidad</h2>

    <div className="scalability-wrap">
        <div className="scal-text">
        <p className="card-text">
            El modelo se puede replicar por cultivo y región: mismos estándares, nuevas fuentes de captura.
        </p>

        <div className="pill-chips">
            <span className="pill-chip"><LuLayers /> Agave</span>
            <span className="pill-chip"><LuLayers /> Maíz</span>
            <span className="pill-chip"><LuLayers /> Café</span>
            <span className="pill-chip"><LuLayers /> Otros cultivos</span>
        </div>
        </div>

        {/* quedará ABAJO al ser 1 columna */}
        <div className="scal-roadmap" aria-label="Roadmap de escalabilidad">
        <div className="rm-line" />
        <div className="rm-step">
            <div className="rm-dot"><LuSparkles /></div>
            <div className="rm-info"><h4>Piloto</h4><p>Caña · Xochitepec</p></div>
        </div>
        <div className="rm-step">
            <div className="rm-dot"><FaRocket /></div>
            <div className="rm-info"><h4>Expansión</h4><p>Agave · Centro-Sur MX</p></div>
        </div>
        <div className="rm-step">
            <div className="rm-dot"><FaChartBar /></div>
            <div className="rm-info"><h4>Escala</h4><p>Maíz & Café · LATAM</p></div>
        </div>
        </div>
    </div>
    </section>
    </div>
  );
}