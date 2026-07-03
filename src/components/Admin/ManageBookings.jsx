import React from "react";
import "./Admin.css";

function ManageBookings() {

  const bookings = [
    {
      id: 1,
      user: "Ram Sharma",
      destination: "Pokhara",
      date: "12 July 2026",
      status: "Confirmed",
    },
    {
      id: 2,
      user: "Sita Rai",
      destination: "Chitwan",
      date: "25 August 2026",
      status: "Pending",
    },
    {
      id: 3,
      user: "Hari Karki",
      destination: "Mustang",
      date: "10 October 2026",
      status: "Completed",
    },
  ];

  return (
    <div className="admin-page">

      <h1>Manage Bookings</h1>

      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {bookings.map((booking) => (

            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user}</td>
              <td>{booking.destination}</td>
              <td>{booking.date}</td>
              <td>{booking.status}</td>

              <td>
                <button className="approve-btn">Approve</button>
                <button className="delete-btn">Cancel</button>
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageBookings;