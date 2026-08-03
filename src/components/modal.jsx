import React, { useEffect } from "react";
import "../pages/Admin/Admin.css";

function Modal({ title, children, onClose, onSave }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;

    // Allow new lines in textarea
    if (e.target.tagName === "TEXTAREA") return;

    // Ignore select dropdown
    if (e.target.tagName === "SELECT") return;

    e.preventDefault();

    const fields = Array.from(
      e.currentTarget.querySelectorAll(
        "input, select, textarea"
      )
    ).filter((el) => !el.disabled);

    const currentIndex = fields.indexOf(e.target);

    if (currentIndex !== -1 && currentIndex < fields.length - 1) {
      fields[currentIndex + 1].focus();
    } else {
      onSave();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onKeyDown={handleEnter}>
        <h2>{title}</h2>

        {children}

        <div className="modal-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="save-btn"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;