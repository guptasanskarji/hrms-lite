import React from "react";

export default function StatCard({ title, value, icon, bg }) {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card text-white ${bg} shadow-sm`}>
        <div className="card-body text-center">
          <div className="mb-2 fs-2">{icon}</div>
          <h5>{title}</h5>
          <h3>{value}</h3>
        </div>
      </div>
    </div>
  );
}
