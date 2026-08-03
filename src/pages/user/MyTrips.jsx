import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Dashboard/Dashboard.css";

import {
  getMyTrips,
  getTripDetails,
  completeTrip,
  deleteTrip,
} from "../../service/tripService";

import { createBooking } from "../../service/bookingService";
function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);

      const response = await getMyTrips();

      if (response.success) {
        setTrips(response.data);
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to load trips.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // VIEW DETAILS
  // ============================

  const handleView = async (tripId) => {
    try {
      const response = await getTripDetails(tripId);

      if (!response.success) {
        Swal.fire("Error", response.message, "error");

        return;
      }

      const trip = response.data;

      let itineraryHTML = "";

      if (trip.itineraries && trip.itineraries.length > 0) {
        trip.itineraries.forEach((day) => {
          itineraryHTML += `

          <div style="
          text-align:left;
          padding:12px;
          border-bottom:1px solid #ddd;
          margin-bottom:10px;">


          <h4>
          Day ${day.dayNumber}
          </h4>


          <p>
          <strong>Morning:</strong>
          ${day.morning || "-"}
          </p>


          <p>
          <strong>Afternoon:</strong>
          ${day.afternoon || "-"}
          </p>


          <p>
          <strong>Evening:</strong>
          ${day.evening || "-"}
          </p>


          <p>
          <strong>Estimated Cost:</strong>
          Rs. ${day.estimatedCost}
          </p>


          </div>

          `;
        });
      } else {
        itineraryHTML = "<p>No itinerary found.</p>";
      }

      Swal.fire({
        title: `
    <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
      <i class="bi bi-airplane-fill" style="font-size:28px;color:#0d6efd;"></i>
      <span>${trip.destination?.name}</span>
    </div>
  `,

        background: "#ffffff",
        showCloseButton: true,
        confirmButtonText: "Close",
        confirmButtonColor: "#0d6efd",
        customClass: {
          popup: "trip-popup",
          htmlContainer: "trip-popup-body",
        },

        html: `
<div style="font-family:Segoe UI,sans-serif;">

    <img
      src="http://localhost:5055${trip.destination?.imageUrl}"
      style="
        width:100%;
        height:260px;
        object-fit:cover;
        border-radius:12px;
        margin-bottom:20px;
      "
    />

    <div style="
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:15px;
        margin-bottom:20px;
    ">

        <div style="background:#f8f9fa;padding:15px;border-radius:10px;">
            <i class="bi bi-calendar-event-fill" style="color:#0d6efd;"></i>
            <strong> Date</strong><br>
            ${new Date(trip.travelDate).toLocaleDateString()}
        </div>

        <div style="background:#f8f9fa;padding:15px;border-radius:10px;">
            <i class="bi bi-people-fill" style="color:#0d6efd;"></i>
            <strong> Travellers</strong><br>
            ${trip.travellers}
        </div>

        <div style="background:#f8f9fa;padding:15px;border-radius:10px;">
            <i class="bi bi-car-front-fill" style="color:#0d6efd;"></i>
            <strong> Transport</strong><br>
            ${trip.transportation}
        </div>

        <div style="background:#f8f9fa;padding:15px;border-radius:10px;">
            <i class="bi bi-building-fill" style="color:#0d6efd;"></i>
            <strong> Hotel</strong><br>
            ${trip.hotelCategory}
        </div>

        <div style="background:#f8f9fa;padding:15px;border-radius:10px;">
            <i class="bi bi-cash-stack" style="color:#28a745;"></i>
            <strong> Budget</strong><br>
            Rs. ${trip.budget}
        </div>

        <div style="background:#f8f9fa;padding:15px;border-radius:10px;">
            <i class="bi bi-geo-alt-fill" style="color:#dc3545;"></i>
            <strong> Status</strong><br>

            <span style="
                color:${trip.status === "Completed" ? "#198754" : "#ff9800"};
                font-weight:bold;
            ">
                ${trip.status}
            </span>
        </div>

    </div>

    <hr>

    <h3 style="margin-bottom:20px;color:#0d6efd;">
        <i class="bi bi-map-fill"></i>
        Daily Itinerary
    </h3>

    ${
      trip.itineraries && trip.itineraries.length > 0
        ? trip.itineraries
            .map(
              (day) => `
        <div style="
            border-left:5px solid #0d6efd;
            background:#fafafa;
            padding:18px;
            border-radius:10px;
            margin-bottom:18px;
            text-align:left;
            box-shadow:0 2px 8px rgba(0,0,0,.08);
        ">

            <h4 style="margin-bottom:12px;color:#0d6efd;">
                <i class="bi bi-calendar-week-fill"></i>
                Day ${day.dayNumber}
            </h4>

            <p>
                <i class="bi bi-sunrise-fill" style="color:#f39c12;"></i>
                <strong> Morning</strong><br>
                ${day.morning || "-"}
            </p>

            <p>
                <i class="bi bi-sun-fill" style="color:#ff9800;"></i>
                <strong> Afternoon</strong><br>
                ${day.afternoon || "-"}
            </p>

            <p>
                <i class="bi bi-moon-stars-fill" style="color:#6f42c1;"></i>
                <strong> Evening</strong><br>
                ${day.evening || "-"}
            </p>

            <div style="
                margin-top:12px;
                background:#eaf7ef;
                display:inline-block;
                padding:8px 14px;
                border-radius:20px;
                color:#198754;
                font-weight:bold;
            ">
               
            </div>

        </div>
        `,
            )
            .join("")
        : `
        <div style="
            padding:30px;
            background:#f8f9fa;
            border-radius:10px;
            text-align:center;
        ">
            <i class="bi bi-info-circle-fill" style="font-size:35px;color:#0d6efd;"></i>
            <br><br>
            No itinerary available.
        </div>
        `
    }

</div>
`,
      });
    } catch (error) {
      console.log(error);

      Swal.fire("Error", "Unable to fetch trip details.", "error");
    }
  };

  //============================
  //Booking
  //============================
  // ============================
  // BOOK TRIP
  // ============================

  const handleBooking = async (trip) => {
    const result = await Swal.fire({
      title: "Confirm Booking?",

      html: `
      <div style="text-align:left">

        <p>
          <strong>Destination:</strong>
          ${trip.destination?.name}
        </p>

        <p>
          <strong>Date:</strong>
          ${new Date(trip.travelDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Budget:</strong>
          Rs. ${trip.budget}
        </p>

        <hr>

        <p>
          Your booking request will be sent to admin for approval.
        </p>

      </div>
    `,

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Book Now",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#0d6efd",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await createBooking(trip.tripId);

      if (response.success) {
        Swal.fire(
          "Booking Sent",
          "Your booking request has been sent to admin.",
          "success",
        );
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to create booking.", "error");
    }
  };
  // ============================
  // COMPLETE TRIP
  // ============================

  const handleComplete = async (tripId) => {
    const result = await Swal.fire({
      title: "Complete Trip?",
      text: "Mark this trip as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Complete",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await completeTrip(tripId);

      if (response.success) {
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.tripId === tripId ? { ...trip, status: "Completed" } : trip,
          ),
        );

        Swal.fire("Completed", "Trip marked as completed.", "success");
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to update trip.", "error");
    }
  };

  // ============================
  // DELETE / CANCEL TRIP
  // ============================

  const handleCancel = async (tripId) => {
    const result = await Swal.fire({
      title: "Cancel Trip?",
      text: "This will delete the trip permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await deleteTrip(tripId);

      if (response.success) {
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.tripId !== tripId),
        );

        Swal.fire("Deleted", "Trip deleted successfully.", "success");
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to delete trip.", "error");
    }
  };
  const filteredTrips = trips.filter((trip) =>
    trip.destination?.name?.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="page">
      <h1 className="page-title">My Trips</h1>

      <div className="trip-search">
        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : filteredTrips.length === 0 ? (
        <h2>No trips found.</h2>
      ) : (
        <div className="trip-grid">
        {filteredTrips.map((trip) => (
            <div className="trip-card" key={trip.tripId}>
              <img
                src={
                  trip.destination?.imageUrl
                    ? `http://localhost:5055${trip.destination.imageUrl}`
                    : "/placeholder.jpg"
                }
                alt={trip.destination?.name}
                className="trip-image"
              />

              <div className="trip-content">
                <div className="trip-header">
                  <h3>{trip.destination?.name}</h3>

                  <span className={`status ${trip.status?.toLowerCase()}`}>
                    {trip.status}
                  </span>
                </div>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(trip.travelDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Days:</strong>
                  {trip.days}
                </p>

                <p>
                  <strong>Transport:</strong>
                  {trip.transportation}
                </p>

                <p>
                  <strong>Hotel:</strong>
                  {trip.hotelCategory}
                </p>
                <div className="trip-buttons">
                  <button
                    className="view-btn"
                    onClick={() => handleView(trip.tripId)}
                  >
                    <i className="bi bi-eye-fill"></i>
                    View
                  </button>

                  <button
                    className="book-btn"
                    onClick={() => handleBooking(trip)}
                  >
                    <i className="bi bi-calendar-check-fill"></i>
                    Book
                  </button>

                  <button
                    className="complete-btn"
                    disabled={trip.status === "Completed"}
                    onClick={() => handleComplete(trip.tripId)}
                  >
                    <i className="bi bi-check-circle-fill"></i>
                    Complete
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(trip.tripId)}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
