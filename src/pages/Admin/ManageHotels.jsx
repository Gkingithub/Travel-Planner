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
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const totalPages = Math.ceil(totalRecords / pageSize);

  useEffect(() => {
    loadHotels();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await getHotels(currentPage, pageSize, searchTerm);

      if (response.success) {
        setHotels(response.data.data);
        setTotalRecords(response.data.totalRecords);
      } else {
        setHotels([]);
      }
    } catch (error) {
      console.log(error);
      setHotels([]);
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
      contactNumber: "",
      email: "",
      imageUrl: null,
    });

    setShowModal(true);
  };
const validateHotel = () => {

  let newErrors = {};


  if (!editingHotel.hotelName?.trim()) {
    newErrors.hotelName = "Hotel name is required.";
  }


  if (!editingHotel.destinationId) {
    newErrors.destinationId = "Destination is required.";
  }


  if (!editingHotel.category?.trim()) {
    newErrors.category = "Category is required.";
  }


  if (!editingHotel.pricePerNight) {
    newErrors.pricePerNight = "Price per night is required.";
  }


  if (!editingHotel.rating) {
    newErrors.rating = "Rating is required.";
  }


  if (!editingHotel.facilities?.trim()) {
    newErrors.facilities = "Facilities are required.";
  }


  if (!editingHotel.contactNumber?.trim()) {

    newErrors.contactNumber =
      "Contact number is required.";

  } 
  else if (!/^[0-9]{10}$/.test(editingHotel.contactNumber)) {

    newErrors.contactNumber =
      "Contact number must be exactly 10 digits.";

  }


  if (!editingHotel.email?.trim()) {

    newErrors.email =
      "Email is required.";

  }
  else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingHotel.email)
  ) {

    newErrors.email =
      "Enter a valid email address.";

  }


  setErrors(newErrors);


  return Object.keys(newErrors).length === 0;
};
const handleSave = async () => {

  console.log("Saving hotel:", editingHotel);


  if (!validateHotel()) {

    console.log("Validation failed");

    return;

  }


  try {

    if (editingHotel.hotelId > 0) {

      await updateHotel(
        editingHotel.hotelId,
        editingHotel
      );

    } else {

      await createHotel(editingHotel);

    }


    setShowModal(false);
    setEditingHotel(null);
    setErrors({});

    loadHotels();


  } catch(error) {

    console.log(error);

  }

};

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hotel?")) return;

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
        {/* SEARCH + ADD BUTTON */}
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
            placeholder="Search hotel, category, destination..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "320px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <button type="button" className="add-user-btn" onClick={handleAdd}>
            Add Hotel
          </button>
        </div>
        {/* HOTEL TABLE */}
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hotel</th>
              <th>Destination</th>
              <th>Category</th>
              <th>Price</th>

              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {hotels.length > 0 ? (
              hotels.map((hotel,index) => (
                <tr key={hotel.hotelId}>
                     <td>
        {(currentPage - 1) * pageSize + index + 1}
      </td>

                  <td>{hotel.hotelName}</td>

                  <td>{hotel.destinationName}</td>

                  <td>{hotel.category}</td>

                  <td>Rs. {hotel.pricePerNight}</td>

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
                          contactNumber: hotel.contactNumber,
                          email: hotel.email,
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
                <td colSpan="8">No hotels found</td>
              </tr>
            )}
          </tbody>
        </table>{" "}
        {/* HOTEL MODAL */}
     {showModal && editingHotel && (
  <Modal
    title={editingHotel.hotelId > 0 ? "Edit Hotel" : "Add Hotel"}
    onClose={() => {
      setShowModal(false);
      setEditingHotel(null);
      setErrors({});
    }}
    onSave={handleSave}
  >

    <label>Hotel Name</label>

    <input
      type="text"
      value={editingHotel.hotelName || ""}
      onChange={(e) => {
        setEditingHotel({
          ...editingHotel,
          hotelName: e.target.value,
        });

        setErrors({
          ...errors,
          hotelName: "",
        });
      }}
    />

    {errors.hotelName && (
      <p className="error">{errors.hotelName}</p>
    )}



    <label>Destination</label>

    <select
      value={editingHotel.destinationId || ""}
      onChange={(e) => {
        setEditingHotel({
          ...editingHotel,
          destinationId: Number(e.target.value),
        });

        setErrors({
          ...errors,
          destinationId: "",
        });
      }}
    >

      <option value="">
        Select Destination
      </option>

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




    <label>Category</label>

    <select
      value={editingHotel.category || ""}
      onChange={(e) => {
        setEditingHotel({
          ...editingHotel,
          category: e.target.value,
        });

        setErrors({
          ...errors,
          category: "",
        });
      }}
    >

      <option value="">
        Select Category
      </option>

      <option value="Budget Hotel">
        Budget Hotel
      </option>

      <option value="3 Star">
        3 Star
      </option>

      <option value="4 Star">
        4 Star
      </option>

      <option value="5 Star">
        5 Star
      </option>

    </select>

    {errors.category && (
      <p className="error">{errors.category}</p>
    )}




    <label>Price Per Night</label>

    <input
      type="number"
      value={editingHotel.pricePerNight || ""}
      onChange={(e) => {
        setEditingHotel({
          ...editingHotel,
          pricePerNight:e.target.value,
        });

        setErrors({
          ...errors,
          pricePerNight:"",
        });
      }}
    />

    {errors.pricePerNight && (
      <p className="error">{errors.pricePerNight}</p>
    )}




    <label>Rating</label>

    <input
      type="number"
      min="0"
      max="5"
      step="0.1"
      value={editingHotel.rating || ""}
      onChange={(e) => {
        setEditingHotel({
          ...editingHotel,
          rating:e.target.value,
        });

        setErrors({
          ...errors,
          rating:"",
        });
      }}
    />

    {errors.rating && (
      <p className="error">{errors.rating}</p>
    )}




    <label>Facilities</label>

    <textarea
      className="form-textarea"
      rows={5}
      maxLength={500}
      placeholder="Enter hotel facilities..."
      value={editingHotel.facilities || ""}
      onChange={(e)=>{
        setEditingHotel({
          ...editingHotel,
          facilities:e.target.value,
        });

        setErrors({
          ...errors,
          facilities:"",
        });
      }}
    />


    <div className="textarea-footer">

      <span>
        List the facilities and amenities available at the hotel.
      </span>

      <span>
        {(editingHotel.facilities || "").length}/500
      </span>

    </div>


    {errors.facilities && (
      <p className="error">
        {errors.facilities}
      </p>
    )}




    <label>Contact Number</label>

    <input
      type="text"
      placeholder="98XXXXXXXX"
      maxLength="10"
      value={editingHotel.contactNumber || ""}
      onChange={(e)=>{

        const value=e.target.value;

        if(/^\d{0,10}$/.test(value)){

          setEditingHotel({
            ...editingHotel,
            contactNumber:value,
          });

          setErrors({
            ...errors,
            contactNumber:"",
          });

        }

      }}
    />


    {errors.contactNumber && (
      <p className="error">
        {errors.contactNumber}
      </p>
    )}




    <label>Email</label>

    <input
      type="email"
      placeholder="hotel@example.com"
      value={editingHotel.email || ""}
      onChange={(e)=>{

        setEditingHotel({
          ...editingHotel,
          email:e.target.value,
        });

        setErrors({
          ...errors,
          email:"",
        });

      }}
    />


    {errors.email && (
      <p className="error">
        {errors.email}
      </p>
    )}




    <label>Hotel Image</label>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>{

        setEditingHotel({
          ...editingHotel,
          imageUrl:e.target.files[0],
        });

      }}
    />


    {editingHotel.imageUrl &&
    typeof editingHotel.imageUrl === "string" && (

      <img
        src={`http://localhost:5055${editingHotel.imageUrl}`}
        alt="Hotel"
        width="120"
        style={{
          marginTop:"10px",
          borderRadius:"8px",
          objectFit:"cover",
        }}
      />

    )}

  </Modal>
)}
        {/* PAGINATION */}
        <div className="pagination">
          <button
            className="edit-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span
            style={{
              width: "170px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            className="edit-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageHotels;
