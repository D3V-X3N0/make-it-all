import React, { useState } from "react";
import { tasks as initialTasks } from "../data/tasks"
import { users } from "../data/users"
import { HiOutlineUser } from "react-icons/hi";
import "./manageTasks.css";

const userColors = ["#5856f2", "#43b581", "#f04747", "#f1c40f"]

const getUserColor = (name) => {
    const index = users.findIndex(u => u.name === name);
    return userColors[index % userColors.length];
};

export default function ManageTasks() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [taskList, setTaskList] = useState(initialTasks);
    const [newTask, setNewTask] = useState({ name: "", description: ""});
    const [editingTask, setEditingTask] = useState(null);

    const filteredTasks = taskList
    .filter((task) => 
    filter === "All" ? true : task.status === filter)
    .filter(
        (task) => 
            (task.name?.toLowerCase() || "").includes(search.toLowerCase())  ||
            (task.description?.toLowerCase() || "").includes(search.toLowerCase())
    );
    const completedCount = taskList.filter((t) => t.status === "Completed").length;

    const handleAddTask = () => {
        if (!newTask.name.trim()) return;

        const newEntry = {
            id: Date.now(),
            name: newTask.name,
            description: newTask.description,
            assignedTo: "Unassigned",
            status: "Pending",
            priority: "Low",
            dueDate: "Not set",
        };

        setTaskList([...taskList, newEntry]);
        setNewTask({ name: "", description: "" });
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setNewTask({ name: task.name, description: task.description});
    }

    const handleSaveEdit = () => {
        setTaskList((prev) => 
            prev.map((t) => 
            t.id === editingTask.id
        ? { ...t, name: newTask.name, description: newTask.description }
        : t)
        );

        setEditingTask(null);
        setNewTask({ name: "", description: "" })
    };

        return (
            <div className="manage-tasks-page">
                <h2 className="tasks-header">Manage Tasks</h2>
                <div style={{ marginBottom: "16px" }}>
                    <input
                    type="text"
                    className="tasks-input"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "50%" }}
                    />
                </div>
                    
                
                <div className="task-filters">
                    {["All", "Pending", "In Progress", "Completed"].map((status) => (
                        <button
                            key={status}
                            className={`filter-btn ${filter === status ? "active" : ""}`}
                            onClick={() => setFilter(status)}
                            >
                                {status}
                            </button>
                    ))}
                </div>
            <div className="tasks-panel glass">
                <div className="tasks-Title">
                    All Tasks - {completedCount}/{taskList.length} completed
                </div>

                <div className="tasks-Form">
                    <input 
                        type="text"
                        className="tasks-input"
                        placeholder="Task title"
                        value={newTask.name}
                        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        />

                     <input
                        type="text"
                        className="tasks-input"
                        placeholder="Task description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                {editingTask ? (
                    <button className="tasks-btn" 
                    onClick={handleSaveEdit}
                    disabled={!newTask.name.trim()}
                    >
                    Save
                    </button>
                ) : (
                    <button
                    className="tasks-btn"
                    onClick={handleAddTask}
                    disabled={!newTask.name.trim()}
                    >
                        Add Task
                    </button>
                )}
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task) => (
                                <tr key={task.id}>
                                    <td>
                                        <input
                                        type="checkbox"
                                        checked={task.status === "Completed"}
                                        onChange={() => {
                                            setTaskList((prev) => 
                                            prev.map((t) =>
                                            t.id === task.id
                                        ? {
                                            ...t,
                                            status:
                                            t.status === "Completed"
                                            ? "Pending" : "Completed",
                                        }
                                    : t
                                )
                            );
                        }}
                                        className="checkbox"
                                        />
                                    </td>
                                    <td
                                    className={`task-title ${task.status === "Completed" ? "completed" : ""}`}
                                    >
                                        {task.name}
                                    </td>
                                    <td>{task.description}</td>
                                    <td>{task.dueDate}</td>
                                    <td>
                                        <div className="assigned-to">
                                            <div
                                            className="user-icon-circle"
                                            style={{ backgroundColor: getUserColor(task.assignedTo)}}
                                       >
                                        <HiOutlineUser className="user-icon" />
                                        </div>
                                        <span>{task.assignedTo}</span>
                                    </div>
                                    </td>
                                    <td>
                                        <span className={`priority-badge ${task.priority.toLowerCase().replace(" ", "-")}`}
                                    >
                                        {task.priority}
                                    </span>
                                    </td>
                                    <td>
                                        <span 
                                        className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                         
                                    <td>
                                        <button className="edit-btn" 
                                        onClick={() => handleEditClick(task)}>
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
