import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   TaskCalendar — Calendario mensual con panel de tareas
   Sin props — estado interno, datos mockeados en DATA.
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
    --shadow-accent:   0 6px 20px rgba(67,97,238,0.22);
    --radius-sm:       10px;
    --radius-md:       14px;
    --radius-lg:       18px;
    --radius-xl:       22px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  .calendar-demo { background: var(--bg); min-height: 100vh; padding: 12px 0; }

  /* ── Section shell ── */
  .tc-section {
    padding: 28px 28px 48px;
    max-width: 960px;
    margin: 0 auto;
  }

  /* ── Header row ── */
  .tc-header-row {
    display: flex; justify-content: space-between;
    align-items: flex-end; margin-bottom: 28px; gap: 16px;
  }
  .tc-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-light); padding: 4px 10px;
    border-radius: 20px; margin-bottom: 10px;
  }
  .tc-title {
    font-size: 28px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.6px; margin: 0 0 4px;
  }
  .tc-subtitle {
    font-size: 14px; color: var(--text-secondary); margin: 0;
  }

  /* Month navigator */
  .tc-nav {
    display: flex; align-items: center; gap: 4px;
    flex-shrink: 0;
  }
  .tc-nav-btn {
    width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    border-radius: var(--radius-sm); border: 1px solid var(--border);
    background: var(--surface); cursor: pointer;
    color: var(--text-secondary); transition: all 0.16s ease;
  }
  .tc-nav-btn:hover {
    background: var(--accent-light); border-color: var(--accent);
    color: var(--accent); transform: translateY(-1px);
  }
  .tc-month-label {
    font-size: 14px; font-weight: 700; color: var(--text-primary);
    padding: 0 10px; white-space: nowrap; letter-spacing: -0.2px;
  }

  /* ── Layout ── */
  .tc-layout {
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: 18px;
  }
  @media (max-width: 760px) {
    .tc-layout { grid-template-columns: 1fr; }
  }

  /* ── Calendar panel ── */
  .tc-cal-panel {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 22px;
    box-shadow: var(--shadow-sm);
  }

  /* Day-of-week header */
  .tc-dow-row {
    display: grid; grid-template-columns: repeat(7, 1fr);
    text-align: center; margin-bottom: 10px;
  }
  .tc-dow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
    text-transform: uppercase; color: var(--text-tertiary);
    padding: 4px 0;
  }

  /* Days grid */
  .tc-days-grid {
    display: grid; grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  /* ── Day cell ── */
  .tc-day {
    aspect-ratio: 1;
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-start;
    padding: 6px 4px 4px;
    cursor: pointer; transition: all 0.16s ease;
    position: relative; background: transparent;
    min-height: 52px;
  }
  .tc-day:hover:not(.tc-day--active):not(.tc-day--empty) {
    background: var(--bg);
    border-color: var(--border);
  }
  .tc-day--active {
    background: var(--accent);
    border-color: var(--accent);
    box-shadow: var(--shadow-accent);
  }
  .tc-day--has-task:not(.tc-day--active) {
    background: var(--accent-light);
    border-color: rgba(67,97,238,0.15);
  }
  .tc-day--today:not(.tc-day--active) .tc-day-num {
    color: var(--accent);
    font-weight: 800;
  }
  .tc-day--empty { cursor: default; pointer-events: none; }

  .tc-day-num {
    font-size: 12.5px; font-weight: 600;
    color: var(--text-primary); line-height: 1;
    transition: color 0.16s;
  }
  .tc-day--active .tc-day-num { color: white; }

  /* Task dot */
  .tc-day-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--accent); margin-top: auto;
  }
  .tc-day--active .tc-day-dot { background: rgba(255,255,255,0.7); }
  .tc-day--has-task:not(.tc-day--active) .tc-day-dot { background: var(--accent); }

  /* ── Tasks side panel ── */
  .tc-tasks-panel {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 22px;
    box-shadow: var(--shadow-sm);
    display: flex; flex-direction: column;
  }
  .tc-tasks-date {
    font-size: 12px; font-weight: 700; letter-spacing: 0.4px;
    text-transform: uppercase; color: var(--text-tertiary);
    margin-bottom: 4px;
  }
  .tc-tasks-title {
    font-size: 16px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.3px; margin: 0 0 18px;
  }
  .tc-tasks-list { display: flex; flex-direction: column; gap: 9px; flex: 1; }

  /* ── Task item ── */
  .tc-task {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 14px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--bg);
    transition: all 0.16s ease; cursor: pointer;
  }
  .tc-task:hover {
    background: var(--surface);
    box-shadow: var(--shadow-sm);
    transform: translateX(2px);
  }
  .tc-task--done { opacity: 0.6; }
  .tc-task--done .tc-task-title { text-decoration: line-through; }

  .tc-task-icon { flex-shrink: 0; margin-top: 1px; }
  .tc-task-body { flex: 1; min-width: 0; }
  .tc-task-title {
    font-size: 13px; font-weight: 600; color: var(--text-primary);
    line-height: 1.3; margin-bottom: 3px;
  }
  .tc-task-time {
    font-size: 11px; color: var(--text-tertiary);
    font-family: 'DM Mono', monospace;
  }

  /* Empty tasks */
  .tc-no-tasks {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; gap: 8px; padding: 24px 0;
    color: var(--text-tertiary); font-size: 13px;
  }
  .tc-no-tasks-icon {
    width: 44px; height: 44px; border-radius: 50%;
    background: var(--accent-light); display: flex;
    align-items: center; justify-content: center;
    color: var(--accent); margin-bottom: 4px;
  }
