import React, { useState, useEffect } from "react";
import { useBoolean } from "../../../base/hooks";
import { Modal } from "react-bootstrap";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import { BookValidation } from "../../../validations/BookValidation";
import * as bookService from "../../../services/bookService";
import * as userService from "../../../services/manageUsersService";
import validationFunctions from "../../../utils/validationUtils";
import "./book-form.scss";
import { errorNoti } from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";
import StandardSelect from "../../shared/forms/StandardSelect/StandardSelect";

const BookForm = ({ show, hide, oldData, isEditMode, saveCB }) => {
  const [showError, setShowError] = useBoolean(false);
  const [loading, setLoading] = useBoolean(true);
  const [name, setName] = useState("");
  const [userList, setUserList] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [btnDisabled, setBtnDisabled] = useBoolean(false);

  const onCancel = () => {
    setName("");
    setAssignedUsers([]);
    setUserList([]);
    hide();
  };

  const getUsers = async () => {
    try {
      setLoading.on();
      const users = await userService.getUsers({});
      setUserList(users);
      if (isEditMode) {
        const alreadyAssigned = await bookService.getAssignedUsersOfBook(
          oldData.id
        );
        setAssignedUsers(alreadyAssigned.map((aa) => aa.id));
      }
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  const saveBook = async () => {
    let data = { bookName: name };
    let bookId = oldData?.id;
    if (!validationFunctions.checkFormValidity(data, BookValidation)) {
      setShowError.on();
      return;
    }
    try {
      setBtnDisabled.on();
      let book;
      if (isEditMode) {
        book = await bookService.updateBook(bookId, data);
      } else {
        book = await bookService.addBook(data);
      }
      for (let i = 0; i < assignedUsers.length; i++) {
        await bookService.assignUserToBook({
          book,
          user: userList.find((u) => u.id === assignedUsers[i]),
        });
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
      setName(oldData.bookName);
    }
  }, [isEditMode, oldData]);

  useEffect(() => {
    if (show) {
      getUsers();
    }
  }, [show]);

  useEffect(() => {
    console.log(assignedUsers);
  }, [assignedUsers]);

  return (
    <Modal
      show={show}
      size="md"
      onHide={onCancel}
      dialogClassName="book-form-popup"
      fullscreen="sm-down"
      centered
    >
      <Modal.Header>
        <Modal.Title>{isEditMode ? "Edit" : "Add"} Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <StandardInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            label="Name"
            inputId="name"
            validations={BookValidation.name}
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardSelect
            value={assignedUsers}
            isMultiple={true}
            options={userList.map((user) => ({
              value: user.id,
              label: `${user.id} - ${user.name}`,
            }))}
            placeholder="Select users..."
            onChange={(vals) => {
              setAssignedUsers(vals.map((v) => v.value));
            }}
            isClearable={true}
            label="Assign users"
          />
        </div>
        <StandardButton
          onClick={saveBook}
          className="btn-block"
          color="btn-primary"
          disabled={btnDisabled}
          text="Save"
        />
      </Modal.Body>
    </Modal>
  );
};

export default BookForm;
