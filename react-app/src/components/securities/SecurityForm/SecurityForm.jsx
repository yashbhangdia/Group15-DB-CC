import React, { useState, useEffect } from "react";
import { useBoolean } from "../../../base/hooks";
import { Modal } from "react-bootstrap";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import StandardSelect from "../../shared/forms/StandardSelect/StandardSelect";
import { SecurityValidation } from "../../../validations/SecurityValidation";
import * as securityService from "../../../services/securityService";
import * as bookService from "../../../services/bookService";
import validationFunctions from "../../../utils/validationUtils";
import "./security-form.scss";
import { errorNoti } from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";

const SecurityForm = ({ show, hide, oldData, isEditMode, saveCB }) => {
  const [showError, setShowError] = useBoolean(false);
  const [securityData, setSecurityData] = useState({
    isin: "",
    cusip: "",
    issuer: "",
    maturityDate: "",
    coupon: "",
    type: "",
    faceValue: "",
    status: "",
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useBoolean(false);
  const [btnDisabled, setBtnDisabled] = useBoolean(false);

  const securityOnChange = (key, value) => {
    setSecurityData((prev) => ({ ...prev, [key]: value }));
  };

  const onCancel = () => {
    setSecurityData({
      isin: "",
      cusip: "",
      issuer: "",
      maturityDate: "",
      coupon: "",
      type: "",
      faceValue: "",
      status: "",
    });
    setShowError.off();
    hide();
  };

  const getBooks = async () => {
    try {
      setLoading.on();
      const bks = await bookService.getAllBooks({});
      setBooks(bks.map((bk) => ({ label: bk.bookName, value: bk.bookName })));
    } catch (er) {
      errorNoti(getErrorMessage(er));
    } finally {
      setLoading.off();
    }
  };

  const saveSecurity = async () => {
    let data = { ...securityData };
    console.log(data);
    let securityId = oldData?.id;
    if (!validationFunctions.checkFormValidity(data, SecurityValidation)) {
      setShowError.on();
      return;
    }
    try {
      setBtnDisabled.on();
      if (isEditMode) {
        await securityService.updateSecurity(securityId, data);
      } else {
        await securityService.addSecurity(data);
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
      setSecurityData({ ...oldData });
    }
  }, [isEditMode, oldData]);

  useEffect(() => {
    if (show) {
      getBooks();
    }
  }, [show]);

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
            value={securityData.isin}
            onChange={(e) => securityOnChange("isin", e.target.value)}
            name="isin"
            label="ISIN"
            inputId="isin"
            validations={SecurityValidation.isin}
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardInput
            value={securityData.cusip}
            onChange={(e) => securityOnChange("cusip", e.target.value)}
            name="cusip"
            label="CUSIP"
            inputId="cusip"
            validations={SecurityValidation.cusip}
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardSelect
            options={books}
            value={securityData.issuer}
            onChange={(e) => securityOnChange("issuer", e?.value)}
            name="issuer"
            label="Issuer"
            inputId="issuer"
            validations={SecurityValidation.issuer}
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardInput
            value={securityData.maturityDate}
            onChange={(e) => securityOnChange("maturityDate", e.target.value)}
            name="maturityDate"
            label="Maturity Date"
            inputId="maturityDate"
            validations={SecurityValidation.maturityDate}
            showError={showError}
            type="date"
          />
        </div>
        <div className="mb-3">
          <StandardInput
            value={securityData.coupon}
            onChange={(e) => securityOnChange("coupon", e.target.value)}
            name="coupon"
            label="Coupon"
            inputId="coupon"
            validations={SecurityValidation.coupon}
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardInput
            value={securityData.faceValue}
            onChange={(e) => securityOnChange("faceValue", e.target.value)}
            name="faceValue"
            label="Face Value"
            inputId="faceValue"
            validations={SecurityValidation.faceValue}
            showError={showError}
            type="number"
          />
        </div>
        <div className="mb-3">
          <StandardInput
            value={securityData.type}
            onChange={(e) => securityOnChange("type", e.target.value)}
            name="type"
            label="Type"
            inputId="type"
            validations={SecurityValidation.type}
            showError={showError}
          />
        </div>
        <div className="mb-3">
          <StandardSelect
            value={securityData.status}
            options={[
              { label: "Active", value: "Active" },
              { label: "Failed", value: "Failed" },
            ]}
            onChange={(e) => securityOnChange("status", e?.value)}
            name="status"
            label="Status"
            inputId="status"
            validations={SecurityValidation.status}
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

export default SecurityForm;
