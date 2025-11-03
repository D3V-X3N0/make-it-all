import "./topbar.css";
import React, { useState } from 'react';
import { Bell, Menu, X } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { notifications } from "../data/notifications";
import { Link } from "react-router-dom";
import person from "./person.png";

function Topbar() {
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation();

    const getTitle = (path) => {
        if (path.startsWith('/project-details')) return 'Project Details';
        if (path.startsWith('/employee-home')) return 'Home';
        if (path.startsWith('/employee-tasks')) return 'My Tasks';
        switch (path) {
            case '/dashboard': return 'Dashboard';
            case '/manage-tasks': return 'Manage Tasks';
            case '/manage-projects': return 'Manage Projects';
            case '/topics': return 'Topics';
            case '/profile': return 'Profile';
            case '/employee-topics': return 'Topics'
            default: return "Manager's Dashboard";
        }
    };
    
    const segments = location.pathname.split('/').filter(Boolean);
    const base = segments.length ? '/' + segments[0] : '/';
    const pageTitle = getTitle(location.pathname.startsWith('/project-details') ? '/project-details' : location.pathname.startsWith('/employee-home') ? '/employee-home' : location.pathname.startsWith('/employee-tasks') ? '/employee-tasks' : location.pathname.startsWith('/employee-chat') ? '/employee-chat' : base);

    return (
        <header className="topbar">
            <div className="topbar-left">
                <h1 className="topbar-title">{pageTitle}</h1>
            </div>

            <div className="topbar-right">

            <div className="notification-container">
                <button
                    className="topbar-button"
                    onClick={() => setShowNotifications(!showNotifications)}>
                        <Bell className="icon" />
                    </button>

                    {showNotifications && (
                        <div className="notifications-dropdown">
                            <h4>Notifications</h4>
                            {notifications.map((note) => (
                                <div key={note.id} className="notification-item">
                                    <p>{note.message}</p>
                                    <span>{note.time}</span>
                                    </div>
                            ))}
                            </div>
                    )}
                </div>        

                <Link to="/profile">
                  <img
                    src={person}
                    alt="User Avatar"
                    className="topbar-avatar"
                  />
                </Link>
            </div>
        </header>

    );
}

export default Topbar;