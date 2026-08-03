import api from "./api";

// Get payment details by booking
export const getPaymentByBooking = async (bookingId) => {
    const response = await api.get(`/payments/booking/${bookingId}`);
    return response.data;
};

// Dummy payment submission
export const payNow = async (paymentId) => {
    const response = await api.post(`/payments/pay/${paymentId}`);
    return response.data;
};