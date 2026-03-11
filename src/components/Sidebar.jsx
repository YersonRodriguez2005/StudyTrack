import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart2,
  Settings,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Sidebar — Navegación lateral fija
   Props:
     activeSection   string  — Sección activa actual
     onSectionChange fn      — Callback (section: string) => void
───────────────────────────────────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --sidebar-bg:       #FFFFFF;
    --sidebar-border:   #E8ECF4;
    --sidebar-w:        240px;
    --text-primary:     #0F172A;
    --text-secondary:   #4B5675;
    --text-tertiary:    #8B96B0;
    --accent:           #4361EE;
    --accent-light:     #EEF1FD;
    --accent-hover:     #3451D1;
    --item-hover-bg:    #F4F6FB;
    --shadow-sm:        0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --radius-sm:        10px;
    --radius-md:        14px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  /* ── Sidebar shell ── */
  .sidebar {
    position: fixed;
    top: 0; left: 0;
    width: var(--sidebar-w);
    height: 100vh;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
    display: flex;
    flex-direction: column;
    padding: 0;
    z-index: 200;
    overflow: hidden;
  }

  /* ── Logo area ── */
  .sidebar-logo-area {
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--sidebar-border);
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 64px; /* matches header height */
  }
  .sidebar-logo-img {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
  }
  /* Fallback if no image */
  .sidebar-logo-mark {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #4361EE 0%, #818CF8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(67,97,238,0.3);
  }
  .sidebar-logo-mark-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: white;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
  }
  .sidebar-brand {
    font-size: 15px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.4px;
    line-height: 1;
  }
  .sidebar-brand-sub {
    font-size: 10px;
    font-weight: 500;
    color: var(--text-tertiary);
    letter-spacing: 0.2px;
    margin-top: 2px;
  }

  /* ── Nav ── */
  .sidebar-nav {
    flex: 1;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    overflow-y: auto;
  }
  .sidebar-nav::-webkit-scrollbar { width: 0; }

  /* ── Group label ── */
  .sidebar-group-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--text-tertiary);
    padding: 14px 12px 6px;
  }

  /* ── Nav item ── */
  .sidebar-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.16s ease;
    text-align: left;
    position: relative;
    color: var(--text-secondary);
    font-size: 13.5px;
    font-weight: 500;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .sidebar-item:hover {
    background: var(--item-hover-bg);
    color: var(--text-primary);
  }
  .sidebar-item:hover .sidebar-item-icon {
    color: var(--accent);
  }
  .sidebar-item.active {
    background: var(--accent-light);
    color: var(--accent);
    font-weight: 700;
  }
  .sidebar-item.active .sidebar-item-icon {
    color: var(--accent);
  }
  /* Active left bar */
  .sidebar-item.active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: var(--accent);
  }

  /* ── Icon wrapper ── */
  .sidebar-item-icon {
    width: 18px; height: 18px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: var(--text-tertiary);
    transition: color 0.16s ease;
  }

  /* ── Divider ── */
  .sidebar-divider {
    height: 1px;
    background: var(--sidebar-border);
    margin: 8px 12px;
  }

  /* ── Footer ── */
  .sidebar-footer {
    padding: 12px 12px 16px;
    border-top: 1px solid var(--sidebar-border);
  }

  /* ── Demo wrap ── */
  .sidebar-demo {
    display: flex;
    min-height: 100vh;
    background: #F4F6FB;
  }
  .sidebar-demo-content {
    flex: 1;
    margin-left: var(--sidebar-w);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    font-size: 14px;
    color: var(--text-secondary);
    flex-direction: column;
    gap: 8px;
  }
  .sidebar-demo-content h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
  }
`;

/* ── Nav items definition ───────────────── */
const NAV_MAIN = [
  { icon: LayoutDashboard, label: "Dashboard",    section: "overview"  },
  { icon: BookOpen,        label: "Cursos",        section: "courses"   },
  { icon: CheckSquare,     label: "Tareas",        section: "tasks"     },
  { icon: Calendar,        label: "Calendario",    section: "calendar"  },
  { icon: BarChart2,       label: "Progreso",      section: "progress"  },
];

const NAV_FOOTER = [
  { icon: Settings, label: "Configuración", section: "settings" },
];

/* ── Reusable item ──────────────────────── */
// eslint-disable-next-line no-unused-vars
function SidebarItem({ icon: Icon, label, section, active, onClick }) {
  return (
    <button
      className={`sidebar-item${active ? " active" : ""}`}
      onClick={() => onClick(section)}
      aria-current={active ? "page" : undefined}
    >
      <span className="sidebar-item-icon">
        <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
      </span>
      {label}
    </button>
  );
}

/* ── Main component ───────────────────────── */
export default function Sidebar({ activeSection, onSectionChange }) {
  return (
    <aside className="sidebar" role="navigation" aria-label="Menú principal">
      {/* Logo / Brand */}
      <div className="sidebar-logo-area">
        <div className="sidebar-logo-mark">
          <span className="sidebar-logo-mark-dot" />
        </div>
        <div>
          <div className="sidebar-brand">StudyTrack</div>
          <div className="sidebar-brand-sub">Panel de aprendizaje</div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sidebar-nav">
        <span className="sidebar-group-label">Principal</span>

        {NAV_MAIN.map((item) => (
          <SidebarItem
            key={item.section}
            {...item}
            active={activeSection === item.section}
            onClick={onSectionChange}
          />
        ))}
      </nav>

      {/* Footer nav */}
      <div className="sidebar-footer">
        {NAV_FOOTER.map((item) => (
          <SidebarItem
            key={item.section}
            {...item}
            active={activeSection === item.section}
            onClick={onSectionChange}
          />
        ))}
      </div>
    </aside>
  );
}

/* ── Preview ─────────────────────────────── */
export function SidebarPreview() {
  const [active, setActive] = React.useState("overview");

  return (
    <>
      <style>{styles}</style>
      <div className="sidebar-demo">
        <Sidebar activeSection={active} onSectionChange={setActive} />
        <div className="sidebar-demo-content">
          <h3>Sección activa: <span style={{ color: "var(--accent)" }}>{active}</span></h3>
          <p>Haz clic en los ítems del sidebar para navegar.</p>
        </div>
      </div>
    </>
  );
}