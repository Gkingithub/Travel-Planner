import React from "react";
import "./Admin.css";

function ManageUsers() {

  const users = [
    {
      id: 1,
      name: "Ram Sharma",
      email: "ram@gmail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Sita Rai",
      email: "sita@gmail.com",
      role: "User",
    },
    {
      id: 3,
      name: "Hari Karki",
      email: "hari@gmail.com",
      role: "User",
    },
  ];

  return (
    <div className="admin-page">

      <h1>Manage Users</h1>

      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

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

export default ManageUsers;