import api from "./api";

const URL = "/admin/payments";

export const getPayments = async () => {
    const res = await api.get(URL);
    return res.data;
};

export const approvePayment = async (id) => {
    const res = await api.put(`${URL}/approve/${id}`);
    return res.data;
};

export const rejectPayment = async (id) => {
    const res = await api.put(`${URL}/reject/${id}`);
    return res.data;
};