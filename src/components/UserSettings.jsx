import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   UserSettings — Configuración de cuenta y preferencias
   Sin props — estado interno para toggles y visibilidad
   de contraseña.
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

  .us-demo { background: var(--bg); min-height: 100vh; padding: 12px 0; }

  /* ── Section shell ── */
  .us-section {
    padding: 28px 28px 48px;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .us-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-light); padding: 4px 10px;
    border-radius: 20px; margin-bottom: 10px;
  }
  .us-title {
    font-size: 28px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.6px; margin: 0 0 6px;
  }
  .us-subtitle { font-size: 14px; color: var(--text-secondary); margin: 0 0 28px; }

  /* ── Layout ── */
  .us-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 20px;
  }
  @media (max-width: 680px) {
    .us-layout { grid-template-columns: 1fr; }
  }

  /* ── Profile sidebar card ── */
  .us-profile-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 24px 20px;
    box-shadow: var(--shadow-sm); display: flex;
    flex-direction: column; align-items: center;
    text-align: center; gap: 14px; height: fit-content;
    position: sticky; top: 80px;
  }
  .us-avatar-wrap { position: relative; }
  .us-avatar {
    width: 76px; height: 76px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent) 0%, #818CF8 100%);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 28px; font-weight: 800;
    box-shadow: var(--shadow-accent); letter-spacing: -1px;
  }
  .us-avatar-ring {
    position: absolute; inset: -4px; border-radius: 50%;
    border: 2px solid rgba(67,97,238,0.2); pointer-events: none;
  }
  .us-profile-name {
    font-size: 15px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.3px; margin: 0;
  }
  .us-profile-role { font-size: 12px; color: var(--text-tertiary); margin: 0; }
  .us-change-photo-btn {
    font-size: 12.5px; font-weight: 600; color: var(--accent);
    background: var(--accent-light); border: 1px solid rgba(67,97,238,0.15);
    padding: 7px 16px; border-radius: var(--radius-sm); cursor: pointer;
    transition: all 0.16s ease; font-family: 'Plus Jakarta Sans', sans-serif;
    width: 100%;
  }
  .us-change-photo-btn:hover { background: var(--accent); color: white; }

  /* ── Settings column ── */
  .us-settings-col { display: flex; flex-direction: column; gap: 16px; }

  /* ── Settings card ── */
  .us-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 22px;
    box-shadow: var(--shadow-sm);
  }
  .us-card-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
    padding-bottom: 16px; border-bottom: 1px solid var(--border);
  }
  .us-card-icon {
    width: 36px; height: 36px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    background: var(--accent-light); color: var(--accent); flex-shrink: 0;
  }
  .us-card-title {
    font-size: 14px; font-weight: 700; color: var(--text-primary);
    letter-spacing: -0.2px; margin: 0;
  }

  /* ── Form grid ── */
  .us-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .us-form-grid.full { grid-template-columns: 1fr; }
  @media (max-width: 500px) { .us-form-grid { grid-template-columns: 1fr; } }

  /* ── Field ── */
  .us-field { display: flex; flex-direction: column; gap: 5px; }
  .us-field.span-2 { grid-column: span 2; }
  .us-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
    text-transform: uppercase; color: var(--text-tertiary);
  }
  .us-input-wrap { position: relative; }
  .us-input-icon {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    color: var(--text-tertiary); pointer-events: none;
    display: flex; align-items: center;
  }
  .us-input-action {
    position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
    color: var(--text-tertiary); cursor: pointer; background: none; border: none;
    display: flex; align-items: center; padding: 0; transition: color 0.14s;
  }
  .us-input-action:hover { color: var(--accent); }

  .us-input {
    width: 100%; border: 1px solid var(--border);
    border-radius: var(--radius-sm); background: var(--bg);
    font-size: 13.5px; color: var(--text-primary);
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 9px 13px; outline: none; transition: all 0.16s ease;
  }
  .us-input.has-icon       { padding-left: 34px; }
  .us-input.has-right-icon { padding-right: 34px; }
  .us-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(67,97,238,0.10);
    background: var(--surface);
  }
  .us-input::placeholder { color: var(--text-tertiary); }

  /* ── Toggle row ── */
  .us-toggle-list { display: flex; flex-direction: column; gap: 0; }
  .us-toggle-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 0; border-bottom: 1px solid var(--border);
  }
  .us-toggle-row:last-child { border-bottom: none; padding-bottom: 0; }
  .us-toggle-info { flex: 1; }
  .us-toggle-label { font-size: 13.5px; font-weight: 600; color: var(--text-primary); }
  .us-toggle-sub   { font-size: 11.5px; color: var(--text-tertiary); margin-top: 1px; }

  /* Toggle switch */
  .us-toggle {
    position: relative; width: 42px; height: 24px;
    border-radius: 12px; cursor: pointer; flex-shrink: 0;
    transition: background 0.22s ease;
    background: var(--border-strong);
    border: none; outline: none;
  }
  .us-toggle.on { background: var(--accent); }
  .us-toggle-thumb {
    position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px; border-radius: 50%;
    background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1);
  }
  .us-toggle.on .us-toggle-thumb { transform: translateX(18px); }

  /* ── Action buttons ── */
  .us-actions {
    display: flex; justify-content: flex-end; gap: 10px;
    padding-top: 4px;
  }
  .us-btn-cancel {
    padding: 10px 20px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: var(--surface);
    font-size: 13.5px; font-weight: 600; color: var(--text-secondary);
    cursor: pointer; transition: all 0.16s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .us-btn-cancel:hover { border-color: var(--border-strong); background: var(--bg); }
  .us-btn-save {
    display: flex; align-items: center; gap: 6px;
    padding: 10px 22px; border-radius: var(--radius-sm);
    background: var(--accent); color: white; border: none;
    font-size: 13.5px; font-weight: 700; cursor: pointer;
    box-shadow: var(--shadow-accent); transition: all 0.18s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .us-btn-save:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .us-btn-save.saved {
    background: var(--accent-2);
    box-shadow: 0 6px 20px rgba(6,200,150,0.25);
  }
`;

/* ── Toggle component ───────────────────── */
function Toggle({ label, sub, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="us-toggle-row">
      <div className="us-toggle-info">
        <div className="us-toggle-label">{label}</div>
        {sub && <div className="us-toggle-sub">{sub}</div>}
      </div>
      <button
        className={`us-toggle${on ? " on" : ""}`}
        onClick={() => setOn((v) => !v)}
        aria-checked={on}
        role="switch"
        aria-label={label}
      >
        <div className="us-toggle-thumb" />
      </button>
    </div>
  );
}

/* ── Password input ─────────────────────── */
function PasswordInput({ label, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="us-field">
      <label className="us-label">{label}</label>
      <div className="us-input-wrap">
        <span className="us-input-icon"><Lock size={14} /></span>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="us-input has-icon has-right-icon"
        />
        <button
          type="button"
          className="us-input-action"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

/* ── Settings card ──────────────────────── */
function SettingsCard({ icon, title, children }) {
  return (
    <div className="us-card">
      <div className="us-card-header">
        <div className="us-card-icon">{icon}</div>
        <h3 className="us-card-title">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ── Main component ───────────────────────── */
export default function UserSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="us-demo">
        <section className="us-section">
          {/* Header */}
          <div className="us-eyebrow"><Sparkles size={11} /> Cuenta</div>
          <h1 className="us-title">Configuración</h1>
          <p className="us-subtitle">Administra tu perfil y preferencias de la plataforma.</p>

          <div className="us-layout">
            {/* Profile sidebar */}
            <div className="us-profile-card">
              <div className="us-avatar-wrap">
                <div className="us-avatar">R</div>
                <div className="us-avatar-ring" />
              </div>
              <div>
                <p className="us-profile-name">Rodriguez</p>
                <p className="us-profile-role">Estudiante · Dev Web</p>
              </div>
              <button className="us-change-photo-btn">Cambiar foto</button>
            </div>

            {/* Settings column */}
            <div className="us-settings-col">

              {/* Personal info */}
              <SettingsCard icon={<User size={16} />} title="Información Personal">
                <div className="us-form-grid">
                  <div className="us-field">
                    <label className="us-label">Nombre completo</label>
                    <input className="us-input" placeholder="Rodriguez" defaultValue="Rodriguez" />
                  </div>
                  <div className="us-field">
                    <label className="us-label">Correo electrónico</label>
                    <div className="us-input-wrap">
                      <span className="us-input-icon"><Mail size={14} /></span>
                      <input className="us-input has-icon" placeholder="correo@ejemplo.com" defaultValue="rodriguez@email.com" />
                    </div>
                  </div>
                </div>
              </SettingsCard>

              {/* Preferences */}
              <SettingsCard icon={<Palette size={16} />} title="Preferencias">
                <div className="us-toggle-list">
                  <Toggle label="Modo oscuro"                    sub="Cambia el tema de la interfaz"         defaultOn={false} />
                  <Toggle label="Mostrar progreso avanzado"      sub="Estadísticas detalladas en el dashboard" defaultOn={true}  />
                  <Toggle label="Animaciones reducidas"          sub="Para mejor rendimiento o accesibilidad" defaultOn={false} />
                </div>
              </SettingsCard>

              {/* Notifications */}
              <SettingsCard icon={<Bell size={16} />} title="Notificaciones">
                <div className="us-toggle-list">
                  <Toggle label="Notificaciones por correo"      sub="Recibe actualizaciones en tu bandeja"   defaultOn={true}  />
                  <Toggle label="Recordatorios de tareas"        sub="Alertas antes de que venzan"           defaultOn={true}  />
                  <Toggle label="Novedades de la plataforma"     sub="Nuevos cursos y funcionalidades"       defaultOn={false} />
                </div>
              </SettingsCard>

              {/* Security */}
              <SettingsCard icon={<ShieldCheck size={16} />} title="Seguridad">
                <div className="us-form-grid">
                  <PasswordInput label="Contraseña actual"  placeholder="••••••••" />
                  <PasswordInput label="Nueva contraseña"   placeholder="••••••••" />
                </div>
              </SettingsCard>

              {/* Actions */}
              <div className="us-actions">
                <button className="us-btn-cancel">Cancelar</button>
                <button
                  className={`us-btn-save${saved ? " saved" : ""}`}
                  onClick={handleSave}
                >
                  {saved ? <><Check size={14} /> Guardado</> : "Guardar cambios"}
                </button>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}