import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Dashboard.css";

function DashboardHome({ user }) {

  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    days: "",
    budget: "",
    travelers: "",
    travelType: "",
    transport: "",
    hotel: "",
    interests: "",
  });

  const [plan, setPlan] = useState("");

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const generatePlan = () => {

    if (
      !trip.destination ||
      !trip.startDate ||
      !trip.endDate ||
      !trip.days ||
      !trip.budget
    ) {

      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please complete all required fields.",
      });

      return;
    }

    const itinerary = `
TRAVEL ITINERARY

Destination : ${trip.destination}

Travel Date : ${trip.startDate} to ${trip.endDate}

Duration : ${trip.days} Days

Budget : Rs. ${trip.budget}

Travelers : ${trip.travelers}

Travel Type : ${trip.travelType}

Transportation : ${trip.transport}

Hotel Category : ${trip.hotel}

Interests : ${trip.interests}

--------------------------------------------

DAY 1

• Arrival at destination

• Hotel Check-in

• Explore nearby attractions

• Dinner at a local restaurant

--------------------------------------------

DAY 2

• Breakfast

• Visit famous tourist attractions

• Local lunch

• Evening sightseeing

--------------------------------------------

DAY 3

• Shopping

• Local cultural experience

• Return to hotel

--------------------------------------------

Thank you for using Yatriq.
Have a safe and enjoyable journey.
`;

    setPlan(itinerary);

    Swal.fire({
      icon: "success",
      title: "Travel Plan Generated",
      timer: 1500,
      showConfirmButton: false,
    });

  };

  return (

    <div className="dashboard-home">

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome, {user.name} 
          </h1>

          <p>
            Plan your next journey with Yatriq
          </p>

        </div>

        

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h4>Trips</h4>
          <h2>12</h2>
        </div>

        <div className="stat-card">
          <h4>Destinations</h4>
          <h2>18</h2>
        </div>

        <div className="stat-card">
          <h4>Hotels</h4>
          <h2>9</h2>
        </div>

        <div className="stat-card">
          <h4>Total Budget</h4>
          <h2>Rs. 85,000</h2>
        </div>

      </div>

      {/* Main Content */}

      <div className="dashboard-main">

        {/* Planner */}

        <div className="planner-card">

          <h2>Create Travel Plan</h2>

          <div className="planner-grid">

            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={trip.destination}
              onChange={handleChange}
            />

            <input
              type="date"
              name="startDate"
              value={trip.startDate}
              onChange={handleChange}
            />

            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              onChange={handleChange}
            />

            <input
              type="number"
              name="days"
              placeholder="Days"
              value={trip.days}
              onChange={handleChange}
            />

            <input
              type="number"
              name="budget"
              placeholder="Budget"
              value={trip.budget}
              onChange={handleChange}
            />

            <input
              type="number"
              name="travelers"
              placeholder="Travelers"
              value={trip.travelers}
              onChange={handleChange}
            />

            <select
              name="travelType"
              value={trip.travelType}
              onChange={handleChange}
            >
              <option value="">Travel Type</option>
              <option>Solo</option>
              <option>Couple</option>
              <option>Family</option>
              <option>Friends</option>
            </select>

            <select
              name="transport"
              value={trip.transport}
              onChange={handleChange}
            >
              <option value="">Transportation</option>
              <option>Flight</option>
              <option>Bus</option>
              <option>Private Vehicle</option>
            </select>

            <select
              name="hotel"
              value={trip.hotel}
              onChange={handleChange}
            >
              <option value="">Hotel Category</option>
              <option>Budget Hotel</option>
              <option>3 Star Hotel</option>
              <option>4 Star Hotel</option>
              <option>5 Star Hotel</option>
            </select>

            <input
              type="text"
              name="interests"
              placeholder="Interests"
              value={trip.interests}
              onChange={handleChange}
              className="full-width"
            />

          </div>

          <button
            className="generate-btn"
            onClick={generatePlan}
          >
            Generate  Plan
          </button>

        </div>

        {/* RIGHT PANEL STARTS HERE */}

<div className="right-panel">

  {/* Popular Destinations */}

  <div className="side-card">

    <h2>Popular Destinations</h2>

    <div className="mini-card">

      <img
        src="/pokhara.jpg"
        alt="Pokhara"
      />

      <div>

        <h4>Pokhara</h4>

        <p>Lakes & Mountains</p>

        <span>★★★★★</span>

      </div>

    </div>

    <div className="mini-card">

      <img
        src="/chitwan.jpg"
        alt="Chitwan"
      />

      <div>

        <h4>Chitwan</h4>

        <p>Jungle Safari</p>

        <span>★★★★☆</span>

      </div>

    </div>

    <div className="mini-card">

      <img
        src="/mustang.jpg"
        alt="Mustang"
      />

      <div>

        <h4>Mustang</h4>

        <p>Himalayan Adventure</p>

        <span>★★★★★</span>

      </div>

    </div>

    <div className="mini-card">

      <img
        src="/lumbini.jpg"
        alt="Lumbini"
      />

      <div>

        <h4>Lumbini</h4>

        <p>Birthplace of Buddha</p>

        <span>★★★★☆</span>

      </div>

    </div>

  </div>

</div>
</div>

{/* Generated Plan */}

{plan && (

  <div className="itinerary-card">

    <h2>Generated Itinerary</h2>

    <pre>{plan}</pre>

  </div>

)}

</div>

  );

}

export default DashboardHome;