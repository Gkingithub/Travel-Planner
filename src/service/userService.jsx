import api from "./api";

// GET all users
export const getUsers = async () => {
  const response = await api.get("/User");
  return response.data;
};

// CREATE user
export const createUser = async (user) => {
  const response = await api.post("/User", user);
  return response.data;
};

// UPDATE user
export const updateUser = async (id, user) => {
  const response = await api.put(`/User/${id}`, user);
  return response.data;
};

// DELETE user
export const deleteUser = async (id) => {
  const response = await api.delete(`/User/${id}`);
  return response.data;
};