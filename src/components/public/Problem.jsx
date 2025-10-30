import React from "react";
import "./styles.css";
import TopNavBar from "../TopNavBar";
import { MdOutlineMoneyOff } from "react-icons/md";
import { VscWorkspaceUntrusted } from "react-icons/vsc";
import { GrDocumentMissing } from "react-icons/gr";

export default function Problem() {
  return (
    <div className="landing-container problem-bg">
      <TopNavBar />

    <section className="problem-hero" id="problema">
        <h1 className="problem-title">
            El mercado de créditos de carbono no funciona para todos
        </h1>
        <div className="problem-underline" />

        <p className="problem-sub">
            Hoy existen <strong>barreras de acceso</strong>, poca{" "}
            <strong>trazabilidad</strong> y
            <strong> falta de transparencia</strong>, especialmente para pequeños
            productores.
        </p>

        <div className="problem-horizontal">
            <div className="problem-badges">
            <span className="problem-badge">Falta de transparencia</span>
            <span className="problem-badge">Barreras de acceso</span>
            <span className="problem-badge">Trazabilidad limitada</span>
            <span className="problem-badge">Baja monetización</span>
            </div>

            <div className="problem-points">
            <span>
                <MdOutlineMoneyOff style={{ color: "var(--secondary-green)", fontSize: "1.2rem" }}/>Los agricultores de caña <strong>no pueden certificar ni monetizar</strong> fácilmente sus prácticas sostenibles.
            </span>
            <span>
                <VscWorkspaceUntrusted style={{ color: "var(--secondary-green)", fontSize: "1.2rem" }}/> Empresas y ciudadanía <strong>carecen de medios confiables</strong> para compensar su huella de carbono.
            </span>
            <span>
                <GrDocumentMissing style={{ color: "var(--secondary-green)", fontSize: "1.2rem" }}/> El origen de los créditos <strong>no es claro ni auditable</strong>.
            </span>
            </div>
        </div>

        <div
            className="problem-callout"
            role="note"
            aria-label="Resumen del problema"
        >
            <span className="pill">En resumen</span>
            <p style={{ margin: 0 }}>
            La transición hacia una economía verde sigue siendo{" "}
            <strong>inaccesible</strong> para quienes más contribuyen al planeta.
            </p>
        </div>
    </section>

    <div className="problem-sep" aria-hidden="true" />
    </div>
  );
}
