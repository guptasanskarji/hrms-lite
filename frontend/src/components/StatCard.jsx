import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StatCard({ title, value, icon, trend, trendText, bgGradient }) {
  return (
    <div className="col-md-12 mb-4">
      <div 
        className={`card shadow-sm text-white rounded-4`} 
        style={{ 
          background: bgGradient || "linear-gradient(90deg, #007bff, #00c6ff)", 
          minHeight: "150px" 
        }}
      >
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
          {/* Icon in circle */}
          <div 
            className="d-flex justify-content-center align-items-center mb-3 rounded-circle" 
            style={{ 
              width: "60px", 
              height: "60px", 
              backgroundColor: "rgba(255,255,255,0.2)", 
              fontSize: "1.5rem" 
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <h6 className="fw-semibold mb-1">{title}</h6>

          {/* Value */}
          <h2 className="fw-bold mb-2">{value}</h2>

          {/* Optional trend */}
          {trend && (
            <div className="d-flex align-items-center gap-1" style={{ fontSize: "0.9rem", opacity: 0.9 }}>
              {trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
              <span>{trendText}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
