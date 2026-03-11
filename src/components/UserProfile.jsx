import React from "react";
import {
  User,
  GraduationCap,
  Star,
  CheckCircle2,
  BookOpen,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   UserProfile — Perfil de usuario con stats y actividad
   Sin props — datos mockeados en DATA al final del archivo.
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
    --shadow-sm:       0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:       0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
    --shadow-accent:   0 6px 20px rgba(67,97,238,0.22);
    --radius-sm:       10px;
    --radius-md:       14px;
    --radius-lg:       18px;
    --radius-xl:       22px;
  }

  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

  .up-demo { background: var(--bg); min-height: 100vh; padding: 12px 0; }

  /* ── Section shell ── */
  .up-section {
    padding: 28px 28px 48px;
    max-width: 920px;
    margin: 0 auto;
  }

  /* ── Eyebrow ── */
  .up-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-light); padding: 4px 10px;
    border-radius: 20px; margin-bottom: 16px;
  }

  /* ── Hero card ── */
  .up-hero {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 28px 28px 24px;
    margin-bottom: 20px; box-shadow: var(--shadow-sm);
    position: relative; overflow: hidden;
  }
  /* Subtle gradient mesh in background */
  .up-hero::before {
    content: '';
    position: absolute; top: -40px; right: -40px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(67,97,238,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .up-hero-inner {
    display: flex; align-items: flex-start; gap: 22px;
    flex-wrap: wrap;
  }

  /* Avatar */
  .up-avatar {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent) 0%, #818CF8 100%);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 26px; font-weight: 800;
    flex-shrink: 0; box-shadow: var(--shadow-accent);
    letter-spacing: -1px;
  }

  .up-hero-info { flex: 1; min-width: 200px; }
  .up-name {
    font-size: 22px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.5px; margin: 0 0 4px;
  }
  .up-role { font-size: 13.5px; color: var(--text-secondary); margin: 0 0 16px; }

  /* Stats row */
  .up-stats {
    display: flex; gap: 10px; flex-wrap: wrap;
  }
  .up-stat {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 8px 14px; text-align: center;
    transition: all 0.16s ease;
  }
  .up-stat:hover { background: var(--accent-light); border-color: rgba(67,97,238,0.2); }
  .up-stat-val {
    font-size: 18px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.5px; line-height: 1;
    font-family: 'DM Mono', monospace;
  }
  .up-stat-label { font-size: 10.5px; font-weight: 600; color: var(--text-tertiary); margin-top: 2px; }

  /* ── Level badge (right aligned in hero) */
  .up-level-badge {
    flex-shrink: 0; display: flex; flex-direction: column;
    align-items: center; gap: 4px; align-self: flex-start;
  }
  .up-level-ring {
    width: 60px; height: 60px; border-radius: 50%;
    border: 3px solid var(--accent);
    background: var(--accent-light);
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; box-shadow: 0 0 0 6px rgba(67,97,238,0.08);
  }
  .up-level-num {
    font-size: 13px; font-weight: 800; color: var(--accent);
    font-family: 'DM Mono', monospace; line-height: 1;
  }
  .up-level-label { font-size: 8.5px; font-weight: 700; color: var(--accent); letter-spacing: 0.4px; }
  .up-level-text { font-size: 10px; font-weight: 600; color: var(--text-tertiary); }

  /* ── Grid layout ── */
  .up-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 18px;
  }
  @media (max-width: 720px) {
    .up-grid { grid-template-columns: 1fr; }
  }

  .up-col-left  { display: flex; flex-direction: column; gap: 16px; }
  .up-col-right { display: flex; flex-direction: column; gap: 16px; }

  /* ── Profile card ── */
  .up-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 22px;
    box-shadow: var(--shadow-sm);
  }
  .up-card-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
  }
  .up-card-icon {
    width: 36px; height: 36px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    background: var(--accent-light); color: var(--accent); flex-shrink: 0;
  }
  .up-card-title {
    font-size: 14px; font-weight: 700; color: var(--text-primary);
    letter-spacing: -0.2px; margin: 0;
  }

  /* ── Bio text ── */
  .up-bio { font-size: 13.5px; color: var(--text-secondary); line-height: 1.65; margin: 0; }

  /* ── Course item ── */
  .up-course { margin-bottom: 16px; }
  .up-course:last-child { margin-bottom: 0; }
  .up-course-meta {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 7px;
  }
  .up-course-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .up-course-pct {
    font-size: 11.5px; font-weight: 700; color: var(--accent);
    font-family: 'DM Mono', monospace;
  }
  .up-course-track { height: 6px; background: var(--border); border-radius: 99px; overflow: hidden; }
  .up-course-fill  { height: 100%; border-radius: 99px; transition: width 0.6s ease; }

  /* ── Activity item ── */
  .up-activity {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 10px 0; border-bottom: 1px solid var(--border);
  }
  .up-activity:last-child { border-bottom: none; padding-bottom: 0; }
  .up-activity-dot {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--accent-2-light); display: flex;
    align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
  }
  .up-activity-text { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
  .up-activity-time { font-size: 11px; color: var(--text-tertiary); margin-top: 2px; font-weight: 500; }

  /* ── Skills ── */
  .up-skills { display: flex; flex-wrap: wrap; gap: 7px; }
  .up-skill {
    font-size: 12px; font-weight: 600; padding: 5px 12px;
    border-radius: 20px; background: var(--accent-light);
    color: var(--accent); border: 1px solid rgba(67,97,238,0.15);
    transition: all 0.16s ease;
  }
  .up-skill:hover { background: var(--accent); color: white; transform: translateY(-1px); }
`;

/* ── Subcomponents ──────────────────────── */
function ProfileCard({ icon, title, children }) {
  return (
    <div className="up-card">
      <div className="up-card-header">
        <div className="up-card-icon">{icon}</div>
        <h3 className="up-card-title">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function CourseItem({ title, progress, color }) {
  return (
    <div className="up-course">
      <div className="up-course-meta">
        <span className="up-course-name">{title}</span>
        <span className="up-course-pct">{progress}%</span>
      </div>
      <div className="up-course-track">
        <div
          className="up-course-fill"
          style={{ width: `${progress}%`, background: color }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ text, time }) {
  return (
    <div className="up-activity">
      <div className="up-activity-dot">
        <CheckCircle2 size={13} color="var(--accent-2)" />
      </div>
      <div>
        <div className="up-activity-text">{text}</div>
        <div className="up-activity-time">{time}</div>
      </div>
    </div>
  );
}

/* ── DATA ───────────────────────────────── */
const STATS = [
  { label: "Cursos",   val: "8"   },
  { label: "Tareas",   val: "42"  },
  { label: "Progreso", val: "68%" },
];

const COURSES = [
  { title: "React Básico",        progress: 80, color: "linear-gradient(90deg,#4361EE,#818CF8)" },
  { title: "Diseño UI/UX",        progress: 65, color: "linear-gradient(90deg,#06C896,#34D399)" },
  { title: "JavaScript Avanzado", progress: 40, color: "linear-gradient(90deg,#F59E0B,#FCD34D)" },
];

const ACTIVITY = [
  { text: "Completó el módulo de Hooks en React",   time: "Hace 2 días"  },
  { text: "Finalizó la tarea: Diseño del Dashboard", time: "Hace 4 días"  },
  { text: "Inició el curso de UI/UX",               time: "Hace 1 semana" },
];

const SKILLS = ["React", "JavaScript", "TypeScript", "UI/UX", "Tailwind CSS", "Git"];

/* ── Main component ───────────────────────── */
export default function UserProfile() {
  return (
    <>
      <style>{styles}</style>
      <div className="up-demo">
        <section className="up-section">
          <div className="up-eyebrow"><Sparkles size={11} /> Perfil</div>

          {/* Hero */}
          <div className="up-hero">
            <div className="up-hero-inner">
              <div className="up-avatar">R</div>

              <div className="up-hero-info">
                <h1 className="up-name">Rodriguez</h1>
                <p className="up-role">Estudiante de Ingeniería de Software · Desarrollador Web</p>
                <div className="up-stats">
                  {STATS.map((s) => (
                    <div key={s.label} className="up-stat">
                      <div className="up-stat-val">{s.val}</div>
                      <div className="up-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="up-level-badge">
                <div className="up-level-ring">
                  <span className="up-level-num">Nv</span>
                  <span className="up-level-label">INT</span>
                </div>
                <span className="up-level-text">Intermedio</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="up-grid">
            <div className="up-col-left">
              <ProfileCard icon={<User size={16} />} title="Sobre mí">
                <p className="up-bio">
                  Desarrollador web en formación con enfoque en React, diseño de
                  interfaces y construcción de aplicaciones modernas orientadas a
                  productos digitales. Apasionado por la experiencia de usuario y
                  el código limpio.
                </p>
              </ProfileCard>

              <ProfileCard icon={<BookOpen size={16} />} title="Cursos Destacados">
                {COURSES.map((c) => <CourseItem key={c.title} {...c} />)}
              </ProfileCard>

              <ProfileCard icon={<TrendingUp size={16} />} title="Actividad Reciente">
                {ACTIVITY.map((a) => <ActivityItem key={a.text} {...a} />)}
              </ProfileCard>
            </div>

            <div className="up-col-right">
              <ProfileCard icon={<Star size={16} />} title="Habilidades">
                <div className="up-skills">
                  {SKILLS.map((s) => (
                    <span key={s} className="up-skill">{s}</span>
                  ))}
                </div>
              </ProfileCard>

              <ProfileCard icon={<GraduationCap size={16} />} title="Nivel Académico">
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>
                  Intermedio
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                  Basado en cursos completados, tareas entregadas y constancia semanal.
                </p>
              </ProfileCard>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}