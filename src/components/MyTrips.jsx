import React from "react";
import "./Dashboard.css";

function MyTrips() {

  const trips = [
    {
      id: 1,
      destination: "Kathmandu",
      date: "12 July 2026",
      budget: "Rs. 5,000",
      image: "/boudha.jpg",
    },
    {
      id: 2,
      destination: "Chitwan",
      date: "25 August 2026",
      budget: "Rs. 18,000",
      image: "/chitwan.jpg",
    },
    {
      id: 3,
      destination: "Lalitpur",
      date: "10 October 2026",
      budget: "Rs. 30,000",
      image: "/mustang.jpg",
    },

    {
      id: 4,
      destination: "Dhapdam",
      date: "1 December 2026",
      buget: "Rs. 1000",
      image: "/dhapdam.jpg",
    }
  ];

  return (
    <div className="page">

      <h1>My Trips</h1>

      <div className="trip-grid">

        {trips.map((trip) => (

          <div className="trip-card" key={trip.id}>

            <img
              src={trip.image}
              alt={trip.destination}
            />

            <div className="trip-info">

              <h3>{trip.destination}</h3>

              <p>
                Travel Date
              </p>

              <span>{trip.date}</span>

              <h4>{trip.budget}</h4>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyTrips;