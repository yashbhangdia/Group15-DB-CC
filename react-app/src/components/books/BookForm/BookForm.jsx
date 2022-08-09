import React, { useState, useEffect } from "react";
import { useBoolean } from "../../../base/hooks";
import { Modal } from "react-bootstrap";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import { BookValidation } from "../../../validations/BookValidation";
import * as bookService from "../../../services/bookService";
import validationFunctions from "../../../utils/validationUtils";
import "./book-form.scss";

const BookForm = ({ show, hide, oldData, isEditMode, saveCB }) => {
  const [showError, setShowError] = useBoolean(false);
  const [name, setName] = useState("");
  const [btnDisabled, setBtnDisabled] = useBoolean(false);

  const onCancel = () => {
    setName("");
    hide();
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
      if (isEditMode) {
        await bookService.updateBook(bookId, data);
      } else {
        await bookService.addBook(data);
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
