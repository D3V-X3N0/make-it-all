import React from "react";
import { Link } from "react-router-dom";
import "../pages/employeeBase.css";
import "../pages/employeeHome.css";

export default function EmployeeHome() {
  const currentUserName = "Alex Johnson";
  const nextDue = [
    { id: 2, name: "Design Dashboard Layout", dueDate: "2025-10-20" },
  ];
  const totalTasks = 1;
  const completedCount = 0;
  const activeCount = 1;
  const progressPct = 0;
  return (
    <div className="employee-content">
      <h2 style={{ margin: "0 0 20px 0", fontSize: "28px", fontWeight: 800 }}>Dashboard</h2>
      
      <div className="employee-welcomeRow">
        <div className="employee-panel">
          <div className="employee-panelTitle">Welcome</div>
          <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 16 }}>
            Hello, {currentUserName} 👋
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--muted)", marginBottom: 8 }}>Next due</div>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {nextDue.map((t) => (
              <li key={t.id}>
                <b>{t.name}</b> — {t.dueDate}
              </li>
            ))}
          </ul>
        </div>

        <div className="employee-panel">
          <div className="employee-panelTitle">My Task Statistics</div>
          <div className="employee-statsList">
            <div className="employee-statRow">
              <span className="employee-statLabel">Total</span>
              <span className="employee-kpi">{totalTasks}</span>
            </div>
            <div className="employee-statRow">
              <span className="employee-statLabel">Completed</span>
              <span className="employee-kpi employee-kpi-success">{completedCount}</span>
            </div>
            <div className="employee-statRow">
              <span className="employee-statLabel">Active</span>
              <span className="employee-kpi employee-kpi-accent">{activeCount}</span>
            </div>
          </div>
          
        </div>

        <div className="employee-panel employee-panel-center">
          <div className="employee-panelTitle">Your Progress</div>
          <div className="employee-ringWrap">
            <div className="employee-ringTrack" />
            <div className="employee-ringFill" style={{ background: `conic-gradient(from 0deg, var(--accent) 0%, #8b92ff ${progressPct}%, rgba(47, 49, 64, 0.8) ${progressPct}%, rgba(47, 49, 64, 0.8) 100%)` }} />
            <div className="employee-ringCenter">{progressPct}%</div>
          </div>
          <Link to="/employee-tasks" className="employee-cta" style={{ pointerEvents: "none" }}>
            See my tasks →
          </Link>
        </div>
      </div>

      <div className="employee-gridOne">
        <div className="employee-panel employee-announcementsPanel">
          <div className="employee-panelTitle">Announcements</div>
          <ul className="employee-listGrid">
            <li className="employee-note">
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: 12,
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Sprint 12 timing
              </div>
              <div style={{ fontWeight: 800, marginBottom: 6, fontSize: 15 }}>
                Sarah Lee
              </div>
              <div style={{ lineHeight: 1.6 }}>Standup moved to 10:30 daily this week.</div>
            </li>
            <li className="employee-note">
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: 12,
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Client review
              </div>
              <div style={{ fontWeight: 800, marginBottom: 6, fontSize: 15 }}>
                Chris Stokes
              </div>
              <div style={{ lineHeight: 1.6 }}>Client review Monday 14:00 — bring demos.</div>
            </li>
          </ul>
          <button className="employee-btn employee-btn-full" disabled>
            View all announcements
          </button>
        </div>
      </div>

      <div className="employee-teamBlock">
        <h2 style={{ margin: "0 0 16px 0", fontSize: "24px" }}>Team Members</h2>
        <div className="employee-teamWrap">
          <MemberRow initials="JP" name="James Paddock" role="Project Manager" pct={25} />
          <MemberRow initials="MJ" name="Mary Jane" role="Developer" pct={50} />
          <MemberRow initials="AJ" name="Alex Johnson" role="Developer" pct={25} />
        </div>
      </div>
    </div>
  );
}

function MemberRow(props) {
  const pctStyle = { width: props.pct + "%" };
  return (
    <div className="employee-memberCard">
      <div className="employee-avatar">{props.initials}</div>
      <div className="employee-flexGrow">
        <div
          style={{
            fontWeight: 800,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {props.name}
        </div>
        <div style={{ color: "var(--muted)", fontSize: 12 }}>{props.role}</div>
      </div>
      <div className="employee-memberRight">
        <div className="employee-progressTiny">
          <div className="employee-progressBar" style={pctStyle} />
        </div>
        <div className="employee-pctText">{props.pct}%</div>
      </div>
    </div>
  );
}

