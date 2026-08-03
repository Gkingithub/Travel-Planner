import api from "./api"; // change path if your api file location is different


const ADMIN_BOOKING_URL = "/admin/bookings";


export const getPendingBookings = async () => {

    const response = await api.get(
        `${ADMIN_BOOKING_URL}/pending`
    );

    return response.data;
};

//Get Booking Details 
export const getBookingDetails = async (bookingId) => {
    const response = await api.get(`/admin/bookings/${bookingId}`);
    return response.data;
};
export const approveBooking = async (id) => {
    const response = await api.post(
        `${ADMIN_BOOKING_URL}/approve/${id}`
    );

    return response.data;
};

export const rejectBooking = async (id, remark) => {
    const response = await api.post(
        `${ADMIN_BOOKING_URL}/reject/${id}`,
        remark,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
};



export const getBookingHistory = async () => {

    const response = await api.get(
        `${ADMIN_BOOKING_URL}/history`
    );

    return response.data;
};



export const deleteBooking = async (id) => {

    const response = await api.delete(
        `${ADMIN_BOOKING_URL}/delete/${id}`
    );

    return response.data;
};