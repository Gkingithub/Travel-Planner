import api from "./api";


const API_URL = "/Booking";



// CREATE BOOKING

export const createBooking = async (tripId) => {

    try {

        const response = await api.post(
            `${API_URL}/create/${tripId}`,
            {}
        );

        return response.data;

    }
    catch(error) {

        return {
            success:false,
            message:
                error.response?.data?.message ||
                "Booking failed"
        };

    }

};




// GET USER BOOKINGS

export const getMyBookings = async () => {

    try {

        const response = await api.get(
            `${API_URL}/my-bookings`
        );

        return response.data;

    }
    catch(error) {

        return {
            success:false,
            message:
                error.response?.data?.message ||
                "Unable to load bookings"
        };

    }

};




// CANCEL BOOKING

export const cancelBooking = async (bookingId) => {

    try {

        const response = await api.delete(
            `${API_URL}/cancel/${bookingId}`
        );

        return response.data;

    }
    catch(error) {

        return {
            success:false,
            message:
                error.response?.data?.message ||
                "Cancel failed"
        };

    }

};