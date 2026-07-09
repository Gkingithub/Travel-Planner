import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import Modal from "./Modal";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../service/userService";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Load users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();

      // If your API returns ApiResponse { success, data }
      setUsers(response.data);

      // If your API directly returns an array, use:
      // setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Open Add User Modal
  const handleAdd = () => {
    setEditingUser({
      userId: 0,
      fullName: "",
      email: "",
      passwordHash: "",
      userType: "User",
      profileImage: "",
    });

    setShowModal(true);
  };

  // Save User
  const handleSave = async () => {
    try {
      if (editingUser.userId > 0) {
        await updateUser(editingUser.userId, editingUser);
      } else {
        await createUser(editingUser);
      }

      await loadUsers();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Users</h1>

        <div className="button-container">
          <button
            type="button"
            className="add-user-btn"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingUser({ ...user });
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && editingUser && (
          <Modal
            title={editingUser.userId ? "Edit User" : "Add User"}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          >
            <label>Full Name</label>
            <input
              type="text"
              value={editingUser.fullName}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  fullName: e.target.value,
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

            {!editingUser.userId && (
              <>
                <label>Password</label>
                <input
                  type="password"
                  value={editingUser.passwordHash}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      passwordHash: e.target.value,
                    })
                  }
                />
              </>
            )}

            <label>User Type</label>
            <select
              value={editingUser.userType}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  userType: e.target.value,
                })
              }
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;