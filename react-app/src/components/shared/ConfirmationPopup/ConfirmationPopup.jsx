import React from "react";
import { Modal } from "react-bootstrap";
import StandardButton from "../forms/StandardButton/StandardButton";
import "./confirmation-popup.scss";

const ConfirmationPopup = ({
  isOpen,
  title,
  content,
  confirm = "Confirm",
  cancel = "Cancel",
  onConfirm,
  onCancel,
  confirmAction,
  cancelAction,
  danger,
}) => {
  const confirmCTA =
    confirmAction === undefined ? (
      <StandardButton
        text={confirm}
        className="btn-sm"
        color={danger ? "btn-danger" : "btn-success"}
        onClick={onConfirm}
      />
    ) : (
      confirmAction
    );
  const cancelCTA =
    cancelAction === undefined ? (
      <StandardButton
        text={cancel}
        color="btn-outline-dark"
        onClick={onCancel}
        className="me-3 btn-sm"
      />
    ) : (
      cancelAction
    );
  return (
    <Modal
      show={isOpen}
      size="md"
      centered
      dialogClassName="confirmation-popup"
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-4 pt-0">
        <div className={`content ${content ? "mb-3" : ""}`}>{content}</div>
        <div className="d-flex justify-content-end align-items-center">
          {cancelCTA}
          {confirmCTA}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationPopup;
