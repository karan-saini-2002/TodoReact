// src/Modal.jsx
import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Task Details</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <p className="modal-task-text">{task.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
