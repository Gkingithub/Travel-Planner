import React, { useEffect, useState } from "react";

import "./Admin.css";

import Swal from "sweetalert2";

import AdminSidebar from "../../components/AdminSidebar";

import { FaTrash, FaEye } from "react-icons/fa";

import {
  getBookingHistory,
  deleteBooking,
  getBookingDetails,
} from "../../service/adminBookingService";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response = await getBookingHistory();

      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this booking history?");

    if (!confirm) return;

    try {
      const response = await deleteBooking(id);

      if (response.success) {
        loadHistory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // VIEW COMPLETE BOOKING DETAILS

  const handleView = async (bookingId) => {
    try {
      const response = await getBookingDetails(bookingId);

      if (!response.success) {
        Swal.fire("Error", response.message, "error");

        return;
      }

      setSelectedBooking(response.data);
    } catch (error) {
      console.log(error);

      Swal.fire("Error", "Unable to load booking details.", "error");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Booking History</h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>

                <th>User</th>

                <th>Email</th>

                <th>Destination</th>

               

                <th>Status</th>

                <th>Payment Status</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking.bookingId}>
                    <td>{index + 1}</td>

                    <td>{booking.user?.fullName}</td>

                    <td>{booking.user?.email}</td>

                    <td>{booking.destination}</td>

                    

                    <td>
                      <span
                        className={
                          booking.status === "Approved"
                            ? "approved-status"
                            : "rejected-status"
                        }
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      {booking.payment?.paymentStatus === "Paid" ? (
                        <span className="approved-status">Paid</span>
                      ) : (
                        <span className="pending-status">Pending</span>
                      )}
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleView(booking.bookingId)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(booking.bookingId)}
                      >
                        <FaTrash />
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
                    }}
                  >
                    No Booking History
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

  {selectedBooking && (
  <div className="modal-overlay">

    <div className="booking-detail-modal">

      <div className="modal-header">

        <h2>Booking Details</h2>

        <button
          className="close-modal"
          onClick={() => setSelectedBooking(null)}
        >
          ✕
        </button>

      </div>


      <div className="modal-body">
               

                {/* USER DETAILS */}

                <h3>User Information</h3>

                <p>
                  <strong>Name:</strong> {selectedBooking.user?.fullName}
                </p>

                <p>
                  <strong>Email:</strong> {selectedBooking.user?.email}
                </p>

                <p>
                  <strong>Phone Number:</strong>{" "}
                  {selectedBooking.user?.phoneNumber || "Not Available"}
                </p>

                {/* TRIP DETAILS */}

                <h3>Trip Information</h3>

                {selectedBooking.trip?.destination?.imageUrl && (
                  <img
                    src={`http://localhost:5055${
                      selectedBooking.trip.destination.imageUrl
                    }`}
                    alt="Destination"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}

                <p>
                  <strong>Destination:</strong>{" "}
                  {selectedBooking.trip?.destination?.name}
                </p>

                <p>
                  <strong>Travel Date:</strong>{" "}
                  {new Date(
                    selectedBooking.trip?.travelDate,
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Budget:</strong> Rs. {selectedBooking.trip?.budget}
                </p>

                <p>
                  <strong>Hotel:</strong> {selectedBooking.trip?.hotelCategory}
                </p>

                <p>
                  <strong>Transportation:</strong>{" "}
                  {selectedBooking.trip?.transportation}
                </p>

                <p>
                  <strong>Travellers:</strong>{" "}
                  {selectedBooking.trip?.travellers}
                </p>

                {/* PAYMENT */}

                <h3>Payment Information</h3>

                <p>
                  <strong>Payment Status:</strong>{" "}
                  {selectedBooking.payment?.paymentStatus || "Pending"}
                </p>

                {/* ITINERARY */}

                <h3>Daily Itinerary</h3>

                {selectedBooking.trip?.itineraries &&
                selectedBooking.trip.itineraries.length > 0 ? (
                  selectedBooking.trip.itineraries.map((day, index) => (
                    <div key={index} className="itinerary-item">
                      <h4>Day {day.dayNumber}</h4>

                      <p>
                        <b>Morning:</b> {day.morning}
                      </p>

                      <p>
                        <b>Afternoon:</b> {day.afternoon}
                      </p>

                      <p>
                        <b>Evening:</b> {day.evening}
                      </p>

                      <p>
                        <b>Estimated Cost:</b> Rs. {day.estimatedCost}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No itinerary available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
