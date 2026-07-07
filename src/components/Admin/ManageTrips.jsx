import React, { useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import Modal from "./Modal";

function ManageTrips() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      destination: "Pokhara",
      days: 3,
      price: "Rs. 15,000",
    },
    {
      id: 2,
      destination: "Chitwan",
      days: 2,
      price: "Rs. 18,000",
    },
    {
      id: 3,
      destination: "Mustang",
      days: 5,
      price: "Rs. 30,000",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  // Open Add Destination Form
  const handleAdd = () => {
    setEditingTrip({
      id: Date.now(), // Unique ID
      destination: "",
      days: "",
      price: "",
    });
    setShowModal(true);
  };

  // Save (Add or Edit)
  const handleSave = () => {
    const exists = trips.some((trip) => trip.id === editingTrip.id);

    if (exists) {
      // Edit
      setTrips(
        trips.map((trip) =>
          trip.id === editingTrip.id ? editingTrip : trip
        )
      );
    } else {
      // Add
      setTrips([...trips, editingTrip]);
    }

    setShowModal(false);
    setEditingTrip(null);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      setTrips(trips.filter((trip) => trip.id !== id));
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Destinations</h1>

        <button className="add-btn" onClick={handleAdd}>
          + Add Destination
        </button>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.id}</td>
                <td>{trip.destination}</td>
                <td>{trip.days} Days</td>
                <td>{trip.price}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingTrip({ ...trip });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(trip.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && editingTrip && (
          <Modal
            title={
              trips.some((trip) => trip.id === editingTrip.id)
                ? "Edit Destination"
                : "Add Destination"
            }
            onClose={() => {
              setShowModal(false);
              setEditingTrip(null);
            }}
            onSave={handleSave}
          >
            <label>Destination</label>
            <input
              type="text"
              value={editingTrip.destination}
              onChange={(e) =>
                setEditingTrip({
                  ...editingTrip,
                  destination: e.target.value,
                })
              }
            />

            <label>Duration (Days)</label>
            <input
              type="number"
              value={editingTrip.days}
              onChange={(e) =>
                setEditingTrip({
                  ...editingTrip,
                  days: Number(e.target.value),
                })
              }
            />

            <label>Price</label>
            <input
              type="text"
              value={editingTrip.price}
              onChange={(e) =>
                setEditingTrip({
                  ...editingTrip,
                  price: e.target.value,
                })
              }
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageTrips;