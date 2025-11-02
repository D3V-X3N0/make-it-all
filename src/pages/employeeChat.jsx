import React from "react";
import "../pages/employeeBase.css";
import "../pages/employeeChat.css";

export default function EmployeeChat() {
  return (
    <div className="employee-content">
      <h2 style={{ margin: "0 0 20px 0" }}>Team Chat</h2>
      <div className="employee-twoCols">
        <div className="employee-panel employee-sidebar-panel">
          <div className="employee-panelTitle">Sections</div>
          <div className="employee-sectionButtons">
            <button className="employee-btn employee-btn-small" disabled>
              General
            </button>
            <button className="employee-btn employee-btn-small" disabled>
              Announcements
            </button>
            <button className="employee-btn employee-btn-small" disabled>
              Updates
            </button>
          </div>
          <div
            className="employee-panelTitle"
            style={{ marginTop: 20 }}
          >
            General Discussions
          </div>
          <button className="employee-btn employee-btn-full" style={{ marginTop: "10px" }} disabled>
            New Discussion
          </button>
          <ul className="employee-discussionList">
            <li>
              <button className="employee-btn employee-btn-discussion" disabled>
                Dev environment tips
              </button>
            </li>
          </ul>
        </div>

        <div className="employee-panel employee-chat-panel">
          <div className="employee-panelTitle">Dev environment tips</div>
          <div className="employee-chatMessages">
            <div className="employee-note" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 4 }}>Chris Stokes</div>
              <div>
                If npm is weird, try <code>npm ci</code> after cleaning node_modules.
              </div>
            </div>
            <div className="employee-note" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 4 }}>Sarah Lee</div>
              <div>Design tokens updated, please use v3 palette.</div>
            </div>
          </div>
          <div className="employee-chatInput">
            <textarea
              className="employee-textarea"
              placeholder="Write a message..."
              disabled
              rows={3}
            />
            <button className="employee-btn employee-btn-send" disabled style={{ marginTop: "10px" }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

