import React from "react";
import "./aurora.css";

export default function AuroraBackground({ children, className = "" }) {
  return (
    <div className={`aurora-wrapper ${className}`}>
      <div className="aurora-layer">
        <div className="aurora-blob" style={{ top: "-10%", left: "-10%" }} />
        <div className="aurora-blob" style={{ top: "10%", right: "-15%" }} />
        <div className="aurora-blob" style={{ bottom: "-10%", left: "5%" }} />
        <div className="aurora-blob" style={{ bottom: "5%", right: "0%" }} />
      </div>
      <div className="aurora-content">{children}</div>
    </div>
  );
}
