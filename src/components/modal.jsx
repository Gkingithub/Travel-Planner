import React from "react";
import "../pages/Admin/Admin.css";

function Modal({ title, children, onClose, onSave }) {

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;

    // Don't interfere with textarea Enter
    if (e.target.tagName === "TEXTAREA") return;

    e.preventDefault();

    // Get all focusable inputs inside the modal
    const formElements = Array.from(
      e.currentTarget.querySelectorAll(
        "input, select, textarea"
      )
    ).filter((el) => !el.disabled);

    const index = formElements.indexOf(e.target);

    // Move to next field
    if (index !== -1 && index < formElements.length - 1) {
      formElements[index + 1].focus();
    } else {
      // Last field -> Save
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
            className="save-btn"
            onClick={onSave}
          >
            Save
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;