import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import Modal from "../../components/modal";

import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../../service/hotelService";

import { getDestinations } from "../../service/destinationService";

function ManageHotels() {
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  useEffect(() => {
    loadHotels();
    loadDestinations();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await getHotels();

      if (response.success) {
        setHotels(response.data);
      } else {
        setHotels([]);
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
      } else {
        setDestinations([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    setEditingHotel({
      hotelId: 0,
      hotelName: "",
      destinationId: "",
      pricePerNight: "",
      rating: "",
      category: "",
      facilities: "",
      imageUrl: null,
    });

    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingHotel.hotelId > 0) {
        await updateHotel(editingHotel.hotelId, editingHotel);
      } else {
        await createHotel(editingHotel);
      }

      setShowModal(false);
      setEditingHotel(null);

      loadHotels();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?"))
      return;

    try {
      await deleteHotel(id);
      loadHotels();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Hotels</h1>

        <div className="button-container">
          <button
            type="button"
            className="add-user-btn"
            onClick={handleAdd}
          >
            Add Hotel
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hotel</th>
              <th>Destination</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel.hotelId}>
                  <td>{hotel.hotelId}</td>

                  <td>{hotel.hotelName}</td>

                  <td>{hotel.destination?.name}</td>

                  <td>{hotel.category}</td>

                  <td>Rs. {hotel.pricePerNight}</td>

                  <td>{hotel.rating}</td>

                  <td>
                    {hotel.imageUrl && (
                      <img
                        src={`http://localhost:5055${hotel.imageUrl}`}
                        alt={hotel.hotelName}
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
                        setEditingHotel({
                          hotelId: hotel.hotelId,
                          hotelName: hotel.hotelName,
                          destinationId: hotel.destinationId,
                          pricePerNight: hotel.pricePerNight,
                          rating: hotel.rating,
                          category: hotel.category,
                          facilities: hotel.facilities,
                          imageUrl: hotel.imageUrl,
                        });

                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(hotel.hotelId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hotels found.</td>
              </tr>
            )}
          </tbody>
        </table>        {showModal && editingHotel && (
          <Modal
            title={
              editingHotel.hotelId > 0 ? "Edit Hotel" : "Add Hotel"
            }
            onClose={() => {
              setShowModal(false);
              setEditingHotel(null);
            }}
            onSave={handleSave}
          >
            <label>Hotel Name</label>
            <input
              type="text"
              value={editingHotel.hotelName}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  hotelName: e.target.value,
                })
              }
            />

            <label>Destination</label>
            <select
              value={editingHotel.destinationId}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  destinationId: Number(e.target.value),
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

            <label>Category</label>
            <select
              value={editingHotel.category}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              <option value="Budget Hotel">Budget Hotel</option>
              <option value="3 Star">3 Star</option>
              <option value="4 Star">4 Star</option>
              <option value="5 Star">5 Star</option>
            </select>

            <label>Price Per Night</label>
            <input
              type="number"
              value={editingHotel.pricePerNight}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  pricePerNight: e.target.value,
                })
              }
            />

            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={editingHotel.rating}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  rating: e.target.value,
                })
              }
            />

            <div className="form-group">
  <label htmlFor="facilities">Facilities</label>

  <textarea
         id="facilities"
        rows="4"
          placeholder="Enter hotel facilities"
         value={editingHotel.facilities}
         onChange={(e) =>
         setEditingHotel({
        ...editingHotel,
        facilities: e.target.value,
      })
    }
  />
</div>

            <label>Hotel Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  imageUrl: e.target.files[0],
                })
              }
            />

            {editingHotel.imageUrl &&
              typeof editingHotel.imageUrl === "string" && (
                <img
                  src={`http://localhost:5055${editingHotel.imageUrl}`}
                  alt="Hotel"
                  width="120"
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

export default ManageHotels;