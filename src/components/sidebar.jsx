import React from "react";
import { HiOutlineHome, HiOutlineFolder, HiOutlineUser, HiOutlineChat, HiOutlineAnnotation, HiOutlineChatAlt2 } from "react-icons/hi"
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
    const location = useLocation();
    const isEmployeeView = location.pathname.startsWith("/employee");

    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <h2>Make-It-All</h2>
            </div>
            <div className="sidebar-profile">
                <HiOutlineUser className="user-icon" />
                <h3 className="sidebar-name">{isEmployeeView ? "Employee" : "Manager"}</h3>
                <p className="sidebar-email">{isEmployeeView ? "employee@make-it-all.co.uk" : "manager@make-it-all.co.uk"}</p>
            </div>

            <h3>Main</h3>
            <nav>
                {/* Role Switcher */}
                <div style={{ marginBottom: "16px", textAlign: "center" }}>
                    {isEmployeeView ? (
                        <Link to="/dashboard" style={{ 
                            color: "#b8baff", 
                            fontSize: "12px", 
                            textDecoration: "underline",
                            display: "block",
                            padding: "8px"
                        }}>
                            Switch to Manager View →
                        </Link>
                    ) : (
                        <Link to="/employee-home" style={{ 
                            color: "#b8baff", 
                            fontSize: "12px", 
                            textDecoration: "underline",
                            display: "block",
                            padding: "8px"
                        }}>
                            Switch to Employee View →
                        </Link>
                    )}
                </div>

                {isEmployeeView ? (
                    // Employee Navigation
                    <>
                        <Link to="/employee-home" className={location.pathname === "/employee-home" ? "active" : ""}>
                            <HiOutlineHome className="icon" /> Dashboard
                        </Link>
                        <Link to="/employee-tasks" className={location.pathname === "/employee-tasks" ? "active" : ""}>
                            <HiOutlineFolder className="icon" /> Tasks
                        </Link>
                        <Link to="/employee-topics" className={location.pathname === "/employee-topics" ? "active" : ""}>
                            <HiOutlineChatAlt2 className="icon" /> Topics
                        </Link>
                    </>
                ) : (
                    // Manager Navigation
                    <>
                        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
                            <HiOutlineHome className="icon" /> Dashboard
                        </Link>
                        <Link to="/manage-tasks" className={location.pathname === "/manage-tasks" ? "active" : ""}>
                            <HiOutlineFolder className="icon" /> Manage Tasks
                        </Link>
                        <Link to="/manage-projects" className={location.pathname === "/manage-projects" ? "active" : ""}>
                            <HiOutlineUser className="icon" /> Manage Projects
                        </Link> 
                        <Link to="/topics" className={location.pathname === "/topics" ? "active" : ""}>
                            <HiOutlineChatAlt2 className="icon" /> Topics
                        </Link>
                    </>
                )}
            </nav>
        </aside>
        
    );
}