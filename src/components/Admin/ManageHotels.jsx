import React, { useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import Modal from "./Modal";

function ManageHotels() {

  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Hotel Barahi",
      location: "Pokhara",
      category: "4 Star",
      price: "Rs. 5000",
    },
    {
      id: 2,
      name: "Jungle Villa",
      location: "Chitwan",
      category: "3 Star",
      price: "Rs. 3500",
    },
    {
      id: 3,
      name: "Mountain Resort",
      location: "Mustang",
      category: "5 Star",
      price: "Rs. 7000",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const handleSave = () => {
    const updatedHotels = hotels.map((hotel) =>
      hotel.id === editingHotel.id ? editingHotel : hotel
    );

    setHotels(updatedHotels);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        

        <table className="admin-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Category</th>
              <th>Price/Night</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {hotels.map((hotel) => (

              <tr key={hotel.id}>

                <td>{hotel.id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td>{hotel.category}</td>
                <td>{hotel.price}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingHotel(hotel);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(hotel.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {showModal && editingHotel && (

          <Modal
            title="Edit Hotel"
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          >

            <label>Hotel Name</label>

            <input
              type="text"
              value={editingHotel.name}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  name: e.target.value,
                })
              }
            />

            <label>Location</label>

            <input
              type="text"
              value={editingHotel.location}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  location: e.target.value,
                })
              }
            />

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
              <option>Budget Hotel</option>
              <option>3 Star</option>
              <option>4 Star</option>
              <option>5 Star</option>
            </select>

            <label>Price Per Night</label>

            <input
              type="text"
              value={editingHotel.price}
              onChange={(e) =>
                setEditingHotel({
                  ...editingHotel,
                  price: e.target.value,
                })
              }
            />
             <button className="add-btn">
          + Add Hotel
        </button>

          </Modal>
          

        )}

      </div>

    </div>
    
  );
}

export default ManageHotels;