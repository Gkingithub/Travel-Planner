import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import Modal from "../../components/modal";

import {
  getDestinationFeatures,
  createDestinationFeature,
  updateDestinationFeature,
  deleteDestinationFeature,
} from "../../service/destinationFeatureService";

import { getDestinations } from "../../service/destinationService";

function ManageRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const delay = setTimeout(() => {
      loadRecommendations();
      loadDestinations();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const loadRecommendations = async () => {
    try {
      const response = await getDestinationFeatures(search);

      if (response.success) {
        setRecommendations(response.data);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadDestinations = async () => {
    try {
      const response = await getDestinations();

      if (response.success) {
        setDestinations(response.data);
      } else {
        setDestinations([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Options for react-select
  const destinationOptions = destinations.map((d) => ({
    value: d.destinationId,
    label: d.name,
  }));

  const handleAdd = () => {
    setEditingData({
      destinationFeatureId: 0,
      destinationId: "",
      adventure: 0,
      nature: 0,
      wildlife: 0,
      religious: 0,
      culture: 0,
      luxury: 0,
      trekking: 0,
    });

    setShowModal(true);
  };

  const handleSave = async () => {
    const validationErrors = {};

    if (!editingData.destinationId) {
      validationErrors.destinationId = "Destination is required.";
    }

    const features = [
      "adventure",
      "nature",
      "wildlife",
      "religious",
      "culture",
      "luxury",
      "trekking",
    ];

    features.forEach((field) => {
      const value = Number(editingData[field]);

      if (value !== 0 && value !== 1) {
        validationErrors[field] = "Value must be 0 or 1.";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const payload = {
        destinationFeatureId: editingData.destinationFeatureId,
        destinationId: Number(editingData.destinationId),
        adventure: Number(editingData.adventure),
        nature: Number(editingData.nature),
        wildlife: Number(editingData.wildlife),
        religious: Number(editingData.religious),
        culture: Number(editingData.culture),
        luxury: Number(editingData.luxury),
        trekking: Number(editingData.trekking),
      };

      if (payload.destinationFeatureId > 0) {
        await updateDestinationFeature(payload.destinationFeatureId, payload);
      } else {
        await createDestinationFeature(payload);
      }

      loadRecommendations();
      setShowModal(false);
      setEditingData(null);
      setErrors({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this destination feature?",
      )
    )
      return;

    try {
      await deleteDestinationFeature(id);
      await loadRecommendations();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Destination Features</h1>
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

          <button type="button" className="add-user-btn" onClick={handleAdd}>
            Add Feature
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Adventure</th>
              <th>Nature</th>
              <th>Wildlife</th>
              <th>Religious</th>
              <th>Culture</th>
              <th>Luxury</th>
              <th>Trekking</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {recommendations.length > 0 ? (
              recommendations.map((item,index) => (
                <tr key={item.destinationFeatureId}>
                <td>{index + 1}</td>

                  <td>{item.destinationName}</td>

                  <td>{item.adventure}</td>
                  <td>{item.nature}</td>
                  <td>{item.wildlife}</td>
                  <td>{item.religious}</td>
                  <td>{item.culture}</td>
                  <td>{item.luxury}</td>
                  <td>{item.trekking}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingData({
                          ...item,
                        });

                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.destinationFeatureId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No destination features found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && editingData && (
          <Modal
            title={
              editingData.destinationFeatureId
                ? "Edit Destination Feature"
                : "Add Destination Feature"
            }
            onClose={() => {
              setShowModal(false);
              setEditingData(null);
            }}
            onSave={handleSave}
          >
            {" "}
            <label>Destination</label>
            <Select
              options={destinationOptions}
              placeholder="Search destination..."
              isSearchable
              value={
                destinationOptions.find(
                  (option) => option.value === editingData.destinationId,
                ) || null
              }
              onChange={(selectedOption) =>
                setEditingData({
                  ...editingData,
                  destinationId: selectedOption ? selectedOption.value : "",
                })
              }
            />
            <label>Adventure</label>
            <input
              type="number"
              min="0"
              max="1"
              value={editingData.adventure}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  adventure: Number(e.target.value),
                })
              }
            />
            {errors.adventure && <p className="error">{errors.adventure}</p>}
            <label>Nature</label>
            <input
              type="number"
              min="0"
              max="1"
              value={editingData.nature}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  nature: Number(e.target.value),
                })
              }
            />
            {errors.adventure && <p className="error">{errors.nature}</p>}
            <label>Wildlife</label>
            <input
              type="number"
              min="0"
              max="1"
              value={editingData.wildlife}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  wildlife: Number(e.target.value),
                })
              }
            />
            {errors.wildlife && <p className="error">{errors.wildlife}</p>}
            <label>Religious</label>
            <input
              type="number"
              min="0"
              max="1"
              value={editingData.religious}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  religious: Number(e.target.value),
                })
              }
            />
            {errors.religious && <p className="error">{errors.religious}</p>}
            <label>Culture</label>
            <input
              type="number"
              min="0"
              max="1"
              value={editingData.culture}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  culture: Number(e.target.value),
                })
              }
            />
            {errors.culture && <p className="error">{errors.culture}</p>}
            <label>Luxury</label>
            <input
              type="number"
              min="0"
              max="1"
              value={editingData.luxury}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  luxury: Number(e.target.value),
                })
              }
            />
            {errors.luxury && <p className="error">{errors.luxury}</p>}
            <label>Trekking</label>
            <input
              type="number"
              min="0"
              max="1"
              value={editingData.trekking}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  trekking: Number(e.target.value),
                })
              }
            />
            {errors.trekking && <p className="error">{errors.trekking}</p>}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageRecommendations;
