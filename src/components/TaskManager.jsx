import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Plus,
  X,
  AlertCircle,
  Sparkles,
  Circle,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   TaskManager — Gestor de tareas con modal de creación
   Sin props — estado interno con datos mockeados en DATA.
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
    --accent-4:        #8B5CF6;
    --accent-4-light:  #EDE9FE;
    --danger:          #EF4444;
    --danger-light:    #FEF2F2;
    --shadow-sm:       0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:       0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
    --shadow-lg:       0 8px 24px rgba(15,23,42,0.12), 0 4px 8px rgba(15,23,42,0.06);
    --shadow-accent:   0 6px 20px rgba(67,97,238,0.22);
    --radius-sm:       10px;
    --radius-md:       14px;
    --radius-lg:       18px;
    --radius-xl:       22px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  .tm-demo { background: var(--bg); min-height: 100vh; padding: 12px 0; }

  /* ── Section shell ── */
  .tm-section {
    padding: 28px 28px 48px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  /* ── Header ── */
  .tm-header-row {
    display: flex; justify-content: space-between;
    align-items: flex-end; margin-bottom: 28px; gap: 16px;
  }
  .tm-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-light); padding: 4px 10px;
    border-radius: 20px; margin-bottom: 10px;
  }
  .tm-title {
    font-size: 28px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.6px; margin: 0 0 4px;
  }
  .tm-subtitle { font-size: 14px; color: var(--text-secondary); margin: 0; }

  .tm-new-btn {
    display: flex; align-items: center; gap: 7px;
    background: var(--accent); color: white;
    padding: 10px 18px; border-radius: var(--radius-md);
    border: none; font-size: 13.5px; font-weight: 700;
    cursor: pointer; transition: all 0.18s ease;
    box-shadow: var(--shadow-accent); white-space: nowrap;
    font-family: 'Plus Jakarta Sans', sans-serif;
    flex-shrink: 0;
  }
  .tm-new-btn:hover {
    background: var(--accent-hover); transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(67,97,238,0.3);
  }

  /* ── Summary strip ── */
  .tm-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px; margin-bottom: 24px;
  }
  .tm-summary-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 16px 18px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: var(--shadow-sm); transition: all 0.2s ease;
    position: relative; overflow: hidden;
  }
  .tm-summary-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    background: var(--s-color, var(--accent));
    opacity: 0; transition: opacity 0.2s ease;
  }
  .tm-summary-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .tm-summary-card:hover::before { opacity: 1; }

  .tm-summary-icon {
    width: 38px; height: 38px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    background: var(--s-icon-bg, var(--accent-light)); flex-shrink: 0;
  }
  .tm-summary-label { font-size: 11.5px; font-weight: 600; color: var(--text-tertiary); }
  .tm-summary-value {
    font-size: 24px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.6px; line-height: 1;
    font-family: 'DM Mono', monospace;
  }

  /* ── Task list ── */
  .tm-list { display: flex; flex-direction: column; gap: 10px; }

  /* ── Task card ── */
  .tm-task {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 18px 20px;
    box-shadow: var(--shadow-sm); transition: all 0.2s ease;
    display: flex; flex-direction: column; gap: 12px;
  }
  .tm-task:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); border-color: var(--border-strong); }
  .tm-task--completed { opacity: 0.65; }
  .tm-task--completed .tm-task-title { text-decoration: line-through; color: var(--text-tertiary); }

  .tm-task-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .tm-task-title-wrap { flex: 1; min-width: 0; }
  .tm-task-title {
    font-size: 15px; font-weight: 700; color: var(--text-primary);
    margin: 0 0 4px; letter-spacing: -0.2px; line-height: 1.3;
  }
  .tm-task-desc { font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.4; }

  /* Status badge */
  .tm-status {
    flex-shrink: 0; font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.3px; padding: 3px 9px; border-radius: 20px;
    white-space: nowrap;
  }
  .tm-status--pending   { background: var(--accent-3-light); color: var(--accent-3); }
  .tm-status--progress  { background: var(--accent-light);   color: var(--accent);   }
  .tm-status--completed { background: var(--accent-2-light); color: var(--accent-2); }

  .tm-task-footer {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 10px; border-top: 1px solid var(--border);
  }
  .tm-task-date {
    display: flex; align-items: center; gap: 5px;
    font-size: 12px; color: var(--text-tertiary); font-weight: 500;
  }
  .tm-priority {
    font-size: 11px; font-weight: 700; padding: 2px 8px;
    border-radius: 20px;
  }
  .tm-priority--alta { background: var(--danger-light); color: var(--danger); }
  .tm-priority--media { background: var(--accent-3-light); color: var(--accent-3); }
  .tm-priority--baja { background: var(--accent-2-light); color: var(--accent-2); }

  /* ── Modal overlay ── */
  .tm-overlay {
    position: fixed; inset: 0; z-index: 300;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: overlayIn 0.18s ease both;
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .tm-overlay-bg {
    position: absolute; inset: 0;
    background: rgba(15,23,42,0.45);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  /* ── Modal panel ── */
  .tm-modal {
    position: relative; z-index: 1;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); width: 100%; max-width: 480px;
    padding: 28px; box-shadow: var(--shadow-lg);
    animation: modalIn 0.22s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.94) translateY(10px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  .tm-modal-header {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 24px;
  }
  .tm-modal-title {
    font-size: 20px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.4px; margin: 0 0 4px;
  }
  .tm-modal-sub { font-size: 13px; color: var(--text-secondary); margin: 0; }
  .tm-modal-close {
    width: 32px; height: 32px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: var(--bg);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text-secondary); transition: all 0.16s ease;
    flex-shrink: 0;
  }
  .tm-modal-close:hover { background: var(--danger-light); border-color: var(--danger); color: var(--danger); }

  .tm-modal-form { display: flex; flex-direction: column; gap: 16px; }
  .tm-modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .tm-modal-footer {
    display: flex; justify-content: flex-end; gap: 10px;
    margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border);
  }
  .tm-modal-cancel {
    padding: 9px 18px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: var(--bg);
    font-size: 13.5px; font-weight: 600; color: var(--text-secondary);
    cursor: pointer; transition: all 0.16s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .tm-modal-cancel:hover { border-color: var(--border-strong); background: var(--surface); }
  .tm-modal-submit {
    padding: 9px 20px; border-radius: var(--radius-sm);
    background: var(--accent); color: white; border: none;
    font-size: 13.5px; font-weight: 700; cursor: pointer;
    box-shadow: var(--shadow-accent); transition: all 0.18s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .tm-modal-submit:hover { background: var(--accent-hover); transform: translateY(-1px); }

  /* ── Form fields ── */
  .tm-field { display: flex; flex-direction: column; gap: 5px; }
  .tm-label {
    font-size: 11.5px; font-weight: 700; letter-spacing: 0.3px;
    text-transform: uppercase; color: var(--text-tertiary);
  }
  .tm-input-wrap { position: relative; }
  .tm-input-icon {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    color: var(--text-tertiary); pointer-events: none;
    display: flex; align-items: center;
  }
  .tm-input, .tm-textarea, .tm-select {
    width: 100%; border: 1px solid var(--border);
    border-radius: var(--radius-sm); background: var(--bg);
    font-size: 13.5px; color: var(--text-primary);
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.16s ease; outline: none;
    padding: 9px 13px;
  }
  .tm-input.has-icon, .tm-select.has-icon { padding-left: 34px; }
  .tm-input:focus, .tm-textarea:focus, .tm-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(67,97,238,0.12);
    background: var(--surface);
  }
  .tm-input::placeholder, .tm-textarea::placeholder { color: var(--text-tertiary); }
  .tm-textarea { resize: none; padding: 9px 13px; }
  .tm-select { appearance: none; cursor: pointer; }
`;

/* ── Subcomponents ──────────────────────── */
function SummaryCard({ icon, iconBg, color, title, value }) {
  return (
    <div className="tm-summary-card" style={{ "--s-color": color, "--s-icon-bg": iconBg }}>
      <div className="tm-summary-icon">{icon}</div>
      <div>
        <div className="tm-summary-label">{title}</div>
        <div className="tm-summary-value">{value}</div>
      </div>
    </div>
  );
}

function TaskCard({ title, description, status, date, priority }) {
  const statusLabel = { pending: "Pendiente", progress: "En progreso", completed: "Completada" };
  const priorityClass = { Alta: "tm-priority--alta", Media: "tm-priority--media", Baja: "tm-priority--baja" };

  return (
    <div className={`tm-task${status === "completed" ? " tm-task--completed" : ""}`}>
      <div className="tm-task-top">
        <div className="tm-task-title-wrap">
          <p className="tm-task-title">{title}</p>
          <p className="tm-task-desc">{description}</p>
        </div>
        <span className={`tm-status tm-status--${status}`}>{statusLabel[status]}</span>
      </div>
      <div className="tm-task-footer">
        <span className="tm-task-date">
          <Calendar size={12} />
          {date}
        </span>
        <span className={`tm-priority ${priorityClass[priority]}`}>{priority}</span>
      </div>
    </div>
  );
}

function TaskModal({ onClose }) {
  return (
    <div className="tm-overlay">
      <div className="tm-overlay-bg" onClick={onClose} />
      <div className="tm-modal" role="dialog" aria-modal="true" aria-label="Nueva tarea">
        <div className="tm-modal-header">
          <div>
            <h2 className="tm-modal-title">Nueva Tarea</h2>
            <p className="tm-modal-sub">Registra una nueva actividad académica.</p>
          </div>
          <button className="tm-modal-close" onClick={onClose} aria-label="Cerrar modal">
            <X size={15} />
          </button>
        </div>

        <div className="tm-modal-form">
          <div className="tm-field">
            <label className="tm-label">Título</label>
            <input className="tm-input" placeholder="Ej: Estudiar React Hooks" />
          </div>

          <div className="tm-field">
            <label className="tm-label">Descripción</label>
            <textarea className="tm-textarea" rows={3} placeholder="Describe brevemente la tarea…" />
          </div>

          <div className="tm-modal-row">
            <div className="tm-field">
              <label className="tm-label">Fecha límite</label>
              <div className="tm-input-wrap">
                <span className="tm-input-icon"><Calendar size={14} /></span>
                <input type="date" className="tm-input has-icon" />
              </div>
            </div>
            <div className="tm-field">
              <label className="tm-label">Prioridad</label>
              <div className="tm-input-wrap">
                <span className="tm-input-icon"><AlertCircle size={14} /></span>
                <select className="tm-select has-icon">
                  <option>Baja</option>
                  <option>Media</option>
                  <option>Alta</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="tm-modal-footer">
          <button className="tm-modal-cancel" onClick={onClose}>Cancelar</button>
          <button className="tm-modal-submit">Crear tarea</button>
        </div>
      </div>
    </div>
  );
}

/* ── DATA ───────────────────────────────── */
const SUMMARY = [
  { icon: <Clock size={18} color="var(--accent-3)" />,   iconBg: "var(--accent-3-light)", color: "var(--accent-3)",   title: "Pendientes",  value: "5"  },
  { icon: <AlertTriangle size={18} color="var(--accent)" />, iconBg: "var(--accent-light)", color: "var(--accent)",     title: "En Progreso", value: "3"  },
  { icon: <CheckCircle2 size={18} color="var(--accent-2)" />, iconBg: "var(--accent-2-light)", color: "var(--accent-2)", title: "Completadas", value: "12" },
];

const TASKS = [
  {
    title:       "Finalizar proyecto React",
    description: "Completar componentes principales del dashboard y conexión con estado global.",
    status:      "progress",
    date:        "25 Ago 2025",
    priority:    "Alta",
  },
  {
    title:       "Estudiar jerarquía UI/UX",
    description: "Repasar principios de jerarquía visual y espaciado en diseño de interfaces.",
    status:      "pending",
    date:        "28 Ago 2025",
    priority:    "Media",
  },
  {
    title:       "Enviar documentación",
    description: "Subir evidencias y capturas al sistema académico antes del cierre del módulo.",
    status:      "completed",
    date:        "20 Ago 2025",
    priority:    "Baja",
  },
];

/* ── Main component ───────────────────────── */
export default function TaskManager() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <div className="tm-demo">
        <section className="tm-section">
          {/* Header */}
          <div className="tm-header-row">
            <div>
              <div className="tm-eyebrow"><Sparkles size={11} /> Actividades</div>
              <h1 className="tm-title">Gestor de Tareas</h1>
              <p className="tm-subtitle">Controla y organiza tus actividades académicas.</p>
            </div>
            <button className="tm-new-btn" onClick={() => setOpenModal(true)}>
              <Plus size={15} />
              Nueva tarea
            </button>
          </div>

          {/* Summary */}
          <div className="tm-summary">
            {SUMMARY.map((s) => <SummaryCard key={s.title} {...s} />)}
          </div>

          {/* Tasks */}
          <div className="tm-list">
            {TASKS.map((t) => <TaskCard key={t.title} {...t} />)}
          </div>

          {/* Modal */}
          {openModal && <TaskModal onClose={() => setOpenModal(false)} />}
        </section>
      </div>
    </>
  );
}