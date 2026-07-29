import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import Modal from "../../components/modal";

import {
  getDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../../service/destinationService";

function ManageDestination() {
  const [destinations, setDestinations] = useState([]);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingDestination, setEditingDestination] = useState(null);

  useEffect(() => {
    loadDestinations();
  }, [search]);

  // ==========================
  // Load Destinations
  // ==========================

  const loadDestinations = async () => {
    try {
      const response = await getDestinations(search);

      if (response.success) {
        setDestinations(response.data);
      } else {
        setDestinations([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Add Destination
  // ==========================

  const handleAdd = () => {
    setEditingDestination({
      destinationId: 0,
      name: "",
      city: "",
      country: "",
      description: "",
      averageBudget: "",
      imageUrl: "",
      image: null,
    });

    setShowModal(true);
  };

  // ==========================
  // Save Destination
  // ==========================

  const handleSave = async () => {
    const validationErrors = {};

    if (!editingDestination.name.trim()) {
      validationErrors.name = "Destination name is required.";
    } else if (editingDestination.name.trim().length < 3) {
      validationErrors.name = "Destination name must be at least 3 characters.";
    }

    if (!editingDestination.city.trim()) {
      validationErrors.city = "City is required.";
    }

    if (!editingDestination.country.trim()) {
      validationErrors.country = "Country is required.";
    }

    if (!editingDestination.description.trim()) {
      validationErrors.description = "Description is required.";
    } else if (editingDestination.description.trim().length < 20) {
      validationErrors.description =
        "Description must be at least 20 characters.";
    }

    if (
      editingDestination.averageBudget === "" ||
      Number(editingDestination.averageBudget) <= 0
    ) {
      validationErrors.averageBudget = "Average budget must be greater than 0.";
    }

    if (editingDestination.destinationId === 0 && !editingDestination.image) {
      validationErrors.image = "Please select a destination image.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const formData = new FormData();

      formData.append("name", editingDestination.name.trim());
      formData.append("city", editingDestination.city.trim());
      formData.append("country", editingDestination.country.trim());
      formData.append("description", editingDestination.description.trim());
      formData.append("averageBudget", editingDestination.averageBudget);

      if (editingDestination.image) {
        formData.append("image", editingDestination.image);
      }

      if (editingDestination.destinationId > 0) {
        await updateDestination(editingDestination.destinationId, formData);
      } else {
        await createDestination(formData);
      }

      setShowModal(false);
      setEditingDestination(null);
      setErrors({});
      loadDestinations();
    } catch (error) {
      console.log(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  // ==========================
  // Delete Destination
  // ==========================

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;

    try {
      await deleteDestination(id);

      loadDestinations();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Destinations</h1>
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
            placeholder="Search by destination, city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "350px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <button className="add-user-btn" onClick={handleAdd}>
            Add Destination
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Budget</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {destinations.length > 0 ? (
              destinations.map((destination,index) => (
                <tr key={destination.destinationId}>
                 <td>{index + 1}</td>

                  <td>{destination.name}</td>

                  <td>{destination.city}</td>

                  <td>{destination.country}</td>

                  <td>Rs. {destination.averageBudget}</td>

                  <td>
                    {destination.imageUrl ? (
                      <img
                        src={`http://localhost:5055${destination.imageUrl}`}
                        alt={destination.name}
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
                        setEditingDestination({
                          ...destination,
                          image: null,
                        });

                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(destination.destinationId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No destinations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>{" "}
        {showModal && editingDestination && (
          <Modal
            title={
              editingDestination.destinationId > 0
                ? "Edit Destination"
                : "Add Destination"
            }
            onClose={() => {
              setShowModal(false);
              setEditingDestination(null);
            }}
            onSave={handleSave}
          >
            {/* Name */}

            <label>Name</label>

            <input
              type="text"
              value={editingDestination.name}
              onChange={(e) =>
                setEditingDestination({
                  ...editingDestination,
                  name: e.target.value,
                })
              }
            />
            {errors.name && <p className="error">{errors.name}</p>}

            {/* City */}

            <label>City</label>

            <input
              type="text"
              value={editingDestination.city}
              onChange={(e) =>
                setEditingDestination({
                  ...editingDestination,
                  city: e.target.value,
                })
              }
            />
            {errors.city && <p className="error">{errors.city}</p>}

            {/* Country */}

            <label>Country</label>

            <input
              type="text"
              value={editingDestination.country}
              onChange={(e) =>
                setEditingDestination({
                  ...editingDestination,
                  country: e.target.value,
                })
              }
            />

            {errors.country && <p className="error">{errors.country}</p>}
            {/* Description */}

            <label>Description</label>

            <textarea
              className="form-textarea"
              maxLength={500}
              placeholder="Enter destination description..."
              value={editingDestination.description}
              onChange={(e) =>
                setEditingDestination({
                  ...editingDestination,
                  description: e.target.value,
                })
              }
            />

            <div className="textarea-footer">
              <span>
                Describe the destination, attractions, activities, and travel
                experience.
              </span>

              <span>{editingDestination.description.length}/500</span>
            </div>

            {errors.description && (
              <p className="error">{errors.description}</p>
            )}

            {/* Budget */}

            <label>Average Budget (Rs.)</label>

            <input
              type="number"
              value={editingDestination.averageBudget}
              onChange={(e) =>
                setEditingDestination({
                  ...editingDestination,
                  averageBudget: e.target.value,
                })
              }
            />

            {errors.averageBudget && (
              <p className="error">{errors.averageBudget}</p>
            )}
            {/* Image Upload */}

            <label>Destination Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setEditingDestination({
                    ...editingDestination,
                    image: file,
                    imageUrl: URL.createObjectURL(file),
                  });
                }
              }}
            />

            {/* Image Preview */}

            {editingDestination.imageUrl && (
              <div
                style={{
                  marginTop: "15px",
                  textAlign: "center",
                }}
              >
                <img
                  src={
                    editingDestination.imageUrl.startsWith("blob:")
                      ? editingDestination.imageUrl
                      : `http://localhost:5055${editingDestination.imageUrl}`
                  }
                  alt="Destination Preview"
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
            {errors.image && <p className="error">{errors.image}</p>}
          </Modal>
        )}{" "}
      </div>
    </div>
  );
}

export default ManageDestination;
