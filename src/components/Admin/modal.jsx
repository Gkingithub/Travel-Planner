import React from "react";
import "./Admin.css";

function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>{title}</h2>

        {children}

        <div className="modal-buttons">

          <button className="save-btn" onClick={onSave}>
            Save
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default Modal;