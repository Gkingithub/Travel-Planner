import React from "react";
import "./Admin.css";

function ManageTrips() {

  const trips = [
    {
      id: 1,
      destination: "Pokhara",
      days: 3,
      price: "Rs. 15,000",
    },
    {
      id: 2,
      destination: "Chitwan",
      days: 2,
      price: "Rs. 18,000",
    },
    {
      id: 3,
      destination: "Mustang",
      days: 5,
      price: "Rs. 30,000",
    },
  ];

  return (
    <div className="admin-page">

      <h1>Manage Destinations</h1>

      <button className="add-btn">+ Add Destination</button>

      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {trips.map((trip) => (

            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.destination}</td>
              <td>{trip.days} Days</td>
              <td>{trip.price}</td>

              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageTrips;