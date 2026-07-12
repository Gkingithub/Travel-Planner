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
  const [showModal, setShowModal] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      const response = await getDestinations();

      if (response.success) {
        setDestinations(response.data);
      } else {
        setDestinations([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    setEditingDestination({
      destinationId: 0,
      name: "",
      city: "",
      country: "",
      description: "",
      averageBudget: "",
      imageUrl: null,
    });

    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingDestination.destinationId > 0) {
        await updateDestination(
          editingDestination.destinationId,
          editingDestination
        );
      } else {
        await createDestination(editingDestination);
      }

      setShowModal(false);
      loadDestinations();
    } catch (error) {
      console.log(error);
    }
  };

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

        <div className="button-container">
          <button
            type="button"
            className="add-user-btn"
            onClick={handleAdd}
          >
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
              destinations.map((destination) => (
                <tr key={destination.destinationId}>
                  <td>{destination.destinationId}</td>

                  <td>{destination.name}</td>

                  <td>{destination.city}</td>

                  <td>{destination.country}</td>

                  <td>{destination.averageBudget}</td>

                  <td>
                    {destination.imageUrl && (
                      <img
                        src={`http://localhost:5055${destination.imageUrl}`}
                        alt={destination.name}
                        width="70"
                        height="50"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingDestination({
                          ...destination,
                        });

                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(destination.destinationId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No destinations found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && editingDestination && (
          <Modal
            title={
              editingDestination.destinationId
                ? "Edit Destination"
                : "Add Destination"
            }
            onClose={() => {
              setShowModal(false);
              setEditingDestination(null);
            }}
            onSave={handleSave}
          >            <label>Name</label>
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

            <label>Description</label>
            <textarea
              rows="4"
              value={editingDestination.description}
              onChange={(e) =>
                setEditingDestination({
                  ...editingDestination,
                  description: e.target.value,
                })
              }
            />

            <label>Average Budget</label>
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

            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditingDestination({
                  ...editingDestination,
                  imageUrl: e.target.files[0],
                })
              }
            />

            {editingDestination.imageUrl &&
              typeof editingDestination.imageUrl === "string" && (
                <img
                  src={`http://localhost:5055${editingDestination.imageUrl}`}
                  alt="Destination"
                  width="120"
                  style={{
                    marginTop: "10px",
                    borderRadius: "6px",
                  }}
                />
              )}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageDestination;