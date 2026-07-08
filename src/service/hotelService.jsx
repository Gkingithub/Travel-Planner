import api from "./api";

export const getHotelRecommendations = async (data) => {
  const response = await api.get("/HotelRecommendation", data);
  return response.data;
};