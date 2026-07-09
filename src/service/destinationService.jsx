import api from "./api";

export const getDestinations = async () => {
  const response = await api.get("/Destination");
  return response.data;
};

export const createDestination = async (destination) => {
  const formData = new FormData();

  formData.append("Name", destination.name);
  formData.append("City", destination.city);
  formData.append("Country", destination.country);
  formData.append("Description", destination.description);
  formData.append("AverageBudget", destination.averageBudget);

  if (destination.imageUrl) {
    formData.append("Image", destination.imageUrl);
  }

  const response = await api.post("/Destination", formData);

  return response.data;
};

export const updateDestination = async (id, destination) => {
  const formData = new FormData();

  formData.append("Name", destination.name);
  formData.append("City", destination.city);
  formData.append("Country", destination.country);
  formData.append("Description", destination.description);
  formData.append("AverageBudget", destination.averageBudget);

  if (destination.imageUrl instanceof File) {
    formData.append("Image", destination.imageUrl);
  }

  const response = await api.put(`/Destination/${id}`, formData);

  return response.data;
};

export const deleteDestination = async (id) => {
  const response = await api.delete(`/Destination/${id}`);
  return response.data;
};