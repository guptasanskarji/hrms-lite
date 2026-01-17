import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="text-center my-5">
      <h5 className="text-muted">{message}</h5>
    </div>
  );
}
