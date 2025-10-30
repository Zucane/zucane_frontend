import React, { useEffect, useState } from "react";
import TopNavBar from "../TopNavBar";
import { FaUsers, FaHeart, FaBolt, FaLeaf, FaGithub, FaLinkedin } from "react-icons/fa";

const members = [
  { name: "Alonso",   role: "Full-stack · DevOps",   gh: "", li: "" },
  { name: "Martín",   role: "Back-end · APIs",       gh: "", li: "" },
  { name: "Miguel",   role: "Front-end · UI",        gh: "", li: "" },
  { name: "Ignacio",  role: "Data · Integraciones",  gh: "", li: "" },
  { name: "Aquino",   role: "Producto · UX",         gh: "", li: "" },
];

// helper para iniciales
const initials = (n) => n.split(/\s+/).map(p => p[0]).join("").slice(0,2).toUpperCase();

export default function Team() {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || 0;
      const dh = (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(dh > 0 ? (st / dh) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-container team-bg">
      <TopNavBar />
      <div className="scroll-indicator" style={{ transform: `scaleX(${scrollProgress/100})` }} />

      {/* HERO */}
      <section className="team-hero">
        <h1 className="team-title">Nuestro Equipo</h1>
        <div className="team-underline" />
        <p className="team-sub">
          Un equipo de mentes diversas y corazones apasionados, unidos por los retos y la tecnología.
          Cinco estudiantes de desarrollo de software que comparten el mismo fervor por crear soluciones innovadoras.
        </p>

        {/* badges con animación secuencial */}
        <div className="solution-badges team-badges">
          <span className="solution-badge"><FaUsers /> Multidisciplinarios</span>
          <span className="solution-badge"><FaBolt /> Enfoque a resultados</span>
          <span className="solution-badge"><FaLeaf /> Impacto responsable</span>
          <span className="solution-badge"><FaHeart /> Cultura de equipo</span>
        </div>
      </section>

      {/* GRID DE MIEMBROS */}
      <section className="section">
        <div className="team-grid">
          {members.map((m) => (
            <article className="team-card" key={m.name}>
              <div className="team-avatar" aria-hidden="true">
                <span>{initials(m.name)}</span>
              </div>
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>

              <div className="team-tags">
                <span className="team-tag">#CleanArchitecture</span>
                <span className="team-tag">#SpringBoot</span>
                <span className="team-tag">#Vue/React</span>
              </div>

              <div className="team-links">
                {m.gh ? <a href={m.gh} aria-label={`GitHub de ${m.name}`}><FaGithub/></a> : <span className="team-link-disabled"><FaGithub/></span>}
                {m.li ? <a href={m.li} aria-label={`LinkedIn de ${m.name}`}><FaLinkedin/></a> : <span className="team-link-disabled"><FaLinkedin/></span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MANIFIESTO */}
      <section className="section">
        <div className="team-callout">
          <p>
            Somos más que un equipo: una familia de creadores lista para dejar huella.
            Disfrutamos el proceso, aprendemos juntos y construimos un futuro digital lleno de posibilidades.
          </p>
        </div>
      </section>
    </div>
  );
}