import React from "react";
import { BookOpen, CheckSquare, LineChart, Sparkles, TrendingUp } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   DashboardOverview — Sección principal del dashboard
   Sin props requeridos — datos mockeados internamente.
   Para conectar datos reales, reemplaza las constantes
   en la sección "DATA" al final del archivo.
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
    --accent-3-light:  #FEF3CD;
    --shadow-sm:       0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:       0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
    --radius-sm:       10px;
    --radius-lg:       18px;
    --radius-xl:       22px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  /* ── Demo bg ── */
  .overview-demo { background: var(--bg); min-height: 100vh; padding: 12px 0; }

  /* ── Section shell ── */
  .section {
    padding: 28px 28px 40px;
    max-width: 960px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .section-header { margin-bottom: 28px; }
  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--accent);
    background: var(--accent-light);
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 10px;
  }
  .section-title {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.6px;
    margin: 0 0 6px;
  }
  .section-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
  }

  /* ── Stat grid ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }

  /* ── Stat card ── */
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 22px 22px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: var(--shadow-sm);
    transition: all 0.22s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  /* Accent top bar — revealed on hover */
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    background: var(--card-accent, var(--accent));
    opacity: 0;
    transition: opacity 0.22s ease;
  }
  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
  }
  .stat-card:hover::before { opacity: 1; }

  .stat-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .stat-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--icon-bg, var(--accent-light));
  }
  .stat-trend {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 20px;
    background: var(--accent-2-light);
    color: var(--accent-2);
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .stat-value {
    font-size: 32px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -1px;
    line-height: 1;
  }
  .stat-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
  }
  .stat-sub {
    font-size: 11.5px;
    color: var(--text-tertiary);
    margin-top: 2px;
  }

  /* ── Progress card ── */
  .progress-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 28px;
    box-shadow: var(--shadow-sm);
    margin-top: 4px;
  }
  .progress-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 12px;
  }
  .progress-card-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.3px;
    margin: 0 0 4px;
  }
  .progress-card-sub {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
  }
  .progress-pct-badge {
    font-size: 22px;
    font-weight: 800;
    color: var(--accent);
    background: var(--accent-light);
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
    letter-spacing: -0.5px;
    font-family: 'DM Mono', monospace;
  }
  .progress-track {
    background: var(--border);
    border-radius: 99px;
    height: 10px;
    overflow: visible;
    position: relative;
  }
  .progress-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--accent) 0%, #818CF8 100%);
    transition: width 0.8s cubic-bezier(.4,0,.2,1);
    position: relative;
  }
  /* Thumb dot at the end of the bar */
  .progress-fill::after {
    content: '';
    position: absolute;
    right: -1px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    border: 3px solid var(--accent);
    box-shadow: 0 2px 6px rgba(67,97,238,0.4);
  }
  .progress-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
  }
  .progress-meta-item {
    font-size: 12px;
    color: var(--text-tertiary);
    font-weight: 500;
  }
  .progress-meta-item strong { color: var(--text-secondary); }
`;

/* ── Internal StatCard ────────────────────── */
function StatCard({ icon, iconBg, accentColor, title, value, subtitle, trend }) {
  return (
    <div
      className="stat-card"
      style={{ "--card-accent": accentColor, "--icon-bg": iconBg }}
    >
      <div className="stat-card-top">
        <div className="stat-icon-wrap">{icon}</div>
        {trend && (
          <span className="stat-trend">
            <TrendingUp size={10} />
            {trend}
          </span>
        )}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
        <div className="stat-sub">{subtitle}</div>
      </div>
    </div>
  );
}

/* ── DATA — reemplaza con props o fetch real ── */
const STATS = [
  {
    icon: <BookOpen size={20} color="var(--accent)" />,
    iconBg: "var(--accent-light)",
    accentColor: "var(--accent)",
    title: "Cursos Activos",
    value: "6",
    subtitle: "Actualmente en progreso",
    trend: "+2 este mes",
  },
  {
    icon: <CheckSquare size={20} color="var(--accent-3)" />,
    iconBg: "var(--accent-3-light)",
    accentColor: "var(--accent-3)",
    title: "Tareas Pendientes",
    value: "12",
    subtitle: "Para completar esta semana",
    trend: "3 vencen hoy",
  },
  {
    icon: <LineChart size={20} color="var(--accent-2)" />,
    iconBg: "var(--accent-2-light)",
    accentColor: "var(--accent-2)",
    title: "Progreso Semanal",
    value: "78%",
    subtitle: "Comparado con semana anterior",
    trend: "+12%",
  },
];

const OVERALL_PROGRESS = 65;

/* ── Main component ───────────────────────── */
export default function DashboardOverview() {
  return (
    <>
      <style>{styles}</style>
      <div className="overview-demo">
        <section className="section">
          {/* Header */}
          <div className="section-header">
            <div className="section-eyebrow">
              <Sparkles size={11} />
              Resumen
            </div>
            <h1 className="section-title">Dashboard General</h1>
            <p className="section-subtitle">
              Tu actividad reciente y estado actualizado de todos tus cursos.
            </p>
          </div>

          {/* Stat grid */}
          <div className="stat-grid">
            {STATS.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </div>

          {/* Overall progress */}
          <div className="progress-card">
            <div className="progress-card-header">
              <div>
                <p className="progress-card-title">Progreso General de Aprendizaje</p>
                <p className="progress-card-sub">
                  Avance acumulado en todos los cursos activos.
                </p>
              </div>
              <span className="progress-pct-badge">{OVERALL_PROGRESS}%</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${OVERALL_PROGRESS}%` }}
              />
            </div>

            <div className="progress-meta">
              <span className="progress-meta-item">
                <strong>0%</strong> inicio
              </span>
              <span className="progress-meta-item">
                <strong>Meta:</strong> completar antes del 30 jun
              </span>
              <span className="progress-meta-item">
                <strong>100%</strong> meta
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}