import api from "./api";

export const generateItinerary = async (tripData) => {
    const response = await api.post(
        "/Itinenary/generate-itinerary",
        tripData
    );

    return response.data;
};
export const getDashboard = async () => {
    const response = await api.get("/user/dashboard");
    return response.data;
};