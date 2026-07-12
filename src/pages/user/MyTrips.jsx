import React from "react";
import "./Dashboard/Dashboard.css";

function MyTrips() {
  const trips = [
    {
      id: 1,
      destination: "Ilam",
      date: "12 July 2026",
      budget: "Rs. 25,000",
      image: "/ilam.jpg",
      status: "Upcoming",
    },
    {
      id: 2,
      destination: "Chitwan",
      date: "25 August 2026",
      budget: "Rs. 14,000",
      image: "/chitwan.jpg",
      status: "Upcoming",
    },
    {
      id: 3,
      destination: "Sindupalchowk",
      date: "10 October 2026",
      budget: "Rs. 10,000",
      image: "/sindupalchowk.jpg",
      status: "Upcoming",
    },
    {
      id: 4,
      destination: "Shivapuri",
      date: "1 December 2026",
      budget: "Rs. 1,000",
      image: "/shivapuri.jpg",
      status: "Upcoming",
    },
  ];

  return (
    <div className="page">

      <h1 className="page-title">My Trips</h1>

      <div className="trip-grid">

        {trips.map((trip) => (

          <div className="trip-card" key={trip.id}>

            <img
              src={trip.image}
              alt={trip.destination}
              className="trip-image"
            />

            <div className="trip-content">

              <div className="trip-header">

                <h3>{trip.destination}</h3>

                <span className="status">
                  {trip.status}
                </span>

              </div>

              <p>
                 <strong>Date:</strong> {trip.date}
              </p>

              <p>
                 <strong>Budget:</strong> {trip.budget}
              </p>

              <div className="trip-buttons">

                <button className="view-btn">
                    View
                </button>
 
              <button className="cancel-btn">
                 Cancel
              </button>



              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyTrips;