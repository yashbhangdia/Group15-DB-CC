import React, { useState, useEffect } from "react";
import { useBoolean } from "../../../base/hooks";
import { Modal } from "react-bootstrap";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import * as securityService from "../../../services/securityService";
import "./index.scss";

// TODO: add role field
const Form = ({ show, hide, oldData, isEditMode }) => {
  const [showError, setShowError] = useBoolean(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [btnDisabled, setBtnDisabled] = useBoolean(false);

  const onCancel = () => {
    setName("");
    setEmail("");
    hide();
  };

  const saveSecurity = async () => {
    let data = { name, email };
    let securityId = oldData?.id;
    try {
      setBtnDisabled.on();
      if (isEditMode) {
        await securityService.addSecurity(securityId, data);
      } else {
        await securityService.addSecurity(data);
      }
    } catch (e) {
    } finally {
      setBtnDisabled.off();
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setEmail(oldData.email);
      setName(oldData.name);
    }
  }, [isEditMode, oldData]);

  return (
    <Modal
      show={show}
      size="md"
      onHide={onCancel}
      dialogClassName="add-user-popup"
      fullscreen="sm-down"
      centered
    >
      <Modal.Header>
        <Modal.Title>{isEditMode ? "Edit" : "Add"} Security</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <StandardInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            label="Name"
            inputId="name"
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email"
            inputId="email"
            showError={showError}
          />
        </div>
        <StandardButton
          onClick={saveSecurity}
          className="btn-block"
          color="btn-primary"
          disabled={btnDisabled}
          text="Save"
        />
      </Modal.Body>
    </Modal>
  );
};

export default Form;
