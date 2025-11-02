import { useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@make-it-all.co.uk',
    role: 'Team Lead',
    department: 'Development'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReports: false
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    showNotification("Profile updated successfully!");
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    showNotification("Notification preferences saved!");
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      showNotification("New passwords do not match!");
      return;
    }
    setPasswords({ current: "", new: "", confirm: "" });
    showNotification("Password changed successfully!");
  };

  return (
    <div className="profile-page">
      {showToast && <div className="toast">{toastMessage}</div>}
      
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="PTitle">Profile Settings</h1>
          <Link to="/">
            <button className="btn-outline">Back to Home</button>
          </Link>
        </div>

        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-title-section">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <h2>Personal Information</h2>
                <p className="profile-card-description">Manage your personal information and account details</p>
              </div>
            </div>
            <button
              className={isEditing ? "btn-primary" : "btn-outline"}
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
          <div className="profile-card-content">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input className="input-boxes"
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input className="input-boxes"
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input className="input-boxes"
                  id="role"
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input className="input-boxes"
                  id="department"
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences Card */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-title-section">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div>
                <h2>Notification Preferences</h2>
                <p className="profile-card-description">Choose how you want to receive updates and notifications</p>
              </div>
            </div>
          </div>
          <div className="profile-card-content">
            <div className="notification-item">
              <div>
                <label>Email Notifications</label>
                <p className="item-description">Receive email updates about your tasks and projects</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={() => handleNotificationChange("emailNotifications")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="separator"></div>
            <div className="notification-item">
              <div>
                <label>Push Notifications</label>
                <p className="item-description">Get instant notifications on your device</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={() => handleNotificationChange("pushNotifications")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="separator"></div>
            <div className="notification-item">
              <div>
                <label>Task Reminders</label>
                <p className="item-description">Remind me about upcoming deadlines</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.taskReminders}
                  onChange={() => handleNotificationChange("taskReminders")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="separator"></div>
            <div className="notification-item">
              <div>
                <label>Weekly Reports</label>
                <p className="item-description">Receive weekly summary of your activity</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={() => handleNotificationChange("weeklyReports")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-title-section">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <h2>Change Password</h2>
                <p className="profile-card-description">Update your password to keep your account secure</p>
              </div>
            </div>
          </div>
          <div className="profile-card-content">
            <div className="password-rows">
              <div className="form-group">
                <label htmlFor="current-password">Current Password</label>
                <input className="input-boxes"
                  id="current-password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input className="input-boxes"
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                />  
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input className="input-boxes"
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                />
              </div>

              <div className="password-action">
                <button className="btn-primary btn-full" onClick={handlePasswordChange}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
