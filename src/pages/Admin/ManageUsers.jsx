import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import Modal from "../../components/modal";
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
const [errors, setErrors] = useState({});
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
  const validationErrors = {};

  // Full Name
  if (!editingUser.fullName.trim()) {
    validationErrors.fullName = "Full name is required.";
  } else if (editingUser.fullName.trim().length < 3) {
    validationErrors.fullName =
      "Full name must be at least 3 characters.";
  }

  // Email
  if (!editingUser.email.trim()) {
    validationErrors.email = "Email is required.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingUser.email)
  ) {
    validationErrors.email = "Enter a valid email address.";
  }

  // Password (only while adding)
  if (
    editingUser.userId === 0 &&
    !editingUser.passwordHash.trim()
  ) {
    validationErrors.passwordHash = "Password is required.";
  } else if (
    editingUser.userId === 0 &&
    editingUser.passwordHash.length < 6
  ) {
    validationErrors.passwordHash =
      "Password must be at least 6 characters.";
  }

  // User Type
  if (!editingUser.userType) {
    validationErrors.userType = "User type is required.";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  try {
    if (editingUser.userId > 0) {
      await updateUser(editingUser.userId, editingUser);
    } else {
      await createUser(editingUser);
    }

    await loadUsers();

    setShowModal(false);
    setEditingUser(null);
    setErrors({});
  } catch (error) {
    console.log(error);

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    }
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
              users.map((user,index) => (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
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
{errors.fullName && (
  <p className="error">{errors.fullName}</p>
)}
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
{errors.email && (
  <p className="error">{errors.email}</p>
)}
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
{errors.passwordHash && (
  <p className="error">{errors.passwordHash}</p>
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