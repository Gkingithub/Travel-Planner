import api from "./api";

// GET all destination features
export const getDestinationFeatures = async () => {
  const response = await api.get("/DestinationFeature");
  return response.data;
};

// GET destination feature by ID
export const getDestinationFeatureById = async (id) => {
  const response = await api.get(`/DestinationFeature/${id}`);
  return response.data;
};

// GET feature by Destination ID
export const getFeatureByDestination = async (destinationId) => {
  const response = await api.get(
    `/DestinationFeature/destination/${destinationId}`
  );
  return response.data;
};

// CREATE destination feature
export const createDestinationFeature = async (feature) => {
  const response = await api.post("/DestinationFeature", feature);
  return response.data;
};

// UPDATE destination feature
export const updateDestinationFeature = async (id, feature) => {
  const response = await api.put(
    `/DestinationFeature/${id}`,
    feature
  );
  return response.data;
};

// DELETE destination feature
export const deleteDestinationFeature = async (id) => {
  const response = await api.delete(`/DestinationFeature/${id}`);
  return response.data;
};