`;

const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];
const DOW = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

/* Days with tasks: day → list of tasks */
const TASKS_BY_DAY = {
  4:  [{ id: 1, title: "Entregar ejercicio React Hooks", time: "10:00 AM", done: false }],
  8:  [
    { id: 2, title: "Finalizar proyecto de UI/UX", time: "9:00 AM",  done: false },
    { id: 3, title: "Revisar documentación CSS",   time: "2:00 PM",  done: true  },
  ],
  16: [{ id: 4, title: "Quiz de JavaScript",        time: "11:30 AM", done: false }],
  22: [{ id: 5, title: "Sesión de repaso semanal",  time: "4:00 PM",  done: true  }],
};

/* ── Main component ───────────────────────── */
export default function TaskCalendar() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  /* first weekday of the month (0=Mon…6=Sun) */
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(1);
  };

  const tasksForDay = TASKS_BY_DAY[selectedDay] || [];
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <>
      <style>{styles}</style>
      <div className="calendar-demo">
        <section className="tc-section">
          {/* Header */}
          <div className="tc-header-row">
            <div>
              <div className="tc-eyebrow"><Sparkles size={11} /> Planificación</div>
              <h1 className="tc-title">Calendario de Tareas</h1>
              <p className="tc-subtitle">Visualiza y organiza tus actividades por fecha.</p>
            </div>

            <div className="tc-nav">
              <button className="tc-nav-btn" onClick={prevMonth} aria-label="Mes anterior">
                <ChevronLeft size={16} />
              </button>
              <span className="tc-month-label">{MONTHS[month]} {year}</span>
              <button className="tc-nav-btn" onClick={nextMonth} aria-label="Mes siguiente">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="tc-layout">
            {/* Calendar grid */}
            <div className="tc-cal-panel">
              {/* Day-of-week headers */}
              <div className="tc-dow-row">
                {DOW.map((d) => <span key={d} className="tc-dow">{d}</span>)}
              </div>

              {/* Cells */}
              <div className="tc-days-grid">
                {/* Empty leading cells */}
                {Array.from({ length: firstDow }).map((_, i) => (
                  <div key={`e-${i}`} className="tc-day tc-day--empty" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday  = isCurrentMonth && day === today.getDate();
                  const isActive = day === selectedDay;
                  const hasTask  = !!TASKS_BY_DAY[day];

                  let cls = "tc-day";
                  if (isActive) cls += " tc-day--active";
                  else if (hasTask) cls += " tc-day--has-task";
                  if (isToday) cls += " tc-day--today";

                  return (
                    <div
                      key={day}
                      className={cls}
                      onClick={() => setSelectedDay(day)}
                      role="button"
                      aria-label={`${day} de ${MONTHS[month]}`}
                      aria-pressed={isActive}
                    >
                      <span className="tc-day-num">{day}</span>
                      {hasTask && <span className="tc-day-dot" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tasks panel */}
            <div className="tc-tasks-panel">
              <div className="tc-tasks-date">
                {MONTHS[month]} {selectedDay}, {year}
              </div>
              <p className="tc-tasks-title">
                {tasksForDay.length > 0
                  ? `${tasksForDay.length} tarea${tasksForDay.length > 1 ? "s" : ""}`
                  : "Sin tareas"}
              </p>

              {tasksForDay.length === 0 ? (
                <div className="tc-no-tasks">
                  <div className="tc-no-tasks-icon">
                    <CheckCircle2 size={20} />
                  </div>
                  <span>¡Día libre! No hay tareas programadas.</span>
                </div>
              ) : (
                <div className="tc-tasks-list">
                  {tasksForDay.map((task) => (
                    <div
                      key={task.id}
                      className={`tc-task${task.done ? " tc-task--done" : ""}`}
                    >
                      <span className="tc-task-icon">
                        {task.done
                          ? <CheckCircle2 size={16} color="var(--accent-2)" />
                          : <Clock size={16} color="var(--accent)" />
                        }
                      </span>
                      <div className="tc-task-body">
                        <div className="tc-task-title">{task.title}</div>
                        <div className="tc-task-time">{task.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}