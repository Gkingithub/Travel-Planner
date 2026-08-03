import React, { useEffect, useState } from "react";
import "./Admin.css";

import Swal from "sweetalert2";

import AdminSidebar from "../../components/AdminSidebar";

import {
  getPendingBookings,
  approveBooking,
  rejectBooking,
  getBookingDetails,
} from "../../service/adminBookingService";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await getPendingBookings();

      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const confirm = window.confirm("Approve this booking?");

    if (!confirm) return;

    try {
      const response = await approveBooking(id);

      if (response.success) {
        alert("Booking approved");
        loadBookings();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    const remark = window.prompt("Enter rejection reason");

    if (!remark) return;

    try {
      const response = await rejectBooking(id, remark);

      if (response.success) {
        alert("Booking rejected");
        loadBookings();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = async (bookingId) => {
    try {
      const response = await getBookingDetails(bookingId);

      if (!response.success) {
        Swal.fire("Error", response.message, "error");
        return;
      }

      const booking = response.data;
      const trip = booking.trip;

      Swal.fire({
        title: trip.destination.name,
        width: 900,
        confirmButtonText: "Close",
        html: `
          <div style="text-align:left">

            <img
              src="http://localhost:5055${trip.destination.imageUrl}"
              style="width:100%;height:250px;object-fit:cover;border-radius:10px;margin-bottom:15px;"
            />

            <p><strong>Traveller:</strong> ${booking.user.fullName}</p>
            <p><strong>Email:</strong> ${booking.user.email}</p>
            <p><strong>Travel Date:</strong> ${new Date(
              trip.travelDate
            ).toLocaleDateString()}</p>

            <p><strong>Budget:</strong> Rs. ${trip.budget}</p>

            <p><strong>Hotel:</strong> ${trip.hotelCategory}</p>

            <p><strong>Transportation:</strong> ${trip.transportation}</p>

            <p><strong>Travellers:</strong> ${trip.travellers}</p>

            <hr>

            <h3>Daily Itinerary</h3>

            ${trip.itineraries
              .map(
                (day) => `
                  <div style="
                    border-left:5px solid #0d6efd;
                    padding:15px;
                    margin-bottom:15px;
                    background:#f8f9fa;
                    border-radius:8px;
                  ">

                    <h4>Day ${day.dayNumber}</h4>

                    <p><b>Morning:</b> ${day.morning}</p>

                    <p><b>Afternoon:</b> ${day.afternoon}</p>

                    <p><b>Evening:</b> ${day.evening}</p>

                    <p><b>Estimated Cost:</b> Rs. ${day.estimatedCost}</p>

                  </div>
                `
              )
              .join("")}

          </div>
        `,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Unable to load booking details.", "error");
    }
  };return (
  <div className="admin-layout">
    <AdminSidebar />

    <div className="admin-content">
      <h1>Manage Bookings</h1>

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

              <th>Travel Date</th>

              <th>Budget</th>

              <th>Booking Date</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{index + 1}</td>

                  <td>{booking.user.fullName}</td>

                  <td>{booking.user.email}</td>

                  <td>{booking.trip.destination}</td>

                  <td>
                    {new Date(
                      booking.trip.travelDate
                    ).toLocaleDateString()}
                  </td>

                  <td>Rs. {booking.trip.budget}</td>

                  <td>
                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString()}
                  </td>

                  <td
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="view-btn"
                      onClick={() =>
                        handleView(booking.bookingId)
                      }
                    >
                      View
                    </button>

                    <button
                      className="approve-btn"
                      onClick={() =>
                        handleApprove(booking.bookingId)
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleReject(booking.bookingId)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No Pending Booking
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
}
export default ManageBookings;