import React, { useState, useEffect } from "react";
import { useBoolean } from "../../../base/hooks";
import { Modal } from "react-bootstrap";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import { UserValidation } from "../../../validations/UserValidation";
import * as userService from "../../../services/manageUsersService";
import validationFunctions from "../../../utils/validationUtils";
import "./add-user.scss";

// TODO: add role field
const AddUser = ({ show, hide, oldData, isEditMode, saveCB }) => {
  const [showError, setShowError] = useBoolean(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [btnDisabled, setBtnDisabled] = useBoolean(false);

  const onCancel = () => {
    setName("");
    setEmail("");
    setRole("");
    hide();
  };

  const saveUser = async () => {
    let data = { name, email, role };
    let userId = oldData?.id;
    if (!validationFunctions.checkFormValidity(data, UserValidation)) {
      setShowError.on();
      return;
    }
    try {
      setBtnDisabled.on();
      if (isEditMode) {
        await userService.updateUser(userId, data);
      } else {
        await userService.addUser(data);
      }
      onCancel();
      saveCB();
    } catch (e) {
    } finally {
      setBtnDisabled.off();
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setEmail(oldData.email);
      setName(oldData.name);
      setRole(oldData.role);
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
        <Modal.Title>{isEditMode ? "Edit" : "Add"} User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <StandardInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            label="Name"
            inputId="name"
            validations={UserValidation.name}
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
            validations={UserValidation.email}
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardInput
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="role"
            label="Role"
            inputId="role"
            validations={UserValidation.role}
            showError={showError}
          />
        </div>
        <StandardButton
          onClick={saveUser}
          className="btn-block"
          color="btn-primary"
          disabled={btnDisabled}
          text="Save"
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddUser;
