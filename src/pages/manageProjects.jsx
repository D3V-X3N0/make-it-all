
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { projects as initialProjects } from "../data/projects";
import { users } from "../data/users";
import { HiOutlineUser, HiOutlineCalendar, HiOutlineClipboardList } from "react-icons/hi";
import "./manageProjects.css";
import { Link } from "react-router-dom";

export default function ManageProjects() {
  const [filter, setFilter] = useState("All");
  const [projectList, setProjectList] = useState(initialProjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    manager: users.find(u => u.role.toLowerCase().includes("manager"))?.name || "",
    dueDate: "",
    totalTasks: 0,
    totalTasksCompleted: 0,
    progress: 0,
    status: "On Track",
    teamMembers: []
  });

  const firstName = (n) => (n || "").split(" ")[0];

  const filteredProjects = filter === "All"
    ? projectList
    : projectList.filter(p => p.status === filter);

  const total = projectList.length;
  const onTrack = projectList.filter(p => p.status === "On Track").length;
  const delayed = projectList.filter(p => p.status === "Delayed").length;
  const critical = projectList.filter(p => p.status === "Critical").length;

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const numeric = ["totalTasks", "totalTasksCompleted", "progress"].includes(name);
    setFormData(prev => ({ ...prev, [name]: numeric ? Number(value) : value }));
  };

  const handleTeamToggle = (memberName) => {
    setFormData(prev => {
      const has = prev.teamMembers.includes(memberName);
      return { ...prev, teamMembers: has ? prev.teamMembers.filter(m => m !== memberName) : [...prev.teamMembers, memberName] };
    });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    const nextId = (projectList.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) || 0) + 1;
    const newProject = {
      id: nextId,
      name: formData.name.trim(),
      manager: formData.manager || "Unassigned",
      totalTasks: formData.totalTasks || 0,
      totalTasksCompleted: formData.totalTasksCompleted || 0,
      progress: Math.max(0, Math.min(100, formData.progress || 0)),
      status: formData.status || "On Track",
      dueDate: formData.dueDate || "",
      teamMembers: formData.teamMembers,
    };
    setProjectList(prev => [newProject, ...prev]);
    closeAddModal();
    setFormData({
      name: "",
      manager: users.find(u => u.role.toLowerCase().includes("manager"))?.name || "",
      dueDate: "",
      totalTasks: 0,
      totalTasksCompleted: 0,
      progress: 0,
      status: "On Track",
      teamMembers: []
    });
  };

  return (
    <div className="manage-projects-page">
      <h1>Manage Projects</h1>

      <div className="controls-row">
        <button className="add-project-btn" onClick={openAddModal}>+ Add Project</button>

      {showAddModal && createPortal(
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Add Project</h2>
            <form onSubmit={handleAddProject} className="project-form">
              <label>
                Project Name
                <input name="name" value={formData.name} onChange={handleFormChange} placeholder="e.g. Website Revamp" required />
              </label>

              <label>
                Manager
                <select name="manager" value={formData.manager} onChange={handleFormChange}>
                  {[...new Set(users.map(u => u.name))].map(n => (
                    <option key={n} value={n}>{firstName(n)}</option>
                  ))}
                </select>
              </label>

              <label>
                Due Date
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleFormChange} />
              </label>

              <div className="grid-2">
                <label>
                  Total Tasks
                  <input type="number" name="totalTasks" min="0" value={formData.totalTasks} onChange={handleFormChange} />
                </label>
                <label>
                  Completed
                  <input type="number" name="totalTasksCompleted" min="0" value={formData.totalTasksCompleted} onChange={handleFormChange} />
                </label>
              </div>

              <label>
                Progress (%)
                <input type="number" name="progress" min="0" max="100" value={formData.progress} onChange={handleFormChange} />
              </label>

              <label>
                Status
                <select name="status" value={formData.status} onChange={handleFormChange}>
                  {["On Track", "Delayed", "Critical"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <fieldset className="team-fieldset">
                <legend>Team Members</legend>
                <div className="team-grid">
                  {users.map(u => (
                    <label key={u.id} className="team-choice">
                      <input
                        type="checkbox"
                        checked={formData.teamMembers.includes(u.name)}
                        onChange={() => handleTeamToggle(u.name)}
                      />
                      <span className="avatar"><HiOutlineUser /></span>
                      <span>{firstName(u.name)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="modal-actions">
                <button type="button" onClick={closeAddModal} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <div className="summary-bar">
        <div className="summary-item">Total: {total}</div>
        <div className="summary-item ontrack">On Track: {onTrack}</div>
        <div className="summary-item delayed">Delayed: {delayed}</div>
        <div className="summary-item critical">Critical: {critical}</div>
      </div>

      <div className="filters">
        {['All','On Track','Delayed','Critical'].map(status => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      </div>

      <div className="project-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <h3 className="project-name">{project.name}</h3>
            <p className="manager">Manager: {firstName(project.manager)}</p>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${project.progress}%` }}></div>
            </div>
            <p className="progress-label">{project.progress}% complete</p>
            <p>
              Status: <span className={`status-badge ${project.status.toLowerCase().replace(" ", "-")}`}>{project.status}</span>
            </p>
            <p>Due: {project.dueDate || "—"}</p>
            <div className="team">
              <span className="icon"><HiOutlineUser /></span>
              <span>{(project.teamMembers || []).map(firstName).join(", ")}</span>
            </div>
            <Link to={`/project-details/${project.id}`} className="view-btn">View Project</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
