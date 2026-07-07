import React, { useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import Modal from "./Modal";

function ManageUsers() {

  const [users, setUsers] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );

    setUsers(updatedUsers);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        <h1>Manage Users</h1><br></br>

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

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingUser(user);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {showModal && editingUser && (

          <Modal
            title="Edit User"
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          >

            <label>Name</label>

            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  name: e.target.value,
                })
              }
            />

            <label>Email</label>

            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />

            <label>Role</label>

            <select
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  role: e.target.value,
                })
              }
            >
              <option>User</option>
              <option>Admin</option>
            </select>

          </Modal>

        )}

      </div>

    </div>
  );
}

export default ManageUsers;