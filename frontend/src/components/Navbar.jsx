import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand with logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">

          <span className="fw-bold">Human Resource Management System</span>
        </Link>

        {/* Toggler */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className="nav-link fw-medium text-white mx-2" 
                to="/"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link fw-medium text-white mx-2" 
                to="/employees"
              >
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link fw-medium text-white mx-2" 
                to="/attendance"
              >
                Attendance
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
