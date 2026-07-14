import api from "./api";

export const saveTrip = async (trip) => {
  const response = await api.post("/Trip/save", trip);
  return response.data;
};


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
export const getTripDetails = async (tripId) => {
    const response = await api.get(`/trip/${tripId}`);
    return response.data;
};