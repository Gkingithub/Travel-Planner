import api from "./api";

// Save Trip
export const saveTrip = async (trip) => {
  const response = await api.post("/Trip/save", trip);
  return response.data;
};

// Get My Trips
export const getMyTrips = async () => {
  try {
    const response = await api.get("/Trip/my-trips");

    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to load trips.",
    };
  }
};

// Get Trip Details
export const getTripDetails = async (tripId) => {
  const response = await api.get(`/Trip/${tripId}`);
  return response.data;
};

// Complete Trip
export const completeTrip = async (id) => {
  try {
    const response = await api.put(`/Trip/${id}/complete`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to complete trip.",
    };
  }
};

// Delete Trip
export const deleteTrip = async (id) => {
  try {
    const response = await api.delete(`/Trip/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to delete trip.",
    };
  }
};