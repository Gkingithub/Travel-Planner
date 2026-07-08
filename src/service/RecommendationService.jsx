import api from "./api";

export const getRecommendations = async (data) => {
  const response = await api.post("/Recommendation/recommend", data);
  return response.data;
};