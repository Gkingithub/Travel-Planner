import api from "./api";

export const getHotelRecommendations = async (data) => {
  const response = await api.get("/HotelRecommendation", data);
  return response.data;
};


// GET all hotels
export const getHotels = async () => {
  const response = await api.get("/Hotel");
  return response.data;
};

// GET hotel by ID
export const getHotelById = async (id) => {
  const response = await api.get(`/Hotel/${id}`);
  return response.data;
};

// CREATE hotel
export const createHotel = async (hotel) => {
  const formData = new FormData();

  formData.append("HotelName", hotel.hotelName);
  formData.append("PricePerNight", hotel.pricePerNight);
  formData.append("Rating", hotel.rating);
  formData.append("Category", hotel.category);
  formData.append("Facilities", hotel.facilities);
  formData.append("DestinationId", hotel.destinationId);

  if (hotel.imageUrl) {
    formData.append("Image", hotel.imageUrl);
  }

  const response = await api.post("/Hotel", formData);

  return response.data;
};

// UPDATE hotel
export const updateHotel = async (id, hotel) => {
  const formData = new FormData();

  formData.append("HotelName", hotel.hotelName);
  formData.append("PricePerNight", hotel.pricePerNight);
  formData.append("Rating", hotel.rating);
  formData.append("Category", hotel.category);
  formData.append("Facilities", hotel.facilities);
  formData.append("DestinationId", hotel.destinationId);

  if (hotel.imageUrl instanceof File) {
    formData.append("Image", hotel.imageUrl);
  }

  const response = await api.put(`/Hotel/${id}`, formData);

  return response.data;
};

// DELETE hotel
export const deleteHotel = async (id) => {
  const response = await api.delete(`/Hotel/${id}`);
  return response.data;
};