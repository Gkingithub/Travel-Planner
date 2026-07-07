import React, { useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import Modal from "./Modal";

function ManageActivities() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      destination: "Pokhara",
      activity: "Boating",
      time: "Morning",
      category: "Adventure",
      cost: "Rs. 500",
      duration: "2 Hours",
    },
    {
      id: 2,
      destination: "Chitwan",
      activity: "Jungle Safari",
      time: "Afternoon",
      category: "Wildlife",
      cost: "Rs. 2500",
      duration: "4 Hours",
    },
    {
      id: 3,
      destination: "Mustang",
      activity: "Monastery Visit",
      time: "Evening",
      category: "Religious",
      cost: "Rs. 300",
      duration: "1 Hour",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // Open Add Activity Form
  const handleAdd = () => {
    setEditingActivity({
      id: Date.now(),
      destination: "",
      activity: "",
      time: "",
      category: "",
      cost: "",
      duration: "",
    });

    setShowModal(true);
  };

  // Save (Add or Edit)
  const handleSave = () => {
    const exists = activities.some(
      (item) => item.id === editingActivity.id
    );

    if (exists) {
      setActivities(
        activities.map((item) =>
          item.id === editingActivity.id ? editingActivity : item
        )
      );
    } else {
      setActivities([...activities, editingActivity]);
    }

    setShowModal(false);
    setEditingActivity(null);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      setActivities(activities.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Destination Activities</h1>

        <button className="add-btn" onClick={handleAdd}>
          + Add Activity
        </button>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Activity</th>
              <th>Time Slot</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.destination}</td>
                <td>{item.activity}</td>
                <td>{item.time}</td>
                <td>{item.category}</td>
                <td>{item.cost}</td>
                <td>{item.duration}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingActivity({ ...item });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && editingActivity && (
          <Modal
            title={
              activities.some((item) => item.id === editingActivity.id)
                ? "Edit Activity"
                : "Add Activity"
            }
            onClose={() => {
              setShowModal(false);
              setEditingActivity(null);
            }}
            onSave={handleSave}
          >
            <label>Destination</label>
            <input
              type="text"
              value={editingActivity.destination}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  destination: e.target.value,
                })
              }
            />

            <label>Activity</label>
            <input
              type="text"
              value={editingActivity.activity}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  activity: e.target.value,
                })
              }
            />

            <label>Time Slot</label>
            <input
              type="text"
              value={editingActivity.time}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  time: e.target.value,
                })
              }
            />

            <label>Category</label>
            <input
              type="text"
              value={editingActivity.category}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  category: e.target.value,
                })
              }
            />

            <label>Cost</label>
            <input
              type="text"
              value={editingActivity.cost}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  cost: e.target.value,
                })
              }
            />

            <label>Duration</label>
            <input
              type="text"
              value={editingActivity.duration}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  duration: e.target.value,
                })
              }
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageActivities;