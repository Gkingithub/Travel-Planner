import api from "./api";

// GET ALL
export const getActivities = async () => {
  const response = await api.get("/admin/DestinationActivity");
  console.log(response.data);
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
export const createActivity = async (activity) => {
  const response = await api.post(
    "/admin/DestinationActivity",
    activity
  );

  return response.data;
};

// UPDATE
export const updateActivity = async (id, activity) => {
  const response = await api.put(
    `/admin/DestinationActivity/${id}`,
    activity
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