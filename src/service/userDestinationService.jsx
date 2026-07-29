import api from "./api";

export const getDestinationFeature = async (search = "") => {
  const response = await api.get(
    `/DestinationFeature?search=${encodeURIComponent(search)}`
  );

  return response.data;
};

export const getDestinations = async (search = "") => {
  const response = await api.get(
    `/user/destination?search=${encodeURIComponent(search)}`
  );

  return response.data;
};
export const getDestinationActivities = async (id) => {
  const response = await api.get(
    `/user/destination/${id}/activities`
  );

  return response.data;
};


// SEARCH DESTINATION
export const searchDestinations = async(keyword)=>{

    const response = await api.get(
        `/SearchDestination/destination?keyword=${encodeURIComponent(keyword)}`
    );

    return response.data;
};