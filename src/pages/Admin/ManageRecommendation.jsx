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

  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    loadRecommendations();
    loadDestinations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const response = await getDestinationFeatures();

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
      adventure: false,
      nature: false,
      wildlife: false,
      religious: false,
      culture: false,
      luxury: false,
      trekking: false,
    });

    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingData.destinationFeatureId > 0) {
        await updateDestinationFeature(
          editingData.destinationFeatureId,
          editingData
        );
      } else {
        await createDestinationFeature(editingData);
      }

      await loadRecommendations();

      setShowModal(false);
      setEditingData(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this destination feature?"
      )
    )
      return;

    try {
      await deleteDestinationFeature(id);
      await loadRecommendations();
    } catch (err) {
      console.log(err);
    }
  };  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Destination Features</h1>

        <div className="button-container">
          <button
            type="button"
            className="add-user-btn"
            onClick={handleAdd}
          >
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
              recommendations.map((item) => (
                <tr key={item.destinationFeatureId}>
                  <td>{item.destinationFeatureId}</td>

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
                      onClick={() =>
                        handleDelete(item.destinationFeatureId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">
                  No destination features found.
                </td>
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
          >            <label>Destination</label>

            <Select
              options={destinationOptions}
              placeholder="Search destination..."
              isSearchable
              value={
                destinationOptions.find(
                  (option) =>
                    option.value === editingData.destinationId
                ) || null
              }
              onChange={(selectedOption) =>
                setEditingData({
                  ...editingData,
                  destinationId: selectedOption
                    ? selectedOption.value
                    : "",
                })
              }
            />

            <label>Adventure</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editingData.adventure}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  adventure: Number(e.target.value),
                })
              }
            />

            <label>Nature</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editingData.nature}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  nature: Number(e.target.value),
                })
              }
            />

            <label>Wildlife</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editingData.wildlife}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  wildlife: Number(e.target.value),
                })
              }
            />

            <label>Religious</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editingData.religious}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  religious: Number(e.target.value),
                })
              }
            />

            <label>Culture</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editingData.culture}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  culture: Number(e.target.value),
                })
              }
            />

            <label>Luxury</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editingData.luxury}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  luxury: Number(e.target.value),
                })
              }
            />

            <label>Trekking</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editingData.trekking}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  trekking: Number(e.target.value),
                })
              }
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageRecommendations;