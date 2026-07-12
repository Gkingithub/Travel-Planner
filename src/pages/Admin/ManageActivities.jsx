import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import Modal from "../../components/modal";

import { getDestinations } from "../../service/destinationService";
import { getDestinationFeatures } from "../../service/destinationFeatureService";

import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../../service/destinationActivityService";

function ManageActivities() {
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [destinationFeatures, setDestinationFeatures] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    loadActivities();
    loadDestinations();
    loadDestinationFeatures();
  }, []);

  // ============================
  // Load Activities
  // ============================
  const loadActivities = async () => {
    try {
      const response = await getActivities();

      if (response.success) {
        setActivities(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // Load Destinations
  // ============================
  const loadDestinations = async () => {
    try {
      const response = await getDestinations();

      if (response.success) {
        setDestinations(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // Load Destination Features
  // ============================
  const loadDestinationFeatures = async () => {
    try {
      const response = await getDestinationFeatures();

      if (response.success) {
        setDestinationFeatures(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // Add Activity
  // ============================
  const handleAdd = () => {
    setEditingActivity({
      destinationActivityId: 0,
      destinationId: "",
      activityName: "",
      category: "",
      timeSlot: "",
      estimatedCost: "",
      durationHours: "",
      imageUrl: "",
    });

    setShowModal(true);
  };

  // ============================
  // Save Activity
  // ============================
  const handleSave = async () => {
    try {
      if (editingActivity.destinationActivityId > 0) {
        await updateActivity(
          editingActivity.destinationActivityId,
          editingActivity
        );
      } else {
        await createActivity(editingActivity);
      }

      setShowModal(false);
      setEditingActivity(null);

      loadActivities();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // Delete Activity
  // ============================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;

    try {
      await deleteActivity(id);
      loadActivities();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // Filter Categories
  // ============================
  const selectedFeature = destinationFeatures.find(
    (x) => x.destinationId === Number(editingActivity?.destinationId)
  );

  const categories = [];

  if (selectedFeature) {
    if (selectedFeature.adventure) categories.push("Adventure");
    if (selectedFeature.cultural) categories.push("Cultural");
    if (selectedFeature.nature) categories.push("Nature");
    if (selectedFeature.historical) categories.push("Historical");
    if (selectedFeature.wildlife) categories.push("Wildlife");
    if (selectedFeature.religious) categories.push("Religious");
    if (selectedFeature.nightLife) categories.push("Night Life");
    if (selectedFeature.shopping) categories.push("Shopping");
    if (selectedFeature.photography) categories.push("Photography");
    if (selectedFeature.hiking) categories.push("Hiking");
    if (selectedFeature.boating) categories.push("Boating");
    if (selectedFeature.paragliding) categories.push("Paragliding");
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">

        <h1>Manage Destination Activities</h1>

        <div className="button-container">
          <button
            className="add-user-btn"
            onClick={handleAdd}
          >
            Add Activity
          </button>
        </div>

        <table className="admin-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Activity</th>
              <th>Category</th>
              <th>Time Slot</th>
              <th>Cost</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {activities.length > 0 ? (
              activities.map((item) => (
                <tr key={item.destinationActivityId}>

                  <td>{item.destinationActivityId}</td>

                  <td>{item.destinationName}</td>

                  <td>{item.activityName}</td>

                  <td>{item.category}</td>

                  <td>{item.timeSlot}</td>

                  <td>{item.estimatedCost}</td>

                  <td>{item.durationHours} hrs</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingActivity({
                          ...item,
                        });

                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(item.destinationActivityId)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  No activities found.
                </td>
              </tr>
            )}

          </tbody>

        </table>        {showModal && editingActivity && (
          <Modal
            title={
              editingActivity.destinationActivityId > 0
                ? "Edit Activity"
                : "Add Activity"
            }
            onClose={() => {
              setShowModal(false);
              setEditingActivity(null);
            }}
            onSave={handleSave}
          >
            {/* Destination */}

            <label>Destination</label>

            <select
              value={editingActivity.destinationId}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  destinationId: Number(e.target.value),
                  category: "", // Reset category when destination changes
                })
              }
            >
              <option value="">Select Destination</option>

              {destinations.map((destination) => (
                <option
                  key={destination.destinationId}
                  value={destination.destinationId}
                >
                  {destination.name}
                </option>
              ))}
            </select>

            {/* Category */}

            <label>Category</label>

            <select
              value={editingActivity.category}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Activity Name */}

            <label>Activity Name</label>

            <input
              type="text"
              value={editingActivity.activityName}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  activityName: e.target.value,
                })
              }
            />

            {/* Time Slot */}

            <label>Time Slot</label>

            <input
              type="text"
              placeholder="Morning"
              value={editingActivity.timeSlot}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  timeSlot: e.target.value,
                })
              }
            />

            {/* Estimated Cost */}

            <label>Estimated Cost</label>

            <input
              type="number"
              value={editingActivity.estimatedCost}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  estimatedCost: e.target.value,
                })
              }
            />

            {/* Duration */}

            <label>Duration (Hours)</label>

            <input
              type="number"
              value={editingActivity.durationHours}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  durationHours: e.target.value,
                })
              }
            />

            {/* Image URL */}

            <label>Image URL</label>

            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={editingActivity.imageUrl || ""}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  imageUrl: e.target.value,
                })
              }
            />

            {editingActivity.imageUrl && (
              <img
                src={editingActivity.imageUrl}
                alt="Activity"
                width="150"
                style={{
                  marginTop: "10px",
                  borderRadius: "6px",
                  objectFit: "cover",
                }}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageActivities;