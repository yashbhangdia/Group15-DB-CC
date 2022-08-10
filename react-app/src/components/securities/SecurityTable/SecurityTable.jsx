import React, { useEffect, useState } from "react";
import { useBoolean } from "../../../base/hooks";
import { Table } from "react-bootstrap";
import * as securityService from "../../../services/securityService";
import * as bookService from "../../../services/bookService";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import StandardSelect from "../../shared/forms/StandardSelect/StandardSelect";
import SecurityForm from "../SecurityForm/SecurityForm";
import "./security-table.scss";
import IconButton from "../../shared/forms/IconButton/IconButton";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { colors } from "../../../config/colors";
import ConfirmationPopup from "../../shared/ConfirmationPopup/ConfirmationPopup";
import {
  errorNoti,
  successNoti,
} from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";
import Loading from "../../../base/Loading/Loading";

const SecurityTable = () => {
  const [securities, setSecurities] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useBoolean(true);
  const [securityFormOpen, setSecurityFormOpen] = useBoolean(false);
  const [isEditMode, setIsEditMode] = useBoolean(false);
  const [securityData, setSecurityData] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useBoolean(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUserDetailsPopup, setShowUserDetailsPopup] = useBoolean(false);

  const getSecurities = async () => {
    try {
      setLoading.on();
      const filters = { issuer: selectedBook };
      const securityList = await securityService.getSecurities(filters);
      setSecurities(securityList);
    } catch (e) {
    } finally {
      setLoading.off();
    }
  };

  const getBooks = async () => {
    try {
      setLoading.on();
      const bks = await bookService.getAllBooks({ issuer: selectedBook });
      setBooks(bks);
    } catch (er) {
      errorNoti(getErrorMessage(er));
    } finally {
      setLoading.off();
    }
  };

  const deleteSecurity = async (securityId) => {
    try {
      setLoading.on();
      await securityService.deleteSecurity(securityId);
      successNoti("Security Deleted");
      getSecurities();
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  useEffect(() => {
    getSecurities();
  }, [selectedBook]);

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="users-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="sub-heading">Security List</h3>
        <div className="d-flex">
          <StandardButton
            text="Add Security"
            className="btn-sm me-3"
            color="btn-primary"
            onClick={() => setSecurityFormOpen.on()}
          />
          <StandardSelect
            options={books.map((ab) => ({
              label: ab.bookName,
              value: ab.bookName,
            }))}
            value={selectedBook}
            onChange={(e) => setSelectedBook(e?.value)}
            placeholder="Select a Book..."
            isClearable={true}
            isSearchable={true}
          />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Table hover bordered responsive className="user-table">
          <thead>
            <tr>
              <th>ISIN</th>
              <th>CUSIP</th>
              <th>Issuer</th>
              <th>Maturity Date</th>
              <th>Coupon</th>
              <th>Type</th>
              <th>Face Value</th>
              <th>Status</th>
              <th className="text-center actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {securities.map((sec) => {
              const openUserPopup = () => {
                setShowUserDetailsPopup.on();
                setSecurityData(sec);
              };
              return (
                <tr key={sec.id}>
                  <td>{sec.isin}</td>
                  <td>{sec.cusip}</td>
                  <td>{sec.issuer}</td>
                  <td>{sec.maturityDate}</td>
                  <td>{sec.coupon}</td>
                  <td>{sec.type}</td>
                  <td>{sec.faceValue}</td>
                  <td>{sec.status}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-around align-items-center">
                      <IconButton
                        Icon={PencilFill}
                        onClick={() => {
                          setIsEditMode.on();
                          setSecurityData(sec);
                          setSecurityFormOpen.on();
                        }}
                        iconProps={{ color: "#444444" }}
                      />
                      <IconButton
                        Icon={TrashFill}
                        onClick={() => {
                          setSecurityData(sec);
                          setShowDeletePopup.on();
                        }}
                        iconProps={{ color: colors.danger }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {/* <UserDetails
        show={showUserDetailsPopup}
        hide={() => {
          setShowUserDetailsPopup.off();
          setSecurityData(null);
        }}
        user={securityData}
      /> */}
      <SecurityForm
        show={securityFormOpen}
        hide={() => {
          setSecurityFormOpen.off();
          setIsEditMode.off();
          setSecurityData(null);
        }}
        isEditMode={isEditMode}
        oldData={securityData}
        saveCB={getSecurities}
      />
      <ConfirmationPopup
        isOpen={showDeletePopup}
        title="Are you sure you want to delete?"
        onConfirm={() => {
          deleteSecurity(securityData?.id);
          setShowDeletePopup.off();
          setSecurityData(null);
        }}
        onCancel={() => {
          setShowDeletePopup.off();
          setSecurityData(null);
        }}
        danger
      />
    </div>
  );
};

export default SecurityTable;
