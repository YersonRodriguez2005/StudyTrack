import React from "react";
import {
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   ProgressOverview — Análisis de progreso y constancia
   Sin props — datos mockeados en constantes al final.
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
    --accent-2:        #06C896;
    --accent-2-light:  #E8FBF4;
    --accent-3:        #F59E0B;
    --accent-3-light:  #FEF3CD;
    --accent-4:        #8B5CF6;
    --accent-4-light:  #EDE9FE;
    --shadow-sm:       0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:       0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
    --shadow-accent:   0 6px 20px rgba(67,97,238,0.22);
    --radius-sm:       10px;
    --radius-md:       14px;
    --radius-lg:       18px;
    --radius-xl:       22px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  .progress-demo { background: var(--bg); min-height: 100vh; padding: 12px 0; }

  /* ── Section shell ── */
  .po-section {
    padding: 28px 28px 48px;
    max-width: 960px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .po-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-light); padding: 4px 10px;
    border-radius: 20px; margin-bottom: 10px;
  }
  .po-title {
    font-size: 28px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.6px; margin: 0 0 6px;
  }
  .po-subtitle {
    font-size: 14px; color: var(--text-secondary);
    margin: 0 0 28px; line-height: 1.5;
  }

  /* ── KPI grid ── */
  .po-kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 14px;
    margin-bottom: 22px;
  }

  /* ── KPI card ── */
  .po-kpi {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px 20px 18px;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
    position: relative; overflow: hidden;
  }
  .po-kpi::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    background: var(--kpi-color, var(--accent));
    opacity: 0; transition: opacity 0.2s ease;
  }
  .po-kpi:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
  .po-kpi:hover::before { opacity: 1; }

  .po-kpi-top {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 14px;
  }
  .po-kpi-icon {
    width: 40px; height: 40px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    background: var(--kpi-icon-bg, var(--accent-light));
  }
  .po-kpi-trend {
    font-size: 10.5px; font-weight: 600;
    padding: 2px 7px; border-radius: 20px;
    background: var(--accent-2-light); color: var(--accent-2);
  }
  .po-kpi-value {
    font-size: 28px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.8px; line-height: 1;
    font-family: 'DM Mono', monospace;
  }
  .po-kpi-label {
    font-size: 12.5px; font-weight: 600; color: var(--text-secondary);
    margin-top: 4px;
  }
  .po-kpi-sub {
    font-size: 11px; color: var(--text-tertiary); margin-top: 2px;
  }

  /* ── Bottom grid ── */
  .po-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  @media (max-width: 720px) {
    .po-bottom { grid-template-columns: 1fr; }
  }

  /* ── Panel card ── */
  .po-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 24px;
    box-shadow: var(--shadow-sm);
  }
  .po-panel-title {
    font-size: 15px; font-weight: 700; color: var(--text-primary);
    letter-spacing: -0.2px; margin: 0 0 20px;
  }

  /* ── Course progress rows ── */
  .po-course-row { margin-bottom: 18px; }
  .po-course-row:last-child { margin-bottom: 0; }
  .po-course-meta {
    display: flex; justify-content: space-between;
    align-items: center; margin-bottom: 7px;
  }
  .po-course-name {
    font-size: 13px; font-weight: 600; color: var(--text-primary);
  }
  .po-course-pct {
    font-size: 12px; font-weight: 700;
    color: var(--accent); font-family: 'DM Mono', monospace;
  }
  .po-track {
    height: 7px; background: var(--border); border-radius: 99px; overflow: hidden;
  }
  .po-fill {
    height: 100%; border-radius: 99px;
    transition: width 0.7s cubic-bezier(.4,0,.2,1);
  }

  /* ── Weekly bar chart ── */
  .po-bars-wrap {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    height: 140px;
    padding-bottom: 0;
  }
  .po-bar-col {
    flex: 1;
    display: flex; flex-direction: column;
    align-items: center; gap: 8px;
    height: 100%;
  }
  .po-bar-track {
    flex: 1; width: 100%;
    background: var(--border);
    border-radius: 6px;
    display: flex; flex-direction: column;
    justify-content: flex-end; overflow: hidden;
  }
  .po-bar-fill {
    width: 100%; border-radius: 6px;
    background: linear-gradient(180deg, var(--accent) 0%, #818CF8 100%);
    transition: height 0.6s cubic-bezier(.4,0,.2,1);
    min-height: 4px;
  }
  .po-bar-fill.today {
    background: linear-gradient(180deg, var(--accent-2) 0%, #34D399 100%);
  }
  .po-bar-day {
    font-size: 11px; font-weight: 600;
    color: var(--text-tertiary); text-align: center;
  }
  .po-bar-day.today { color: var(--accent-2); font-weight: 700; }
`;

/* ── Internal: KpiCard ──────────────────── */
function KpiCard({ icon, iconBg, color, title, value, subtitle, trend }) {
  return (
    <div className="po-kpi" style={{ "--kpi-color": color, "--kpi-icon-bg": iconBg }}>
      <div className="po-kpi-top">
        <div className="po-kpi-icon">{icon}</div>
        {trend && <span className="po-kpi-trend">{trend}</span>}
      </div>
      <div className="po-kpi-value">{value}</div>
      <div className="po-kpi-label">{title}</div>
      <div className="po-kpi-sub">{subtitle}</div>
    </div>
  );
}

/* ── Internal: CourseProgress ───────────── */
function CourseProgress({ title, progress, color }) {
  return (
    <div className="po-course-row">
      <div className="po-course-meta">
        <span className="po-course-name">{title}</span>
        <span className="po-course-pct">{progress}%</span>
      </div>
      <div className="po-track">
        <div
          className="po-fill"
          style={{ width: `${progress}%`, background: color || "linear-gradient(90deg, #4361EE, #818CF8)" }}
        />
      </div>
    </div>
  );
}

/* ── Internal: WeekBar ──────────────────── */
function WeekBar({ day, value, isToday }) {
  return (
    <div className="po-bar-col">
      <div className="po-bar-track">
        <div
          className={`po-bar-fill${isToday ? " today" : ""}`}
          style={{ height: `${value}%` }}
        />
      </div>
      <span className={`po-bar-day${isToday ? " today" : ""}`}>{day}</span>
    </div>
  );
}

/* ── DATA ───────────────────────────────── */
const KPIS = [
  {
    icon: <TrendingUp size={18} color="var(--accent)" />,
    iconBg: "var(--accent-light)",
    color: "var(--accent)",
    title: "Progreso General",
    value: "68%",
    subtitle: "Acumulado en todos los cursos",
    trend: "+5% este mes",
  },
  {
    icon: <CheckCircle2 size={18} color="var(--accent-2)" />,
    iconBg: "var(--accent-2-light)",
    color: "var(--accent-2)",
    title: "Tareas Completadas",
    value: "42",
    subtitle: "Total hasta la fecha",
    trend: "+8 esta semana",
  },
  {
    icon: <Clock size={18} color="var(--accent-3)" />,
    iconBg: "var(--accent-3-light)",
    color: "var(--accent-3)",
    title: "Horas de Estudio",
    value: "36h",
    subtitle: "Últimas 4 semanas",
    trend: "~9h/semana",
  },
  {
    icon: <BarChart3 size={18} color="var(--accent-4)" />,
    iconBg: "var(--accent-4-light)",
    color: "var(--accent-4)",
    title: "Constancia",
    value: "Alta",
    subtitle: "5 días por semana",
    trend: "🔥 Racha activa",
  },
];

const COURSES = [
  { title: "React Básico",           progress: 80, color: "linear-gradient(90deg, #4361EE, #818CF8)" },
  { title: "Diseño UI/UX",           progress: 65, color: "linear-gradient(90deg, #06C896, #34D399)" },
  { title: "JavaScript Avanzado",    progress: 40, color: "linear-gradient(90deg, #F59E0B, #FCD34D)" },
];

const WEEK_BARS = [
  { day: "L", value: 60 },
  { day: "M", value: 80 },
  { day: "X", value: 50 },
  { day: "J", value: 90 },
  { day: "V", value: 70, isToday: true },
  { day: "S", value: 40 },
  { day: "D", value: 20 },
];

/* ── Main component ───────────────────────── */
export default function ProgressOverview() {
  return (
    <>
      <style>{styles}</style>
      <div className="progress-demo">
        <section className="po-section">
          {/* Header */}
          <div className="po-eyebrow"><Sparkles size={11} /> Analítica</div>
          <h1 className="po-title">Progreso de Aprendizaje</h1>
          <p className="po-subtitle">Análisis detallado de tu desempeño y constancia semanal.</p>

          {/* KPIs */}
          <div className="po-kpi-grid">
            {KPIS.map((k) => <KpiCard key={k.title} {...k} />)}
          </div>

          {/* Bottom panels */}
          <div className="po-bottom">
            {/* Courses */}
            <div className="po-panel">
              <p className="po-panel-title">Progreso por Curso</p>
              {COURSES.map((c) => <CourseProgress key={c.title} {...c} />)}
            </div>

            {/* Weekly chart */}
            <div className="po-panel">
              <p className="po-panel-title">Actividad Semanal</p>
              <div className="po-bars-wrap">
                {WEEK_BARS.map((b, i) => <WeekBar key={i} {...b} />)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}