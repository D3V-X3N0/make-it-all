import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects as initialProjects } from "../data/projects";
import { users } from "../data/users";
import { tasks as initialTasks } from "../data/tasks";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { HiOutlineUserGroup, HiOutlineCalendar, HiOutlineClipboardList } from "react-icons/hi";
import "./projectDetails.css"
import "./manageTasks.css"

const COLORS = ["#8a8bbaff", "#5865f2", "#234351ff"];

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState(initialProjects);
    const project = projects.find((p) => p.id === parseInt(id));
    const firstName = (n) => (n || '').split(' ')[0];
    const seedTasks = (project) => {
      if (!project) return [];
      const names = [project.manager, ...(project.teamMembers || [])].filter(Boolean);
      return (initialTasks || []).filter(t => names.includes(t.assignedTo)).map((t, idx) => ({
        id: t.id || Date.now() + idx,
        name: t.name,
        description: t.description || "",
        dueDate: t.dueDate || "",
        assignedTo: t.assignedTo || "",
        priority: t.priority || "Medium",
        status: t.status || "Pending",
      }));
    };
    const [projectTasks, setProjectTasks] = useState(seedTasks(project));
    
    
    const [newTask, setNewTask] = useState({ name: "", description: "", dueDate: "", assignedTo: users[0]?.name || "", priority: "Medium", status: "Pending" });
    
    if(!project) return <div className="project-not-found">Project not found</div>

    const projectBreakdown = [
        { name: "Completed", value: project.progress },
        { name: "Uncompleted", value: 100 - project.progress },     
    ];

    const addTask = () => {
        if (!newTask.name.trim()) return;
        setProjectTasks(prev => [
            ...prev,
            { ...newTask, id: Date.now(), done: false }
        ]);
        setNewTask({ name: "", description: "", dueDate: "", assignedTo: users[0]?.name || "", priority: "Medium", status: "Pending" });
        ;
    };

    return (
        <div className="project-details-page">
            <header className="project-header glass">
                <h1>{project.name}</h1>
                <span
                className={`status-badge ${project.status.toLowerCase().replace(" ", "-")}`}>
                    {project.status}
                </span>
            </header>

            <button
                className="back-btn"
                onClick={() => navigate("/manage-projects")}>
                    ← Back 
                </button>

            
            <section className="project-summary">
                <div className="summary-cards">
                    <div className="summary-card glass">
                        <span className="icon"><HiOutlineUserGroup /></span>
                        <div>
                            <div className="label">Manager</div>
                            <div className="value">{firstName(project.manager)}</div>
                        </div>
                    </div>
                    <div className="summary-card glass">
                        <span className="icon"><HiOutlineCalendar /></span>
                        <div>
                            <div className="label">Deadline</div>
                            <div className="value">{project.dueDate || "—"}</div>
                        </div>
                    </div>
                    <div className="summary-card glass">
                        <span className="icon"><HiOutlineClipboardList /></span>
                        <div>
                            <div className="label">Team</div>
                            <div className="value">{(project.teamMembers?.map(firstName).join(", ")) || "No team assigned"}</div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="progress-section">
                <div className="progress-container">
                    <div className="progress-bar" style={{width: `${project.progress}%` }}></div>
                </div>
                <p>{project.progress}% Complete</p>
            </section>
            <section className="analytics-section">
                <div className="chart-card">
                    <h3>Project Breakdown</h3>
                    <PieChart width={280} height={220}>
                        <Pie
                            data={projectBreakdown}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            label
                            >
                                {projectBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                    </PieChart>
                </div>

                <div className="info-card">
                <h3>Tasks</h3>
                <div className="tasks-Form" style={{display:"flex", gap:"8px", alignItems:"center", marginBottom:"12px"}}>       
                    <input type="text" className="tasks-input" placeholder="Task title" value={newTask.name} onChange={(e)=>setNewTask({...newTask, name:e.target.value})} />
                    <input type="text" className="tasks-input" placeholder="Task description" value={newTask.description} onChange={(e)=>setNewTask({...newTask, description:e.target.value})} />
                    <input type="date" className="tasks-input" value={newTask.dueDate} onChange={(e)=>setNewTask({...newTask, dueDate:e.target.value})} />
                    <select className="tasks-input" value={newTask.assignedTo} onChange={(e)=>setNewTask({...newTask, assignedTo:e.target.value})}>
                        {users.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
                    </select>
                    <select className="tasks-input" value={newTask.priority} onChange={(e)=>setNewTask({...newTask, priority:e.target.value})}>
                        {["Low","Medium","High"].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select className="tasks-input" value={newTask.status} onChange={(e)=>setNewTask({...newTask, status:e.target.value})}>
                        {["Pending","In Progress","Completed"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button className="tasks-btn" onClick={addTask} disabled={!newTask.name.trim()}>Add Task</button>
                </div>

                <div className="table-wrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Done</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due</th>
                                <th>Assigned To</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectTasks.map((task) => (
                                <tr key={task.id} className={task.status==="Completed" ? "completed" : ""}>
                                    <td><input type="checkbox" checked={task.status==="Completed"} onChange={(e)=>setProjectTasks(prev=>prev.map(t=> t.id===task.id ? {...t, status: e.target.checked?"Completed":"Pending"} : t))} /></td>
                                    <td>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td>{task.dueDate || "-"}</td>
                                    <td>{task.assignedTo || "-"}</td>
                                    <td><span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                                    <td><span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
                </section>
                <section className="activity-section glass">
                    <h3>Recent Activity</h3>
                    <ul>
                        <li> {firstName(project.manager)} updated project status to "{project.status}"</li>
                        <li> Deadline set to {project.dueDate}</li>
                        <li> Team members assigned: {(project.teamMembers?.map(firstName).join(", ")) || "No team assigned" }</li>
                    </ul>
                </section>
            </div>
    );
}