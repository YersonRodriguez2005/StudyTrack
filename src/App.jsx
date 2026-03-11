import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/Header";
import DashboardOverview from "./components/DashboardOverview";
import CourseCard from "./components/CourseCard";
import TaskManager from "./components/TaskManager";
import TaskCalendar from "./components/TaskCalendar";
import ProgressOverview from "./components/ProgressOverview";
import UserSettings from "./components/UserSettings";
import UserProfile from "./components/UserProfile";
import Notifications from "./components/Notifications";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLESHEET — inyectado una sola vez en App.
   Todos los componentes hijos consumen estas clases CSS.
   Los wrappers de demo (.tm-demo, .up-demo, etc.) se
   anulan aquí para que no interfieran con el layout real.
═══════════════════════════════════════════════════════════ */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  /* ── Design tokens ── */
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
    --sidebar-w:       240px;
    --header-h:        64px;
  }

  *, *::before, *::after {
    font-family: 'Plus Jakarta Sans', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root { height: 100%; background: var(--bg); }

  /* ── Neutralize demo wrappers ── */
  .tm-demo, .up-demo, .us-demo, .notif-demo,
  .progress-demo, .calendar-demo, .overview-demo,
  .coursecard-demo, .sidebar-demo {
    background: transparent !important;
    min-height: unset !important;
    padding: 0 !important;
  }

  /* ════════════════════════
     APP LAYOUT
  ════════════════════════ */
  .app-layout {
    display: flex;
    min-height: 100vh;
    background: var(--bg);
  }
  .app-main {
    flex: 1;
    margin-left: var(--sidebar-w);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
  }
  .app-content { flex: 1; }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .page-enter { animation: fadeSlideIn 0.2s ease both; }

  /* ════════════════════════
     SIDEBAR
  ════════════════════════ */
  .sidebar {
    position: fixed; top: 0; left: 0;
    width: var(--sidebar-w); height: 100vh;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    z-index: 200; overflow: hidden;
  }
  .sidebar-logo-area {
    padding: 0 20px; height: var(--header-h);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .sidebar-logo-mark {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    background: linear-gradient(135deg, #4361EE 0%, #818CF8 100%);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(67,97,238,0.3);
  }
  .sidebar-logo-mark-dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: white; box-shadow: 0 0 0 2px rgba(255,255,255,0.3);
  }
  .sidebar-brand     { font-size: 15px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.4px; line-height: 1; }
  .sidebar-brand-sub { font-size: 10px; font-weight: 500; color: var(--text-tertiary); letter-spacing: 0.2px; margin-top: 2px; }
  .sidebar-nav {
    flex: 1; padding: 14px 12px;
    display: flex; flex-direction: column; gap: 2px;
    overflow-y: auto;
  }
  .sidebar-nav::-webkit-scrollbar { width: 0; }
  .sidebar-group-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--text-tertiary); padding: 12px 12px 6px;
  }
  .sidebar-item {
    width: 100%; display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: var(--radius-sm);
    border: none; background: transparent; cursor: pointer;
    text-align: left; color: var(--text-secondary);
    font-size: 13.5px; font-weight: 500;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.15s ease; position: relative;
  }
  .sidebar-item:hover { background: var(--bg); color: var(--text-primary); }
  .sidebar-item:hover .sidebar-item-icon { color: var(--accent); }
  .sidebar-item.active { background: var(--accent-light); color: var(--accent); font-weight: 700; }
  .sidebar-item.active::before {
    content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
    width: 3px; border-radius: 0 3px 3px 0; background: var(--accent);
  }
  .sidebar-item.active .sidebar-item-icon { color: var(--accent); }
  .sidebar-item-icon {
    width: 17px; height: 17px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; color: var(--text-tertiary);
    transition: color 0.15s ease;
  }
  .sidebar-footer { padding: 10px 12px 16px; border-top: 1px solid var(--border); flex-shrink: 0; }

  /* ════════════════════════
     HEADER
  ════════════════════════ */
  .header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-bottom: 1px solid var(--border);
    padding: 0 28px; height: var(--header-h);
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .header-logo {
    display: flex; align-items: center; gap: 9px;
    font-size: 18px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.4px; cursor: pointer;
    border: none; background: none; padding: 0;
    transition: opacity 0.15s;
  }
  .header-logo:hover { opacity: 0.75; }
  .header-logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); display: inline-block;
    box-shadow: 0 0 0 3px rgba(67,97,238,0.2);
  }
  .header-actions { display: flex; align-items: center; gap: 8px; }
  .header-icon-btn {
    position: relative; width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    border-radius: var(--radius-sm); border: 1px solid var(--border);
    background: var(--surface); cursor: pointer;
    color: var(--text-secondary); transition: all 0.15s ease;
  }
  .header-icon-btn:hover {
    background: var(--accent-light); border-color: var(--accent);
    color: var(--accent); transform: translateY(-1px);
  }
  .notif-badge {
    position: absolute; top: 7px; right: 7px;
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--danger); border: 2px solid white;
  }
  .header-profile-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 14px 6px 8px; border-radius: var(--radius-sm);
    background: var(--accent); color: white;
    font-size: 14px; font-weight: 600; cursor: pointer;
    border: none; transition: all 0.15s ease;
    box-shadow: var(--shadow-accent);
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .header-profile-btn:hover {
    background: var(--accent-hover); transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(67,97,238,0.3);
  }
  .avatar-xs {
    width: 26px; height: 26px; border-radius: 50%;
    background: rgba(255,255,255,0.22);
    display: flex; align-items: center; justify-content: center;
  }

  /* ════════════════════════
     SHARED PRIMITIVES
  ════════════════════════ */
  .section { padding: 28px 28px 48px; max-width: 960px; margin: 0 auto; }
  .section-eyebrow, .po-eyebrow, .tc-eyebrow, .tm-eyebrow, .up-eyebrow, .us-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-light); padding: 4px 10px;
    border-radius: 20px; margin-bottom: 10px;
  }
  .section-title, .po-title, .tc-title, .tm-title {
    font-size: 28px; font-weight: 800; color: var(--text-primary);
    letter-spacing: -0.6px; margin: 0 0 6px;
  }
  .section-subtitle, .po-subtitle, .tc-subtitle, .tm-subtitle {
    font-size: 14px; color: var(--text-secondary); margin: 0; line-height: 1.5;
  }

  /* ════════════════════════
     DASHBOARD OVERVIEW
  ════════════════════════ */
  .stat-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px; margin-bottom: 20px;
  }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 22px 22px 20px;
    display: flex; flex-direction: column; gap: 14px;
    box-shadow: var(--shadow-sm); transition: all 0.22s ease;
    position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    background: var(--card-accent, var(--accent)); opacity: 0; transition: opacity 0.22s;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--border-strong); }
  .stat-card:hover::before { opacity: 1; }
  .stat-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .stat-icon-wrap { width: 44px; height: 44px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--icon-bg, var(--accent-light)); }
  .stat-trend { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 20px; background: var(--accent-2-light); color: var(--accent-2); display: flex; align-items: center; gap: 3px; }
  .stat-value { font-size: 32px; font-weight: 800; color: var(--text-primary); letter-spacing: -1px; line-height: 1; }
  .stat-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); }
  .stat-sub   { font-size: 11.5px; color: var(--text-tertiary); margin-top: 2px; }
  .progress-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm); }
  .progress-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 12px; }
  .progress-card-title  { font-size: 17px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.3px; margin: 0 0 4px; }
  .progress-card-sub    { font-size: 13px; color: var(--text-secondary); margin: 0; }
  .progress-pct-badge { font-size: 22px; font-weight: 800; color: var(--accent); background: var(--accent-light); padding: 8px 16px; border-radius: var(--radius-sm); white-space: nowrap; letter-spacing: -0.5px; font-family: 'DM Mono', monospace; }
  .progress-track { background: var(--border); border-radius: 99px; height: 10px; overflow: visible; position: relative; }
  .progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--accent) 0%, #818CF8 100%); transition: width 0.8s cubic-bezier(.4,0,.2,1); position: relative; }
  .progress-fill::after { content: ''; position: absolute; right: -1px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; border-radius: 50%; background: white; border: 3px solid var(--accent); box-shadow: 0 2px 6px rgba(67,97,238,0.4); }
  .progress-meta { display: flex; justify-content: space-between; margin-top: 14px; }
  .progress-meta-item { font-size: 12px; color: var(--text-tertiary); font-weight: 500; }
  .progress-meta-item strong { color: var(--text-secondary); }

  /* ════════════════════════
     COURSE CARD
  ════════════════════════ */
  .courses-section  { padding: 28px 28px 40px; max-width: 960px; margin: 0 auto; }
  .courses-eyebrow  { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; color: var(--accent); background: var(--accent-light); padding: 4px 10px; border-radius: 20px; margin-bottom: 10px; }
  .courses-title    { font-size: 28px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.6px; margin-bottom: 6px; }
  .courses-subtitle { font-size: 14px; color: var(--text-secondary); margin-bottom: 28px; line-height: 1.5; }
  .courses-grid     { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
  .course-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 24px;
    width: 100%; box-shadow: var(--shadow-sm); transition: all 0.22s ease;
    display: flex; flex-direction: column; position: relative; overflow: hidden;
  }
  .course-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(67,97,238,0.03) 0%, transparent 60%); pointer-events: none; border-radius: var(--radius-xl); opacity: 0; transition: opacity 0.22s; }
  .course-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: rgba(67,97,238,0.2); }
  .course-card:hover::after { opacity: 1; }
  .course-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; }
  .course-icon { width: 50px; height: 50px; border-radius: var(--radius-md); background: linear-gradient(135deg, var(--accent) 0%, #818CF8 100%); display: flex; align-items: center; justify-content: center; color: white; box-shadow: var(--shadow-accent); flex-shrink: 0; }
  .course-tag  { font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px; padding: 4px 9px; border-radius: 20px; background: var(--accent-2-light); color: var(--accent-2); }
  .course-title { font-size: 17px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.3px; margin: 0 0 6px; }
  .course-desc  { font-size: 13px; color: var(--text-secondary); line-height: 1.55; margin: 0 0 20px; }
  .course-progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
  .course-progress-label  { font-size: 11px; font-weight: 700; letter-spacing: 0.6px; color: var(--text-tertiary); text-transform: uppercase; }
  .course-progress-pct    { font-size: 12px; font-weight: 700; color: var(--accent); font-family: 'DM Mono', monospace; }
  .course-track { height: 6px; background: var(--border); border-radius: 99px; overflow: hidden; margin-bottom: 20px; }
  .course-fill  { height: 100%; border-radius: 99px; transition: width 0.6s cubic-bezier(.4,0,.2,1); }
  .course-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px; background: var(--accent); color: white; padding: 11px 16px; border-radius: var(--radius-md); border: none; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.18s ease; box-shadow: var(--shadow-accent); font-family: 'Plus Jakarta Sans', sans-serif; }
  .course-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .course-btn:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.18s ease; }

  /* ════════════════════════
     NOTIFICATIONS
  ════════════════════════ */
  .notif-section { padding: 28px 28px 48px; max-width: 680px; margin: 0 auto; }
  .notif-title-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 6px; }
  .notif-heading-wrap { display: flex; align-items: center; gap: 10px; }
  .notif-count-pill { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; background: var(--accent); color: white; }
  .notif-mark-btn { flex-shrink: 0; font-size: 13px; font-weight: 600; color: var(--accent); background: none; border: 1px solid var(--border); padding: 7px 14px; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.16s ease; font-family: 'Plus Jakarta Sans', sans-serif; }
  .notif-mark-btn:hover { background: var(--accent-light); border-color: var(--accent); }
  .notif-mark-btn:disabled { opacity: 0.4; cursor: default; }
  .notif-divider { font-size: 11px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: var(--text-tertiary); margin: 20px 0 10px; }
  .notif-list { display: flex; flex-direction: column; gap: 8px; }
  .notif-card { display: flex; gap: 14px; padding: 15px 18px; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--surface); transition: all 0.18s ease; cursor: pointer; }
  .notif-card:hover { box-shadow: var(--shadow-md); transform: translateX(3px); border-color: var(--border-strong); }
  .notif-card.unread { border-left: 3px solid var(--accent); background: var(--accent-light); border-color: rgba(67,97,238,0.15); }
  .notif-icon-wrap { flex-shrink: 0; width: 42px; height: 42px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
  .notif-card.unread .notif-icon-wrap { background: white; }
  .notif-body { flex: 1; min-width: 0; }
  .notif-top  { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 3px; }
  .notif-card-title { font-size: 14px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .notif-new-badge  { flex-shrink: 0; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; padding: 2px 7px; border-radius: 20px; background: var(--accent); color: white; }
  .notif-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.45; margin: 0 0 5px; }
  .notif-time { font-size: 11px; color: var(--text-tertiary); font-weight: 500; }
  .notif-empty { text-align: center; padding: 48px 24px; color: var(--text-tertiary); }
  .notif-empty-icon { width: 56px; height: 56px; border-radius: 50%; background: var(--accent-light); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: var(--accent); }

  /* ════════════════════════
     PROGRESS OVERVIEW
  ════════════════════════ */
  .po-section { padding: 28px 28px 48px; max-width: 960px; margin: 0 auto; }
  .po-kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-bottom: 22px; }
  .po-kpi { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px 20px 18px; box-shadow: var(--shadow-sm); transition: all 0.2s ease; position: relative; overflow: hidden; }
  .po-kpi::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: var(--radius-lg) var(--radius-lg) 0 0; background: var(--kpi-color, var(--accent)); opacity: 0; transition: opacity 0.2s; }
  .po-kpi:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
  .po-kpi:hover::before { opacity: 1; }
  .po-kpi-top   { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .po-kpi-icon  { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--kpi-icon-bg, var(--accent-light)); }
  .po-kpi-trend { font-size: 10.5px; font-weight: 600; padding: 2px 7px; border-radius: 20px; background: var(--accent-2-light); color: var(--accent-2); }
  .po-kpi-value { font-size: 28px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.8px; line-height: 1; font-family: 'DM Mono', monospace; }
  .po-kpi-label { font-size: 12.5px; font-weight: 600; color: var(--text-secondary); margin-top: 4px; }
  .po-kpi-sub   { font-size: 11px; color: var(--text-tertiary); margin-top: 2px; }
  .po-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media (max-width: 720px) { .po-bottom { grid-template-columns: 1fr; } }
  .po-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); }
  .po-panel-title { font-size: 15px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.2px; margin: 0 0 20px; }
  .po-course-row { margin-bottom: 18px; }
  .po-course-row:last-child { margin-bottom: 0; }
  .po-course-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
  .po-course-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .po-course-pct  { font-size: 12px; font-weight: 700; color: var(--accent); font-family: 'DM Mono', monospace; }
  .po-track { height: 7px; background: var(--border); border-radius: 99px; overflow: hidden; }
  .po-fill  { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(.4,0,.2,1); }
  .po-bars-wrap { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; height: 140px; }
  .po-bar-col   { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; }
  .po-bar-track { flex: 1; width: 100%; background: var(--border); border-radius: 6px; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
  .po-bar-fill  { width: 100%; border-radius: 6px; background: linear-gradient(180deg, var(--accent) 0%, #818CF8 100%); transition: height 0.6s cubic-bezier(.4,0,.2,1); min-height: 4px; }
  .po-bar-fill.today { background: linear-gradient(180deg, var(--accent-2) 0%, #34D399 100%); }
  .po-bar-day       { font-size: 11px; font-weight: 600; color: var(--text-tertiary); text-align: center; }
  .po-bar-day.today { color: var(--accent-2); font-weight: 700; }

  /* ════════════════════════
     TASK CALENDAR
  ════════════════════════ */
  .tc-section { padding: 28px 28px 48px; max-width: 960px; margin: 0 auto; }
  .tc-header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px; gap: 16px; }
  .tc-nav { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
  .tc-nav-btn { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--surface); cursor: pointer; color: var(--text-secondary); transition: all 0.16s ease; }
  .tc-nav-btn:hover { background: var(--accent-light); border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
  .tc-month-label { font-size: 14px; font-weight: 700; color: var(--text-primary); padding: 0 10px; white-space: nowrap; }
  .tc-layout { display: grid; grid-template-columns: 1fr 260px; gap: 18px; }
  @media (max-width: 760px) { .tc-layout { grid-template-columns: 1fr; } }
  .tc-cal-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-sm); }
  .tc-dow-row   { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 10px; }
  .tc-dow { font-size: 11px; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase; color: var(--text-tertiary); padding: 4px 0; }
  .tc-days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
  .tc-day { aspect-ratio: 1; border-radius: var(--radius-sm); border: 1px solid transparent; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 6px 4px 4px; cursor: pointer; transition: all 0.16s ease; position: relative; background: transparent; min-height: 48px; }
  .tc-day:hover:not(.tc-day--active):not(.tc-day--empty) { background: var(--bg); border-color: var(--border); }
  .tc-day--active { background: var(--accent); border-color: var(--accent); box-shadow: var(--shadow-accent); }
  .tc-day--has-task:not(.tc-day--active) { background: var(--accent-light); border-color: rgba(67,97,238,0.15); }
  .tc-day--today:not(.tc-day--active) .tc-day-num { color: var(--accent); font-weight: 800; }
  .tc-day--empty { cursor: default; pointer-events: none; }
  .tc-day-num { font-size: 12.5px; font-weight: 600; color: var(--text-primary); line-height: 1; transition: color 0.16s; }
  .tc-day--active .tc-day-num { color: white; }
  .tc-day-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); margin-top: auto; }
  .tc-day--active .tc-day-dot { background: rgba(255,255,255,0.7); }
  .tc-tasks-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; }
  .tc-tasks-date  { font-size: 12px; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; }
  .tc-tasks-title { font-size: 16px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.3px; margin: 0 0 18px; }
  .tc-tasks-list  { display: flex; flex-direction: column; gap: 9px; flex: 1; }
  .tc-task { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg); transition: all 0.16s ease; cursor: pointer; }
  .tc-task:hover { background: var(--surface); box-shadow: var(--shadow-sm); transform: translateX(2px); }
  .tc-task--done { opacity: 0.6; }
  .tc-task--done .tc-task-title { text-decoration: line-through; }
  .tc-task-icon  { flex-shrink: 0; margin-top: 1px; }
  .tc-task-title { font-size: 13px; font-weight: 600; color: var(--text-primary); line-height: 1.3; margin-bottom: 3px; }
  .tc-task-time  { font-size: 11px; color: var(--text-tertiary); font-family: 'DM Mono', monospace; }
  .tc-no-tasks { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 8px; padding: 24px 0; color: var(--text-tertiary); font-size: 13px; }
  .tc-no-tasks-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--accent-light); display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 4px; }

  /* ════════════════════════
     TASK MANAGER
  ════════════════════════ */
  .tm-section { padding: 28px 28px 48px; max-width: 800px; margin: 0 auto; position: relative; }
  .tm-header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px; gap: 16px; }
  .tm-new-btn { display: flex; align-items: center; gap: 7px; background: var(--accent); color: white; padding: 10px 18px; border-radius: var(--radius-md); border: none; font-size: 13.5px; font-weight: 700; cursor: pointer; transition: all 0.18s ease; box-shadow: var(--shadow-accent); white-space: nowrap; font-family: 'Plus Jakarta Sans', sans-serif; flex-shrink: 0; }
  .tm-new-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .tm-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
  .tm-summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px 18px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm); transition: all 0.2s ease; position: relative; overflow: hidden; }
  .tm-summary-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: var(--radius-lg) var(--radius-lg) 0 0; background: var(--s-color, var(--accent)); opacity: 0; transition: opacity 0.2s; }
  .tm-summary-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .tm-summary-card:hover::before { opacity: 1; }
  .tm-summary-icon  { width: 38px; height: 38px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--s-icon-bg, var(--accent-light)); flex-shrink: 0; }
  .tm-summary-label { font-size: 11.5px; font-weight: 600; color: var(--text-tertiary); }
  .tm-summary-value { font-size: 24px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.6px; line-height: 1; font-family: 'DM Mono', monospace; }
  .tm-list { display: flex; flex-direction: column; gap: 10px; }
  .tm-task { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 20px; box-shadow: var(--shadow-sm); transition: all 0.2s ease; display: flex; flex-direction: column; gap: 12px; }
  .tm-task:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); border-color: var(--border-strong); }
  .tm-task--completed { opacity: 0.65; }
  .tm-task--completed .tm-task-title { text-decoration: line-through; color: var(--text-tertiary); }
  .tm-task-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .tm-task-title-wrap { flex: 1; min-width: 0; }
  .tm-task-title { font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px; letter-spacing: -0.2px; line-height: 1.3; }
  .tm-task-desc  { font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.4; }
  .tm-status { flex-shrink: 0; font-size: 10.5px; font-weight: 700; letter-spacing: 0.3px; padding: 3px 9px; border-radius: 20px; white-space: nowrap; }
  .tm-status--pending   { background: var(--accent-3-light); color: var(--accent-3); }
  .tm-status--progress  { background: var(--accent-light);   color: var(--accent); }
  .tm-status--completed { background: var(--accent-2-light); color: var(--accent-2); }
  .tm-task-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border); }
  .tm-task-date  { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--text-tertiary); font-weight: 500; }
  .tm-priority   { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
  .tm-priority--alta  { background: var(--danger-light); color: var(--danger); }
  .tm-priority--media { background: var(--accent-3-light); color: var(--accent-3); }
  .tm-priority--baja  { background: var(--accent-2-light); color: var(--accent-2); }
  .tm-overlay { position: fixed; inset: 0; z-index: 300; display: flex; align-items: center; justify-content: center; padding: 20px; animation: overlayIn 0.18s ease both; }
  @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
  .tm-overlay-bg { position: absolute; inset: 0; background: rgba(15,23,42,0.45); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
  .tm-modal { position: relative; z-index: 1; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); width: 100%; max-width: 480px; padding: 28px; box-shadow: var(--shadow-lg); animation: modalIn 0.22s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes modalIn { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .tm-modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
  .tm-modal-title  { font-size: 20px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.4px; margin: 0 0 4px; }
  .tm-modal-sub    { font-size: 13px; color: var(--text-secondary); margin: 0; }
  .tm-modal-close  { width: 32px; height: 32px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--bg); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-secondary); transition: all 0.16s ease; flex-shrink: 0; }
  .tm-modal-close:hover { background: var(--danger-light); border-color: var(--danger); color: var(--danger); }
  .tm-modal-form { display: flex; flex-direction: column; gap: 16px; }
  .tm-modal-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .tm-modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border); }
  .tm-modal-cancel { padding: 9px 18px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--bg); font-size: 13.5px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.16s ease; font-family: 'Plus Jakarta Sans', sans-serif; }
  .tm-modal-cancel:hover { border-color: var(--border-strong); background: var(--surface); }
  .tm-modal-submit { padding: 9px 20px; border-radius: var(--radius-sm); background: var(--accent); color: white; border: none; font-size: 13.5px; font-weight: 700; cursor: pointer; box-shadow: var(--shadow-accent); transition: all 0.18s ease; font-family: 'Plus Jakarta Sans', sans-serif; }
  .tm-modal-submit:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .tm-field { display: flex; flex-direction: column; gap: 5px; }
  .tm-label { font-size: 11.5px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; color: var(--text-tertiary); }
  .tm-input-wrap { position: relative; }
  .tm-input-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none; display: flex; align-items: center; }
  .tm-input, .tm-textarea, .tm-select { width: 100%; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg); font-size: 13.5px; color: var(--text-primary); font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.16s ease; outline: none; padding: 9px 13px; }
  .tm-input.has-icon, .tm-select.has-icon { padding-left: 34px; }
  .tm-input:focus, .tm-textarea:focus, .tm-select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(67,97,238,0.12); background: var(--surface); }
  .tm-input::placeholder, .tm-textarea::placeholder { color: var(--text-tertiary); }
  .tm-textarea { resize: none; padding: 9px 13px; }
  .tm-select { appearance: none; cursor: pointer; }

  /* ════════════════════════
     USER PROFILE
  ════════════════════════ */
  .up-section { padding: 28px 28px 48px; max-width: 920px; margin: 0 auto; }
  .up-hero { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 28px 28px 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); position: relative; overflow: hidden; }
  .up-hero::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(67,97,238,0.07) 0%, transparent 70%); pointer-events: none; }
  .up-hero-inner { display: flex; align-items: flex-start; gap: 22px; flex-wrap: wrap; }
  .up-avatar { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, var(--accent) 0%, #818CF8 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 26px; font-weight: 800; flex-shrink: 0; box-shadow: var(--shadow-accent); letter-spacing: -1px; }
  .up-hero-info { flex: 1; min-width: 200px; }
  .up-name { font-size: 22px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; margin: 0 0 4px; }
  .up-role { font-size: 13.5px; color: var(--text-secondary); margin: 0 0 16px; }
  .up-stats { display: flex; gap: 10px; flex-wrap: wrap; }
  .up-stat  { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 8px 14px; text-align: center; transition: all 0.16s ease; }
  .up-stat:hover { background: var(--accent-light); border-color: rgba(67,97,238,0.2); }
  .up-stat-val   { font-size: 18px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; line-height: 1; font-family: 'DM Mono', monospace; }
  .up-stat-label { font-size: 10.5px; font-weight: 600; color: var(--text-tertiary); margin-top: 2px; }
  .up-level-badge { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 4px; align-self: flex-start; }
  .up-level-ring  { width: 60px; height: 60px; border-radius: 50%; border: 3px solid var(--accent); background: var(--accent-light); display: flex; align-items: center; justify-content: center; flex-direction: column; box-shadow: 0 0 0 6px rgba(67,97,238,0.08); }
  .up-level-num   { font-size: 13px; font-weight: 800; color: var(--accent); font-family: 'DM Mono', monospace; line-height: 1; }
  .up-level-label { font-size: 8.5px; font-weight: 700; color: var(--accent); letter-spacing: 0.4px; }
  .up-level-text  { font-size: 10px; font-weight: 600; color: var(--text-tertiary); }
  .up-grid { display: grid; grid-template-columns: 1fr 300px; gap: 18px; }
  @media (max-width: 720px) { .up-grid { grid-template-columns: 1fr; } }
  .up-col-left, .up-col-right { display: flex; flex-direction: column; gap: 16px; }
  .up-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-sm); }
  .up-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
  .up-card-icon  { width: 36px; height: 36px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--accent-light); color: var(--accent); flex-shrink: 0; }
  .up-card-title { font-size: 14px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.2px; margin: 0; }
  .up-bio { font-size: 13.5px; color: var(--text-secondary); line-height: 1.65; margin: 0; }
  .up-course { margin-bottom: 16px; }
  .up-course:last-child { margin-bottom: 0; }
  .up-course-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
  .up-course-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .up-course-pct  { font-size: 11.5px; font-weight: 700; color: var(--accent); font-family: 'DM Mono', monospace; }
  .up-course-track { height: 6px; background: var(--border); border-radius: 99px; overflow: hidden; }
  .up-course-fill  { height: 100%; border-radius: 99px; transition: width 0.6s ease; }
  .up-activity { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .up-activity:last-child { border-bottom: none; padding-bottom: 0; }
  .up-activity-dot  { width: 28px; height: 28px; border-radius: 50%; background: var(--accent-2-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .up-activity-text { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
  .up-activity-time { font-size: 11px; color: var(--text-tertiary); margin-top: 2px; font-weight: 500; }
  .up-skills { display: flex; flex-wrap: wrap; gap: 7px; }
  .up-skill  { font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 20px; background: var(--accent-light); color: var(--accent); border: 1px solid rgba(67,97,238,0.15); transition: all 0.16s ease; }
  .up-skill:hover { background: var(--accent); color: white; transform: translateY(-1px); }

  /* ════════════════════════
     USER SETTINGS
  ════════════════════════ */
  .us-section { padding: 28px 28px 48px; max-width: 900px; margin: 0 auto; }
  .us-layout  { display: grid; grid-template-columns: 220px 1fr; gap: 20px; }
  @media (max-width: 680px) { .us-layout { grid-template-columns: 1fr; } }
  .us-profile-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 24px 20px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; height: fit-content; position: sticky; top: 80px; }
  .us-avatar-wrap { position: relative; }
  .us-avatar { width: 76px; height: 76px; border-radius: 50%; background: linear-gradient(135deg, var(--accent) 0%, #818CF8 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: 800; box-shadow: var(--shadow-accent); letter-spacing: -1px; }
  .us-avatar-ring { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid rgba(67,97,238,0.2); pointer-events: none; }
  .us-profile-name { font-size: 15px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.3px; margin: 0; }
  .us-profile-role { font-size: 12px; color: var(--text-tertiary); margin: 0; }
  .us-change-photo-btn { font-size: 12.5px; font-weight: 600; color: var(--accent); background: var(--accent-light); border: 1px solid rgba(67,97,238,0.15); padding: 7px 16px; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.16s ease; font-family: 'Plus Jakarta Sans', sans-serif; width: 100%; }
  .us-change-photo-btn:hover { background: var(--accent); color: white; }
  .us-settings-col { display: flex; flex-direction: column; gap: 16px; }
  .us-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-sm); }
  .us-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
  .us-card-icon  { width: 36px; height: 36px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--accent-light); color: var(--accent); flex-shrink: 0; }
  .us-card-title { font-size: 14px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.2px; margin: 0; }
  .us-form-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 500px) { .us-form-grid { grid-template-columns: 1fr; } }
  .us-field { display: flex; flex-direction: column; gap: 5px; }
  .us-label { font-size: 11px; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase; color: var(--text-tertiary); }
  .us-input-wrap { position: relative; }
  .us-input-icon   { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none; display: flex; align-items: center; }
  .us-input-action { position: absolute; right: 11px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); cursor: pointer; background: none; border: none; display: flex; align-items: center; padding: 0; transition: color 0.14s; }
  .us-input-action:hover { color: var(--accent); }
  .us-input { width: 100%; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg); font-size: 13.5px; color: var(--text-primary); font-family: 'Plus Jakarta Sans', sans-serif; padding: 9px 13px; outline: none; transition: all 0.16s ease; }
  .us-input.has-icon       { padding-left: 34px; }
  .us-input.has-right-icon { padding-right: 34px; }
  .us-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(67,97,238,0.10); background: var(--surface); }
  .us-input::placeholder { color: var(--text-tertiary); }
  .us-toggle-list { display: flex; flex-direction: column; }
  .us-toggle-row  { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .us-toggle-row:last-child { border-bottom: none; padding-bottom: 0; }
  .us-toggle-info  { flex: 1; }
  .us-toggle-label { font-size: 13.5px; font-weight: 600; color: var(--text-primary); }
  .us-toggle-sub   { font-size: 11.5px; color: var(--text-tertiary); margin-top: 1px; }
  .us-toggle { position: relative; width: 42px; height: 24px; border-radius: 12px; cursor: pointer; flex-shrink: 0; transition: background 0.22s ease; background: var(--border-strong); border: none; outline: none; }
  .us-toggle.on { background: var(--accent); }
  .us-toggle-thumb { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.15); transition: transform 0.22s cubic-bezier(.34,1.56,.64,1); }
  .us-toggle.on .us-toggle-thumb { transform: translateX(18px); }
  .us-actions    { display: flex; justify-content: flex-end; gap: 10px; padding-top: 4px; }
  .us-btn-cancel { padding: 10px 20px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--surface); font-size: 13.5px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.16s ease; font-family: 'Plus Jakarta Sans', sans-serif; }
  .us-btn-cancel:hover { border-color: var(--border-strong); background: var(--bg); }
  .us-btn-save { display: flex; align-items: center; gap: 6px; padding: 10px 22px; border-radius: var(--radius-sm); background: var(--accent); color: white; border: none; font-size: 13.5px; font-weight: 700; cursor: pointer; box-shadow: var(--shadow-accent); transition: all 0.18s ease; font-family: 'Plus Jakarta Sans', sans-serif; }
  .us-btn-save:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .us-btn-save.saved { background: var(--accent-2); box-shadow: 0 6px 20px rgba(6,200,150,0.25); }
