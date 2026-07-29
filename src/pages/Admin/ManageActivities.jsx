import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import Modal from "../../components/modal";
import {BsPencilSquare ,BsTrash} from "react-icons/bs";
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
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [destinationFeatures, setDestinationFeatures] = useState([]);

  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    loadActivities();
    loadDestinations();
    loadDestinationFeatures();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredActivities(activities);
    } else {
      const keyword = search.toLowerCase();

      setFilteredActivities(
        activities.filter((item) =>
          item.destinationName.toLowerCase().includes(keyword),
        ),
      );
    }
  }, [activities, search]);

  const loadActivities = async () => {
    try {
      const response = await getActivities();

      if (response.success) {
        setActivities(response.data);
        setFilteredActivities(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      imageFile: null,
    });

    setShowModal(true);
  };

  const handleSave = async () => {
    const validationErrors = {};

    // Destination
    if (!editingActivity.destinationId) {
      validationErrors.destinationId = "Destination is required.";
    }

    // Category
    if (!editingActivity.category.trim()) {
      validationErrors.category = "Category is required.";
    }

    // Activity Name
    if (!editingActivity.activityName.trim()) {
      validationErrors.activityName = "Activity name is required.";
    } else if (editingActivity.activityName.length < 3) {
      validationErrors.activityName =
        "Activity name must be at least 3 characters.";
    }

    // Time Slot
    if (!editingActivity.timeSlot) {
      validationErrors.timeSlot = "Time slot is required.";
    }

    // Cost
    if (
      editingActivity.estimatedCost === "" ||
      Number(editingActivity.estimatedCost) <= 0
    ) {
      validationErrors.estimatedCost = "Estimated cost must be greater than 0.";
    }

    // Duration
    if (
      editingActivity.durationHours === "" ||
      Number(editingActivity.durationHours) <= 0
    ) {
      validationErrors.durationHours = "Duration must be greater than 0.";
    }

    // Image Required Only While Adding
    if (
      editingActivity.destinationActivityId === 0 &&
      !editingActivity.imageFile
    ) {
      validationErrors.imageFile = "Please select an activity image.";
    }

    // Stop if errors exist
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const formData = new FormData();

      formData.append("destinationId", editingActivity.destinationId);
      formData.append("activityName", editingActivity.activityName.trim());
      formData.append("category", editingActivity.category);
      formData.append("timeSlot", editingActivity.timeSlot);
      formData.append("estimatedCost", editingActivity.estimatedCost);
      formData.append("durationHours", editingActivity.durationHours);

      if (editingActivity.imageFile) {
        formData.append("imageFile", editingActivity.imageFile);
      }

      if (editingActivity.destinationActivityId > 0) {
        await updateActivity(editingActivity.destinationActivityId, formData);
      } else {
        await createActivity(formData);
      }

      setShowModal(false);
      setEditingActivity(null);
      setErrors({});
      loadActivities();
    } catch (error) {
      console.log(error);
    }
  };

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

  const selectedFeature = destinationFeatures.find(
    (x) => x.destinationId === Number(editingActivity?.destinationId),
  );

  const categories = selectedFeature
    ? Object.entries({
        Adventure: selectedFeature.adventure,
        Nature: selectedFeature.nature,
        Culture: selectedFeature.culture,
        Luxury: selectedFeature.luxury,
        Wildlife: selectedFeature.wildlife,
        Trekking: selectedFeature.trekking,
        Religious: selectedFeature.religious,
      })
        .filter(([_, value]) => value)
        .map(([key]) => key)
    : [];
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Destination Activities</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search by destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "320px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <button className="add-user-btn" onClick={handleAdd}>
            Add Activity
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Activity</th>
            
              <th>Time Slot</th>
              <th>Cost</th>
              <th>Duration</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((item,index) => (
                <tr key={item.destinationActivityId}>
                 <td>{index + 1}</td>

                  <td>{item.destinationName}</td>

                  <td>{item.activityName}</td>

          

                  <td>{item.timeSlot}</td>

                  <td>Rs. {item.estimatedCost}</td>

                  <td>{item.durationHours} hrs</td>

                  <td>
                    {item.imageUrl ? (
                      <img
                        src={`http://localhost:5055${item.imageUrl}`}
                        alt={item.activityName}
                        style={{
                          width: "70px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid #ddd",
                        }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingActivity({
                          ...item,
                          imageFile: null,
                        });

                        setShowModal(true);
                      }}
                    >
                      <BsPencilSquare />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.destinationActivityId)}
                    >
                        <BsTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No activities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && editingActivity && (
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
                  category: "",
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

            {errors.destinationId && (
              <p className="error">{errors.destinationId}</p>
            )}

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
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && <p className="error">{errors.category}</p>}

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

            {errors.activityName && (
              <p className="error">{errors.activityName}</p>
            )}

            {/* Time Slot */}

            <label>Time Slot</label>

            <select
              value={editingActivity.timeSlot}
              onChange={(e) =>
                setEditingActivity({
                  ...editingActivity,
                  timeSlot: e.target.value,
                })
              }
            >
              <option value="">Select Time Slot</option>
              <option value="Early Morning">Early Morning</option>
              <option value="Morning">Morning</option>
              <option value="Late Morning">Late Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
              <option value="Full Day">Full Day</option>
            </select>

            {errors.timeSlot && <p className="error">{errors.timeSlot}</p>}
            {/* Estimated Cost */}

            <label>Estimated Cost (Rs.)</label>

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

            {errors.estimatedCost && (
              <p className="error">{errors.estimatedCost}</p>
            )}

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

            {errors.durationHours && (
              <p className="error">{errors.durationHours}</p>
            )}
            {/* Image Upload */}

            <label>Activity Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  const file = e.target.files[0];

                  setEditingActivity({
                    ...editingActivity,
                    imageFile: file,
                    imageUrl: URL.createObjectURL(file),
                  });

                  setErrors({
                    ...errors,
                    imageFile: "",
                  });
                }
              }}
            />

            {errors.imageFile && <p className="error">{errors.imageFile}</p>}

            {/* Preview */}

            {editingActivity.imageUrl && (
              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <img
                  src={
                    editingActivity.imageFile
                      ? editingActivity.imageUrl
                      : `http://localhost:5055${editingActivity.imageUrl}`
                  }
                  alt="Preview"
                  style={{
                    width: "220px",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageActivities;
