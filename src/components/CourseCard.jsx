import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   CourseCard — Tarjeta de curso individual
   Props:
     title       string   — Nombre del curso
     description string   — Descripción breve
     progress    number   — 0 a 100
     tag         string   — Etiqueta de estado (default: "En progreso")
───────────────────────────────────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --bg:              #F4F6FB;
    --surface:         #FFFFFF;
    --border:          #E8ECF4;
    --border-strong:   #D1D9EC;
    --text-primary:    #0F172A;
    --text-secondary:  #4B5675;
    --text-tertiary:   #8B96B0;
    --accent:          #4361EE;
    --accent-light:    #EEF1FD;
    --accent-hover:    #3451D1;
    --accent-2:        #06C896;
    --accent-2-light:  #E8FBF4;
    --accent-3:        #F59E0B;
    --shadow-sm:       0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-lg:       0 8px 24px rgba(15,23,42,0.10), 0 4px 8px rgba(15,23,42,0.05);
    --shadow-accent:   0 6px 20px rgba(67,97,238,0.25);
    --radius-md:       14px;
    --radius-xl:       22px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  /* ── Card wrapper ── */
  .course-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 24px;
    width: 100%;
    max-width: 340px;
    box-shadow: var(--shadow-sm);
    transition: all 0.22s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .course-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(67,97,238,0.03) 0%, transparent 60%);
    pointer-events: none;
    border-radius: var(--radius-xl);
    opacity: 0;
    transition: opacity 0.22s;
  }
  .course-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(67,97,238,0.2);
  }
  .course-card:hover::after { opacity: 1; }

  /* ── Top row: icon + tag ── */
  .course-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
  }
  .course-icon {
    width: 50px;
    height: 50px;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--accent) 0%, #818CF8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: var(--shadow-accent);
    flex-shrink: 0;
  }
  .course-tag {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
    padding: 4px 9px;
    border-radius: 20px;
    background: var(--accent-2-light);
    color: var(--accent-2);
    white-space: nowrap;
  }

  /* ── Text ── */
  .course-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.3px;
    margin: 0 0 6px;
    line-height: 1.3;
  }
  .course-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0 0 20px;
  }

  /* ── Progress ── */
  .course-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7px;
  }
  .course-progress-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.6px;
    color: var(--text-tertiary);
    text-transform: uppercase;
  }
  .course-progress-pct {
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    font-family: 'DM Mono', monospace;
  }
  .course-track {
    height: 6px;
    background: var(--border);
    border-radius: 99px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .course-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
  }

  /* ── Button ── */
  .course-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: var(--accent);
    color: white;
    padding: 11px 16px;
    border-radius: var(--radius-md);
    border: none;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    box-shadow: var(--shadow-accent);
    letter-spacing: 0.1px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .course-btn:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(67,97,238,0.3);
  }
  .course-btn:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.18s ease; }

  /* ── Demo wrapper ── */
  .coursecard-demo {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

/* Determina el color del fill según el porcentaje */
function getProgressGradient(progress) {
  if (progress >= 75) return "linear-gradient(90deg, #06C896, #34D399)";
  if (progress >= 40) return "linear-gradient(90deg, #4361EE, #818CF8)";
  return "linear-gradient(90deg, #F59E0B, #FCD34D)";
}

export default function CourseCard({ title, description, progress, tag = "En progreso" }) {
  return (
    <div className="course-card">
      {/* Top row */}
      <div className="course-card-top">
        <div className="course-icon">
          <BookOpen size={22} />
        </div>
        <span className="course-tag">{tag}</span>
      </div>

      {/* Text */}
      <h3 className="course-title">{title}</h3>
      <p className="course-desc">{description}</p>

      {/* Progress */}
      <div className="course-progress-header">
        <span className="course-progress-label">Progreso</span>
        <span className="course-progress-pct">{progress}%</span>
      </div>
      <div className="course-track">
        <div
          className="course-fill"
          style={{
            width: `${progress}%`,
            background: getProgressGradient(progress),
          }}
        />
      </div>

      {/* CTA */}
      <button className="course-btn">
        Continuar
        <ArrowRight size={15} className="btn-arrow" />
      </button>
    </div>
  );
}

/* ── Preview ─────────────────────────────── */
export function CourseCardPreview() {
  return (
    <>
      <style>{styles}</style>
      <div className="coursecard-demo">
        <CourseCard
          title="Diseño UI/UX Moderno"
          description="Principios de diseño visual aplicados a interfaces web y móviles de alto impacto."
          progress={72}
          tag="En progreso"
        />
        <CourseCard
          title="React Avanzado"
          description="Hooks, contexto, rendimiento y patrones de arquitectura para apps escalables."
          progress={45}
          tag="En progreso"
        />
        <CourseCard
          title="TypeScript Profesional"
          description="Tipado estático, genéricos y mejores prácticas para proyectos en producción."
          progress={88}
          tag="Casi listo"
        />
      </div>
    </>
  );
}