import React from "react";
import { Button } from "react-bootstrap";
import { FaInbox } from "react-icons/fa";

export default function EmptyState({ 
  message = "No records found", 
  subMessage = "There is nothing to display here.", 
  actionLabel, 
  onAction 
}) {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center text-center p-5" 
      style={{ color: "#6c757d" }}
    >
      {/* Icon */}
      <div className="mb-3" style={{ fontSize: "4rem", color: "#adb5bd" }}>
        <FaInbox />
      </div>

      {/* Main message */}
      <h4 className="fw-bold mb-2">{message}</h4>
      
      {/* Sub message */}
      <p className="mb-3">{subMessage}</p>

      {/* Optional action button */}
      {actionLabel && onAction && (
        <Button 
          variant="primary" 
          onClick={onAction} 
          className="rounded-pill px-4"
          style={{ background: "linear-gradient(90deg, #007bff, #00c6ff)", border: "none" }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
