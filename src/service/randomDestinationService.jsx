import api from "./api";

export const getRandomDestinations = async () => {
  const response = await api.get("/randomDestination");
  return response.data;
};