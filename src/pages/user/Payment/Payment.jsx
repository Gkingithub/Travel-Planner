import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPaymentByBooking, payNow } from "../../../service/paymentService";
import { deleteNotification } from "../../../service/notificationService";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingId = location.state?.bookingId;
  const notificationId = location.state?.notificationId;

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("");

  // Popup State
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // Payment Details
  const [mobileNumber, setMobileNumber] = useState("");
  const [mpin, setMpin] = useState("");
const getQrImage = () => {
  switch (paymentMethod) {
    case "eSewa":
      return "/images/payment/esewa-qr.png";
    case "Khalti":
      return "/images/payment/khalti-qr.jpg";
    case "Fonepay":
      return "/images/payment/fonepay-qr.jpg";
    default:
      return "/images/payment/default-qr.png";
  }
};
  useEffect(() => {
    if (!bookingId) {
      alert("Booking not found.");
      navigate("/dashboard/notifications");
      return;
    }

    loadPayment();
  }, [bookingId]);

  const loadPayment = async () => {
    try {
      setLoading(true);

      const response = await getPaymentByBooking(bookingId);

      console.log("Payment Response:", response.data);

      setPayment(response.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load payment details.");
      navigate("/dashboard/notifications");
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!/^98\d{8}$/.test(mobileNumber)) {
      alert("Enter a valid mobile number.");
      return;
    }

    if (!/^\d{4}$/.test(mpin)) {
      alert("MPIN must be exactly 4 digits.");
      return;
    }

    try {
      await payNow(payment.paymentId);

      // Delete the payment notification
      if (notificationId) {
        await deleteNotification(notificationId);
      }

      setShowPaymentPopup(false);

      alert("Advance payment completed successfully.");

      setMobileNumber("");
      setMpin("");
      setPaymentMethod("");

      // Update notification badge
      window.dispatchEvent(new Event("notificationUpdated"));

      navigate("/dashboard/trips");
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  if (loading) {
    return (
      <div className="payment-page">
        <h2>Loading payment details...</h2>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="payment-page">
        <h2>Payment details not found.</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard/notifications")}
        >
          Back
        </button>
      </div>
    );
  }
  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2 className="payment-title">Advance Payment</h2>

        <p className="payment-subtitle">
          Please pay the required advance amount to confirm your booking.
        </p>

        <div className="payment-summary">
          <div className="payment-row">
            <span>Total Trip Budget</span>
            <span>Rs. {payment.totalBudget?.toLocaleString()}</span>
          </div>

          <div className="payment-row">
            <span>Advance (20%)</span>
            <span className="advance">
              Rs. {payment.advanceAmount?.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="methods-title">Select Payment Method</div>

        <div className="payment-methods">
          <div
            className={`payment-method ${
              paymentMethod === "eSewa" ? "selected" : ""
            }`}
            onClick={() => setPaymentMethod("eSewa")}
          >
            <img src="/images/payment/esewa.png" alt="eSewa" />
            <p>eSewa</p>
          </div>

          <div
            className={`payment-method ${
              paymentMethod === "Khalti" ? "selected" : ""
            }`}
            onClick={() => setPaymentMethod("Khalti")}
          >
            <img src="/images/payment/khalti.png" alt="Khalti" />
            <p>Khalti</p>
          </div>

          <div
            className={`payment-method ${
              paymentMethod === "Fonepay" ? "selected" : ""
            }`}
            onClick={() => setPaymentMethod("Fonepay")}
          >
            <img src="/images/payment/fonepay.png" alt="Fonepay" />
            <p>Fonepay</p>
          </div>
        </div>

        <div className="qr-title">📱 Scan QR Code</div>

        <div className="qr-image">
          <img src={getQrImage()} alt={`${paymentMethod || "Payment"} QR`} />
        </div>

        <div className="demo-box">
          <strong>Demo Payment</strong>
          <br />
          Scan the QR using eSewa, Khalti or Fonepay. This is a demonstration
          only.
        </div>

        <div className="payment-buttons">
          <button
            className="pay-btn"
            onClick={() => {
              if (!paymentMethod) {
                alert("Please select a payment method.");
                return;
              }

              setShowPaymentPopup(true);
            }}
          >
         Proceed To Paid
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/dashboard/notifications")}
          >
            Cancel
          </button>
        </div>

        {showPaymentPopup && (
          <div className="payment-popup-overlay">
            <div className="payment-popup">
              <h3>Confirm Payment</h3>

              <label>Mobile Number</label>

              <input
                type="text"
                placeholder="98XXXXXXXX"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />

              <label>MPIN</label>

              <input
                type="password"
                maxLength={4}
                placeholder="****"
                value={mpin}
                onChange={(e) => setMpin(e.target.value)}
              />

              <div className="popup-buttons">
                <button className="pay-btn" onClick={handlePayNow}>
                  Confirm Payment
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setShowPaymentPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
