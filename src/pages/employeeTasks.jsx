import React, { useState } from "react";
import { Link }   from "react-router-dom";
import { projects } from "../data/projects";
import "../pages/employeeBase.css";
import "../pages/employeeTasks.css";


export default function EmployeeTasks() {
   const currentUserName = "Alex Johnson";
 const myProjectsRaw = (projects || []).filter((p) => {
     const team = p.teamMembers || [];
       return p.manager === currentUserName || team.includes(currentUserName);
 });
     const myProjects = myProjectsRaw.length ? myProjectsRaw : (projects || []).slice(0, 3);

   const [projectFilter, setProjectFilter] = useState("All");
const uniqueStatuses = Array.from(
  new Set(myProjects.map((p) => p.status || "Unknown"))
       );
 const totalProjects = myProjects.length;
 const statusCount = (label) =>
      myProjects.filter((p) => (p.status || "Unknown") === label).length;

 const tasks = [
     {
      id: 1,
         title: "Design Dashboard Layout",
      description: "Refine grid and card spacing.",
       done: false
    },
       {
     id: 2,
      title: "Implement login module",
     description: "Email+password with basic validation.",
   done: true
       },
   {
    id: 3,
      title: "Prepare project report",
         description: "Draft weekly update for stakeholders.",
     done: false
        }
  ];

     const completedCount = tasks.filter(t => t.done).length;



    return (
   <div className="employee-content tasks-page">
         <h2 style={{ margin: "0 0 20px 0", fontSize: "28px", fontWeight: 800 }}>My Tasks</h2>

    <div className="employee-panel" style={{ marginBottom: 16 }}>
          <div className="employee-panelTitle" style={{ fontSize: "14px", marginBottom: "12px" }}>
            My Projects
           </div>
      <div className="summary-bar">
            <div className="summary-item">Total: {totalProjects}</div>
          {uniqueStatuses.map((s) => {
       const cls = s.toLowerCase().includes("track")
        ? "ontrack"
           : s.toLowerCase().includes("delay")
            ? "delayed"
             : s.toLowerCase().includes("critical")
               ? "critical"
                  : "";
         return (
          <div key={s} className={`summary-item ${cls}`}>{s}: {statusCount(s)}</div>
        );
          })}
      </div>

    <div className="project-filters">
  <button
    className={`filter-btn ${projectFilter==='All' ? 'active' : ''}`}
    onClick={() => setProjectFilter('All')}
  >
    All
  </button>
  {uniqueStatuses.map((s) => (
    <button
      key={s}
      className={`filter-btn ${projectFilter===s ? 'active' : ''}`}
      onClick={() => setProjectFilter(s)}
    >
      {s}
    </button>
  ))}
</div>
       <div className="project-cards-container">
      {(projectFilter==='All' ? myProjects : myProjects.filter(p => (p.status || 'Unknown') === projectFilter)).map((project) => (
       <div key={project.id} className="project-card">
           <h3 className="project-name">{project.name}</h3>
            {project.manager && (
                 <p className="manager">Manager: {project.manager}</p>
            )}

          <div className="progress-container">
               <div
            className="progress-bar"
                   style={{ width: `${project.progress || 0}%` }}
               ></div>
            </div>
             <p className="progress-label">{project.progress || 0}% complete</p>

           <p>
            Status:{" "}
              <span
              className={`status-badge ${(project.status || "").toLowerCase().replace(" ", "-")}`}
             >
               {project.status || "Unknown"}
             </span>
           </p>

            {project.teamMembers && project.teamMembers.length > 0 && (
                <div className="team-section">
                <span>{project.teamMembers.join(", ")}</span>
             </div>
             )}
          <p className="project-meta"><span className="muted">Role:</span> Frontend Developer</p>
             <p className="project-meta"><span className="muted">Next milestone:</span> Sprint 12 Demo — 2025-11-05</p>
         <p className="project-meta"><span className="muted">Tech:</span> React, Node, Figma</p>

           <Link to={`/projects/${project.id}`} className="view-btn" style={{ pointerEvents: "none" }}>
            Details
           </Link>
        </div>
        ))}
        </div>
   </div>

     <div className="employee-panel">
      <div className="employee-panelTitle" style={{ fontSize: "14px", marginBottom: "16px" }}>
           To-Do List — {completedCount}/{tasks.length} done
        </div>
        <div className="employee-inlineForm">
         <input
         type="text"
             className="employee-input"
             placeholder="To-Do title"
           />
              <input
          type="text"
           className="employee-input"
               placeholder="To-Do description"
           />
         <button className="employee-btn" disabled style={{ minWidth: 110 }}>
              Add To-Do
            </button>
        </div>
         <div className="employee-tableWrap">
          <table className="employee-table">
             <thead>
              <tr>
              <th>Done</th>
                 <th>Title</th>
             <th>Description</th>
              <th>Actions</th>
             </tr>
           </thead>
            <tbody>
             {tasks.map((task) => (
           <tr key={task.id}>
            <td>
              <input 
             type="checkbox" 
                 defaultChecked={task.done}
               disabled
                className="employee-checkbox"
             />
             </td>
          <td style={{ textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1 }}>
             {task.title}
             </td>
           <td style={{ opacity: task.done ? 0.6 : 1 }}>{task.description}</td>
             <td>
             <button 
                 className="employee-btn employee-editBtn" 
                 disabled
              >
             Edit
              </button>
              </td>
            </tr>
            ))}
         </tbody>
          </table>
          </div>
      </div>
    </div>
     );
}