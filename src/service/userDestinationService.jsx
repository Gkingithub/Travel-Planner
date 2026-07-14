import api from "./api";

export const getDestinations = async () => {
    const response = await api.get("/user/destination");
    return response.data;
};
export const getDestinationActivities = async (id) => {
  const response = await api.get(`/user/destination/${id}/activities`);
  return response.data;
};