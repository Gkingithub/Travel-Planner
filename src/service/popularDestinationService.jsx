import api from "./api";

export const getPopularDestinations = async () => {
  try {
    const response = await api.get("/PopularDestination");

    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Popular Destination Error:", error);

    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Something went wrong.",
    };
  }
};