`;

/* ── Courses section ─────────────────────── */
function CoursesSection() {
  const courses = [
    { title: "React Básico",        description: "Aprende los fundamentos de React: componentes, props, estado y hooks esenciales.", progress: 40, tag: "En progreso" },
    { title: "Diseño UI/UX",        description: "Principios de diseño moderno aplicados a interfaces web y móviles.",               progress: 72, tag: "En progreso" },
    { title: "JavaScript Avanzado", description: "Closures, promesas, async/await y patrones de diseño del lenguaje.",               progress: 15, tag: "Iniciado" },
  ];
  return (
    <section className="courses-section">
      <span className="courses-eyebrow">📚 Biblioteca</span>
      <h2 className="courses-title">Tus Cursos</h2>
      <p className="courses-subtitle">Continúa donde lo dejaste o explora nuevo contenido.</p>
      <div className="courses-grid">
        {courses.map((c) => <CourseCard key={c.title} {...c} />)}
      </div>
    </section>
  );
}

/* ── App ────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "notifications": return <Notifications />;
      case "profile":       return <UserProfile />;
      case "overview":      return <DashboardOverview />;
      case "courses":       return <CoursesSection />;
      case "tasks":         return <TaskManager />;
      case "calendar":      return <TaskCalendar />;
      case "progress":      return <ProgressOverview />;
      case "settings":      return <UserSettings />;
      default:              return <DashboardOverview />;
    }
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="app-layout">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="app-main">
          <DashboardHeader setActiveSection={setActiveSection} />
          <div className="app-content">
            <div className="page-enter" key={activeSection}>
              {renderSection()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}