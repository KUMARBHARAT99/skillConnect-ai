import React from "react";

const WorkersList = ({ workers }) => {
  return (
    <div className="workers-list">
      {workers.length === 0 ? (
        <p>No workers found.</p>
      ) : (
        workers.map((worker) => (
          <div key={worker.id} className="worker-card">
            <h3>{worker.name}</h3>
            <p>Category: {worker.category}</p>
            <p>Location: {worker.location}</p>
            <p>Rating: ⭐ {worker.rating}</p>
            <button>Contact</button>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkersList;
