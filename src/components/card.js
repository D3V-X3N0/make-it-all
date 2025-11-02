import React from "react"
import "./card.css"

export default function Card({ title, value, color }) {
    return (
        <div className="card">
                <div className="card-stripe" style={{ backgroundColor: color }}></div>
                <div className="card-content">
                    <div className="card-info">
                       <p className="card-title">{title}</p>
                        <p className="card-value">{value}</p> 
                    </div>
                </div>
        </div>
    )
}