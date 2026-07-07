import React, { useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import Modal from "./Modal";

function ManageRecommendations() {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      destination: "Pokhara",
      adventure: true,
      nature: true,
      wildlife: false,
      religious: false,
      cultural: true,
      luxury: false,
      budget: true,
    },
    {
      id: 2,
      destination: "Chitwan",
      adventure: true,
      nature: true,
      wildlife: true,
      religious: false,
      cultural: false,
      luxury: false,
      budget: false,
    },
    {
      id: 3,
      destination: "Mustang",
      adventure: true,
      nature: true,
      wildlife: false,
      religious: true,
      cultural: true,
      luxury: true,
      budget: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const handleAdd = () => {
    setEditingData({
      id: Date.now(),
      destination: "",
      adventure: false,
      nature: false,
      wildlife: false,
      religious: false,
      cultural: false,
      luxury: false,
      budget: false,
    });

    setShowModal(true);
  };

  const handleSave = () => {
    const exists = recommendations.some(
      (item) => item.id === editingData.id
    );

    if (exists) {
      setRecommendations(
        recommendations.map((item) =>
          item.id === editingData.id ? editingData : item
        )
      );
    } else {
      setRecommendations([...recommendations, editingData]);
    }

    setShowModal(false);
    setEditingData(null);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this recommendation data?"
      )
    ) {
      setRecommendations(
        recommendations.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Recommendation Data</h1>

        <div className="add-btn-container">
          <button className="add-btn" onClick={handleAdd}>
            + Add Recommendation Data
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
              <th>Cultural</th>
              <th>Luxury</th>
              <th>Budget</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {recommendations.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.destination}</td>
                <td>{item.adventure ? "✓" : "✗"}</td>
                <td>{item.nature ? "✓" : "✗"}</td>
                <td>{item.wildlife ? "✓" : "✗"}</td>
                <td>{item.religious ? "✓" : "✗"}</td>
                <td>{item.cultural ? "✓" : "✗"}</td>
                <td>{item.luxury ? "✓" : "✗"}</td>
                <td>{item.budget ? "✓" : "✗"}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingData({ ...item });
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

        

        {showModal && editingData && (
          <Modal
            title={
              recommendations.some(
                (item) => item.id === editingData.id
              )
                ? "Edit Recommendation Data"
                : "Add Recommendation Data"
            }
            onClose={() => {
              setShowModal(false);
              setEditingData(null);
            }}
            onSave={handleSave}
          >
            <label>Destination</label>

            <input
              type="text"
              value={editingData.destination}
              onChange={(e) =>
                setEditingData({
                  ...editingData,
                  destination: e.target.value,
                })
              }
            />

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
                checked={editingData.cultural}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    cultural: e.target.checked,
                  })
                }
              />
              Cultural
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
                checked={editingData.budget}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    budget: e.target.checked,
                  })
                }
              />
              Budget Friendly
            </label>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageRecommendations;