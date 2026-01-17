import React from "react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
