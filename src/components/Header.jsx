import React from "react";
import { Bell, User, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   DashboardHeader — Barra de navegación superior
   Props:
     setActiveSection  fn   — Callback para cambiar sección
                              recibe: "dashboard" | "notifications" | "profile"
     notifCount        number — Cantidad de notifs sin leer (default: 2)
     userName          string — Nombre del usuario (default: "Mi Perfil")
───────────────────────────────────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --surface:        #FFFFFF;
    --border:         #E8ECF4;
    --text-primary:   #0F172A;
    --text-secondary: #4B5675;
    --accent:         #4361EE;
    --accent-light:   #EEF1FD;
    --accent-hover:   #3451D1;
    --danger:         #EF4444;
    --shadow-sm:      0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-accent:  0 6px 20px rgba(67,97,238,0.25);
    --radius-sm:      10px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  /* ── Header shell ── */
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-bottom: 1px solid var(--border);
    padding: 0 28px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* ── Logo ── */
  .header-logo {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 18px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.4px;
    cursor: pointer;
    user-select: none;
    text-decoration: none;
    border: none;
    background: none;
    padding: 0;
    transition: opacity 0.16s ease;
  }
  .header-logo:hover { opacity: 0.8; }
  .header-logo-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    display: inline-block;
    flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(67,97,238,0.2);
  }

  /* ── Actions row ── */
  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Bell icon button ── */
  .header-icon-btn {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all 0.18s ease;
    color: var(--text-secondary);
  }
  .header-icon-btn:hover {
    background: var(--accent-light);
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  /* ── Notification badge (red dot) ── */
  .notif-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--danger);
    border: 2px solid white;
  }

  /* ── Profile button ── */
  .header-profile-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px 6px 8px;
    border-radius: var(--radius-sm);
    background: var(--accent);
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.18s ease;
    box-shadow: var(--shadow-accent);
    font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: nowrap;
  }
  .header-profile-btn:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(67,97,238,0.3);
  }

  /* ── Avatar circle inside profile btn ── */
  .avatar-xs {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ── Demo scaffolding ── */
  .header-demo-page {
    min-height: 100vh;
    background: #F4F6FB;
  }
  .header-demo-body {
    padding: 40px 28px;
    max-width: 640px;
    margin: 0 auto;
    font-size: 14px;
    color: #4B5675;
    line-height: 1.6;
  }
  .header-demo-body h2 {
    font-size: 18px;
    font-weight: 700;
    color: #0F172A;
    margin: 0 0 8px;
  }
  .header-demo-body p { margin: 0 0 6px; }
  .demo-section-label {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    background: var(--accent-light);
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 14px;
  }
`;

export default function DashboardHeader({
  setActiveSection,
  notifCount = 2,
  userName = "Mi Perfil",
}) {
  return (
    <header className="header">
      {/* Logo */}
      <button
        className="header-logo"
        onClick={() => setActiveSection?.("dashboard")}
        aria-label="Ir al dashboard"
      >
        <span className="header-logo-dot" aria-hidden="true" />
        StudyTrack
      </button>

      {/* Actions */}
      <div className="header-actions">
        {/* Bell */}
        <button
          className="header-icon-btn"
          onClick={() => setActiveSection?.("notifications")}
          title={`${notifCount} notificaciones sin leer`}
          aria-label="Ver notificaciones"
        >
          <Bell size={18} />
          {notifCount > 0 && (
            <span className="notif-badge" aria-hidden="true" />
          )}
        </button>

        {/* Profile */}
        <button
          className="header-profile-btn"
          onClick={() => setActiveSection?.("profile")}
          aria-label="Ver perfil"
        >
          <div className="avatar-xs" aria-hidden="true">
            <User size={14} />
          </div>
          {userName}
          <ChevronRight size={14} style={{ opacity: 0.65 }} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

/* ── Preview ─────────────────────────────── */
export function DashboardHeaderPreview() {
  const [active, setActive] = React.useState("dashboard");

  return (
    <>
      <style>{styles}</style>
      <div className="header-demo-page">
        <DashboardHeader setActiveSection={setActive} notifCount={2} userName="Mi Perfil" />
        <div className="header-demo-body">
          <span className="demo-section-label">Vista activa: {active}</span>
          <h2>DashboardHeader</h2>
          <p>Haz clic en el logo, el ícono de campana o el botón de perfil para ver cómo cambia la sección activa.</p>
          <p>El punto rojo en la campana se muestra cuando <strong>notifCount &gt; 0</strong>. Pásalo como prop para controlarlo.</p>
        </div>
      </div>
    </>
  );
}