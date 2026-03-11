import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  BookOpen,
  AlertCircle,
  Zap,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Notifications — Sección de notificaciones
   Sin props requeridos — datos mockeados internamente
   en la constante NOTIFICATIONS al final del archivo.
───────────────────────────────────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

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
    --accent-4:        #8B5CF6;
    --shadow-sm:       0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:       0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
    --radius-sm:       10px;
    --radius-lg:       18px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  /* ── Demo bg ── */
  .notif-demo { background: var(--bg); min-height: 100vh; padding: 12px 0; }

  /* ── Section shell ── */
  .notif-section {
    padding: 28px 28px 48px;
    max-width: 680px;
    margin: 0 auto;
  }

  /* ── Section header ── */
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
    margin-bottom: 12px;
  }
  .notif-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
  }
  .notif-heading-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.6px;
    margin: 0;
    line-height: 1.1;
  }
  /* Pill with unread count next to title */
  .notif-count-pill {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 20px;
    background: var(--accent);
    color: white;
    letter-spacing: 0.2px;
  }
  .section-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0 0 24px;
    line-height: 1.5;
  }

  /* ── Mark all read button ── */
  .notif-mark-btn {
    flex-shrink: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    background: none;
    border: 1px solid var(--border);
    padding: 7px 14px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.16s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: nowrap;
  }
  .notif-mark-btn:hover {
    background: var(--accent-light);
    border-color: var(--accent);
  }
  .notif-mark-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  /* ── Divider label ── */
  .notif-divider {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin: 20px 0 10px;
  }

  /* ── Notification list ── */
  .notif-list { display: flex; flex-direction: column; gap: 8px; }

  /* ── Notification card ── */
  .notif-card {
    display: flex;
    gap: 14px;
    padding: 15px 18px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    background: var(--surface);
    transition: all 0.18s ease;
    cursor: pointer;
    position: relative;
    outline: none;
  }
  .notif-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateX(3px);
    border-color: var(--border-strong);
  }
  .notif-card:focus-visible {
    box-shadow: 0 0 0 3px rgba(67,97,238,0.25);
    border-color: var(--accent);
  }
  /* Unread: accent left border + tinted bg */
  .notif-card.unread {
    border-left: 3px solid var(--accent);
    background: var(--accent-light);
    border-color: rgba(67,97,238,0.15);
  }
  .notif-card.unread:hover { border-left-color: var(--accent-hover); }

  /* ── Icon wrapper ── */
  .notif-icon-wrap {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }
  .notif-card.unread .notif-icon-wrap { background: white; }

  /* ── Body ── */
  .notif-body { flex: 1; min-width: 0; }
  .notif-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 3px;
  }
  .notif-card-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .notif-new-badge {
    flex-shrink: 0;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 2px 7px;
    border-radius: 20px;
    background: var(--accent);
    color: white;
  }
  .notif-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.45;
    margin: 0 0 5px;
  }
  .notif-time {
    font-size: 11px;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  /* ── Empty state ── */
  .notif-empty {
    text-align: center;
    padding: 48px 24px;
    color: var(--text-tertiary);
  }
  .notif-empty-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--accent-light);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 14px;
    color: var(--accent);
  }
  .notif-empty p { font-size: 14px; margin: 0; }
`;

/* ── Notification card ────────────────────── */
function NotificationCard({ icon, title, description, time, unread }) {
  return (
    <div
      className={`notif-card${unread ? " unread" : ""}`}
      role="listitem"
      tabIndex={0}
    >
      <div className="notif-icon-wrap" aria-hidden="true">{icon}</div>
      <div className="notif-body">
        <div className="notif-top">
          <span className="notif-card-title">{title}</span>
          {unread && <span className="notif-new-badge" aria-label="Sin leer">NUEVO</span>}
        </div>
        <p className="notif-desc">{description}</p>
        <span className="notif-time">{time}</span>
      </div>
    </div>
  );
}

/* ── DATA — reemplaza con fetch o props reales ── */
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: <CheckCircle2 size={20} color="var(--accent-2)" />,
    title: "Tarea completada",
    description: "Finalizaste exitosamente la tarea: Diseño del Dashboard.",
    time: "Hace 10 minutos",
    unread: true,
  },
  {
    id: 2,
    icon: <BookOpen size={20} color="var(--accent)" />,
    title: "Nuevo curso disponible",
    description: "Se agregó el curso: JavaScript Avanzado — inscríbete ahora.",
    time: "Hace 2 horas",
    unread: true,
  },
  {
    id: 3,
    icon: <AlertCircle size={20} color="var(--accent-3)" />,
    title: "Tarea próxima a vencer",
    description: "Tienes una entrega que vence mañana. Revisa tus tareas pendientes.",
    time: "Ayer",
    unread: false,
  },
  {
    id: 4,
    icon: <Zap size={20} color="var(--accent-4)" />,
    title: "Racha de constancia",
    description: "¡Llevas 5 días estudiando consecutivos! Sigue así.",
    time: "Hace 3 días",
    unread: false,
  },
];

/* ── Main component ───────────────────────── */
export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unread = notifications.filter((n) => n.unread);
  const read   = notifications.filter((n) => !n.unread);

  return (
    <>
      <style>{styles}</style>
      <div className="notif-demo">
        <section className="notif-section">
          {/* Header */}
          <div className="section-eyebrow">
            <Bell size={11} />
            Centro de actividad
          </div>

          <div className="notif-title-row">
            <div className="notif-heading-wrap">
              <h1 className="section-title">Notificaciones</h1>
              {unreadCount > 0 && (
                <span className="notif-count-pill" aria-label={`${unreadCount} sin leer`}>
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              className="notif-mark-btn"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              Marcar todo como leído
            </button>
          </div>

          <p className="section-subtitle">
            Revisa tu actividad reciente y avisos importantes.
          </p>

          {/* List */}
          {notifications.length === 0 ? (
            <div className="notif-empty">
              <div className="notif-empty-icon">
                <Sparkles size={24} />
              </div>
              <p>Todo al día — no hay notificaciones pendientes.</p>
            </div>
          ) : (
            <div role="list">
              {unread.length > 0 && (
                <>
                  <div className="notif-divider">Sin leer</div>
                  <div className="notif-list">
                    {unread.map((n) => (
                      <NotificationCard key={n.id} {...n} />
                    ))}
                  </div>
                </>
              )}

              {read.length > 0 && (
                <>
                  <div className="notif-divider" style={{ marginTop: unread.length > 0 ? 24 : 0 }}>
                    Anteriores
                  </div>
                  <div className="notif-list">
                    {read.map((n) => (
                      <NotificationCard key={n.id} {...n} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}