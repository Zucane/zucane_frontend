import React, { useRef, useEffect, useState } from "react";
import { FaUserCheck, FaRocket, FaChartLine } from "react-icons/fa";
import { LuShieldCheck, LuWallet } from "react-icons/lu";

export default function Timeline() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const steps = [
    {
      title: "Registro",
      icon: <FaUserCheck />,
      desc: "Crea tu cuenta y perfil.",
    },
    {
      title: "Verificación",
      icon: <LuShieldCheck />,
      desc: "Validación/KYC y proyecto.",
    },
    { title: "Wallet", icon: <LuWallet />, desc: "Activa tu billetera." },
    { title: "Lanzamiento", icon: <FaRocket />, desc: "Empieza a operar." },
    {
      title: "Métricas e impacto",
      icon: <FaChartLine />,
      desc: "Sigue tus resultados.",
    },
  ];

  return (
    <div
      ref={ref}
      className={`u-timeline ${visible ? "is-visible" : ""}`}
      role="list"
      aria-label="Timeline del viaje del usuario"
    >
      {/* línea de fondo */}
      <div className="u-timeline-line" aria-hidden="true" />

      {steps.map((s, idx) => (
        <div className="u-timeline-step" role="listitem" key={idx}>
          <div className="u-step-dot">
            <div className="u-step-ring" />
            <div className="u-step-icon" aria-hidden="true">
              {s.icon}
            </div>
          </div>
          <div className="u-step-info">
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
