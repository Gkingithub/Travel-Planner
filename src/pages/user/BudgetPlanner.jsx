import React, { useState } from "react";
import "./Dashboard/Dashboard.css";

function BudgetPlanner() {
  const [days, setDays] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [hotel, setHotel] = useState(2000);
  const [transport, setTransport] = useState(1000);

  const foodCost = days * travelers * 1000;
  const hotelCost = days * hotel;
  const transportCost = transport * travelers;
  const activities = days * travelers * 500;

  const total =
    hotelCost +
    foodCost +
    transportCost +
    activities;

  return (
    <div className="page">

      <h1 className="page-title">Budget Planner</h1>

      <div className="budget-container">

        {/* LEFT CARD */}

        <div className="budget-form">

          <h2>Trip Details</h2>

          <label> Number of Days</label>
          <input
            type="number"
            value={days}
            min="1"
            onChange={(e) => setDays(Number(e.target.value))}
          />

          <label> Travelers</label>
          <input
            type="number"
            value={travelers}
            min="1"
            onChange={(e) => setTravelers(Number(e.target.value))}
          />

          <label> Hotel Category</label>
          <select
            value={hotel}
            onChange={(e) => setHotel(Number(e.target.value))}
          >
            <option value="2000">Budget Hotel</option>
            <option value="3500">3 Star Hotel</option>
            <option value="5000">4 Star Hotel</option>
            <option value="7000">5 Star Hotel</option>
          </select>

          <label> Transportation</label>
          <select
            value={transport}
            onChange={(e) => setTransport(Number(e.target.value))}
          >
            <option value="500">Bus</option>
            <option value="1500">Flight</option>
            <option value="1000">Private Vehicle</option>
          </select>

        </div>

        {/* RIGHT CARD */}

        <div className="budget-result">

          <h2>Estimated Budget</h2>

          <div className="budget-item">
            <span> Hotel</span>
            <strong>Rs. {hotelCost}</strong>
          </div>

          <div className="budget-item">
            <span>Food</span>
            <strong>Rs. {foodCost}</strong>
          </div>

          <div className="budget-item">
            <span>Transportation</span>
            <strong>Rs. {transportCost}</strong>
          </div>

          <div className="budget-item">
            <span>Activities</span>
            <strong>Rs. {activities}</strong>
          </div>

          <div className="budget-total">

            <p>Total Estimated Budget</p>

            <h1>Rs. {hotelCost.toLocaleString()}</h1>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BudgetPlanner;