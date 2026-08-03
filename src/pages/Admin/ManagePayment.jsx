import { useEffect, useState } from "react";
import {
    getPayments,
    approvePayment,
    rejectPayment
} from "../../service/adminPaymentService";

function ManagePayments() {

    const [payments, setPayments] = useState([]);

    const loadPayments = async () => {
        const res = await getPayments();
        setPayments(res.data);
    };

    useEffect(() => {
        loadPayments();
    }, []);

    return (
        <div>
            <h2>Manage Payments</h2>
        </div>
    );
}

export default ManagePayments;