import api from "./api";

export const getDestinations = async () => {
    const response = await api.get("/user/destination");
    return response.data;
};