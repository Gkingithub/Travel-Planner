import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import Modal from "./Modal";
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
      setRecommendations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDestinations = async () => {
    try {
      const response = await getDestinations();
      setDestinations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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

                  <td>{item.destination?.destinationName}</td>

                  <td>{item.adventure ? "✓" : "✗"}</td>
                  <td>{item.nature ? "✓" : "✗"}</td>
                  <td>{item.wildlife ? "✓" : "✗"}</td>
                  <td>{item.religious ? "✓" : "✗"}</td>
                  <td>{item.culture ? "✓" : "✗"}</td>
                  <td>{item.luxury ? "✓" : "✗"}</td>
                  <td>{item.trekking ? "✓" : "✗"}</td>

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
            <label>Destination</label>

            <select
              value={editingData.destinationId}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  destinationId: Number(e.target.value),
                })
              }
            >
              <option value="">Select Destination</option>

              {destinations.map((d) => (
                <option
                  key={d.destinationId}
                  value={d.destinationId}
                >
                  {d.destinationName}
                </option>
              ))}
            </select>

            <label>
              <input
                type="checkbox"
                checked={editingData.adventure}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    adventure: e.target.checked,
                  })
                }
              />
              Adventure
            </label>

            <label>
              <input
                type="checkbox"
                checked={editingData.nature}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    nature: e.target.checked,
                  })
                }
              />
              Nature
            </label>

            <label>
              <input
                type="checkbox"
                checked={editingData.wildlife}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    wildlife: e.target.checked,
                  })
                }
              />
              Wildlife
            </label>

            <label>
              <input
                type="checkbox"
                checked={editingData.religious}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    religious: e.target.checked,
                  })
                }
              />
              Religious
            </label>

            <label>
              <input
                type="checkbox"
                checked={editingData.culture}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    culture: e.target.checked,
                  })
                }
              />
              Culture
            </label>

            <label>
              <input
                type="checkbox"
                checked={editingData.luxury}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    luxury: e.target.checked,
                  })
                }
              />
              Luxury
            </label>

            <label>
              <input
                type="checkbox"
                checked={editingData.trekking}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    trekking: e.target.checked,
                  })
                }
              />
              Trekking
            </label>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageRecommendations;