import React from "react";

export default function Loader({ message = "Loading, please wait..." }) {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.8)",
        zIndex: 1050,
      }}
    >
      {/* Spinner */}
      <div 
        className="spinner-border" 
        role="status" 
        style={{
          width: "4rem",
          height: "4rem",
          borderWidth: "0.4rem",
          borderTopColor: "#007bff",
          borderRightColor: "#00c6ff",
          animation: "spin 1s linear infinite"
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      {/* Loading message */}
      <div className="mt-3 fw-semibold text-primary" style={{ fontSize: "1.1rem" }}>
        {message}
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
