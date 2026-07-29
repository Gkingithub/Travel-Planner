import api from "./api";

export const getHotelRecommendations = async () => {
  try {
    const response = await api.get("/HotelRecommendation");

    return {
      success: response.data.success,
      data: response.data.data || [],
      message: response.data.message,
    };
  } catch (error) {
    console.error("Hotel Recommendation Error:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch hotel recommendations",
    };
  }
};


// GET all hotels
export const getHotels = async (
  page = 1,
  pageSize = 10,
  search = ""
) => {
  try {

    const response = await api.get(
      `/Hotel?page=${page}&pageSize=${pageSize}&search=${search}`
    );

    return response.data;

  } catch (error) {
    console.log(error);
    throw error;
  }
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


  // NEW FIELDS
  formData.append(
    "ContactNumber",
    hotel.contactNumber
  );


  formData.append(
    "Email",
    hotel.email
  );


  if (hotel.imageUrl) {

    formData.append(
      "Image",
      hotel.imageUrl
    );

  }


  const response = await api.post(
    "/Hotel",
    formData
  );


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


  // NEW FIELDS
  formData.append(
    "ContactNumber",
    hotel.contactNumber
  );


  formData.append(
    "Email",
    hotel.email
  );


  if (hotel.imageUrl instanceof File) {

    formData.append(
      "Image",
      hotel.imageUrl
    );

  }


  const response = await api.put(
    `/Hotel/${id}`,
    formData
  );


  return response.data;
};



// DELETE hotel
export const deleteHotel = async (id) => {

  const response = await api.delete(
    `/Hotel/${id}`
  );

  return response.data;
};