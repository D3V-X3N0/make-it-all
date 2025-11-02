import React from "react";
import Card from "../components/card";
import Chart from "../components/chart";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";
import { stats } from "../data/stats";
import { TaskDistributionChart, TaskPriorityPie } from "../components/chart";
import { taskDistribution, taskPriority } from "../data/tasks";
import "./dashboard.css";
import { Link } from "react-router-dom"

export default function Dashboard(){
    const data = [
    { name: "Mon", tasks: 4 },
    { name: "Tue", tasks: 6 },
    { name: "Wed", tasks: 3 },
    { name: "Thu", tasks: 7 },
    { name: "Fri", tasks: 5 },
  ];

  const fullDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    years: "numeric",
    month: "long",
    day: "numeric",
  })

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Welcome back, Manager! 👋</h2>
                <p className="dashboard-date">{fullDate}</p>
            </div>

            <div className="dashboard-cards">
                <Card title="Active Tasks " value={stats.totalTasks} color="#5865f2"  />
                <Card title="Ongoing Projects " value={stats.completedTasks} color="#43b581" />
                <Card title="Active Projects" value={stats.activeProjects} color="#f04747"  />
                <Card title="Team Members " value={stats.teamMembers} />
            </div>

            <div className="dashboard-charts">
                <div className="chart-box full-width glass">
                    <h3>Weekly Activity Overview</h3>
                    <Chart data={data} />
                </div>
            
                <div className="chart-box glass">
                    <h3> Task Distribution </h3>
                    <TaskDistributionChart data={taskDistribution} />
                </div>

                <div className="chart-box glass">
                    <h3>Task Priority Levels</h3>
                    <TaskPriorityPie data={taskPriority} />
                </div>
            </div>
            <div className="recent-tasks glass">
                <div className="recent-tasks-header">
                    <h3>Recent Tasks</h3>
                    <Link to="/manage-tasks" className="btn btn-primary">See All</Link>
                </div>

                <table className="recent-tasks-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.slice(0, 4).map((task) => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>{task.assignedTo}</td>
                                <td>
                                    <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td>
                                    <span className={`priority-badge ${task.priority.toLowerCase().replace(" ", "-")}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td>{task.dueDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

