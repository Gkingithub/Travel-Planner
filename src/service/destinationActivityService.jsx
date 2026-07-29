import api from "./api";

// GET ALL
export const getActivities = async () => {
  const response = await api.get("/admin/DestinationActivity");
  return response.data;
};

// GET BY ID
export const getActivityById = async (id) => {
  const response = await api.get(`/admin/DestinationActivity/${id}`);
  return response.data;
};

// GET BY DESTINATION
export const getActivitiesByDestination = async (destinationId) => {
  const response = await api.get(
    `/admin/DestinationActivity/destination/${destinationId}`
  );

  return response.data;
};

// CREATE
export const createActivity = async (formData) => {
  const response = await api.post(
    "/admin/DestinationActivity",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// UPDATE
export const updateActivity = async (id, formData) => {
  const response = await api.put(
    `/admin/DestinationActivity/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// DELETE
export const deleteActivity = async (id) => {
  const response = await api.delete(
    `/admin/DestinationActivity/${id}`
  );

  return response.data;
};