import React, { useEffect, useState } from "react";
import { useBoolean } from "../../../base/hooks";
import { Table } from "react-bootstrap";
import * as securityService from "../../../services/securityService";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import Form from "../Form";
import "./index.scss";
import IconButton from "../../shared/forms/IconButton/IconButton";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { colors } from "../../../config/colors";
import ConfirmationPopup from "../../shared/ConfirmationPopup/ConfirmationPopup";
import {
  errorNoti,
  successNoti,
} from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";
import Details from "../Details";
import Loading from "../../../base/Loading/Loading";

const List = () => {
  const [securities, setSecurities] = useState([]);
  const [loading, setLoading] = useBoolean(true);
  const [userFormPopupOpen, setUserFormPopupOpen] = useBoolean(false);
  const [isEditMode, setIsEditMode] = useBoolean(false);
  const [securityData, setSecurityData] = useState(null);
  const [showDeletePopup, setDeletePopup] = useBoolean(false);
  const [showDetailsPopup, setDetailsPopup] = useBoolean(false);

  const getSecurities = async () => {
    try {
      setLoading.on();
      const filters = {};
      const securityList = await securityService.getSecurities(filters);
      setSecurities(securityList);
    } catch (e) {
    } finally {
      setLoading.off();
    }
  };

  const deleteSecurity = async (tradeId) => {
    try {
      setLoading.on();
      await securityService.deleteSecurity(tradeId);
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
  }, []);

  return (
    <div className="users-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="sub-heading">Manage Securities</h3>
        <StandardButton
          text="Add Security"
          className="btn-sm"
          color="btn-primary"
          onClick={() => setUserFormPopupOpen.on()}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Table hover bordered responsive className="user-table">
          <thead>
            <tr>
              <th>ISIN</th>
              <th>Issuer</th>
              <th>Maturity</th>
              <th className="text-center actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {securities.map((user) => {
              const openUserPopup = () => {
                setDetailsPopup.on();
                setSecurityData(user);
              };
              return (
                <tr key={user.id}>
                  <td onClick={openUserPopup} style={{ cursor: "pointer" }}>
                    {user.name}
                  </td>
                  <td onClick={openUserPopup} style={{ cursor: "pointer" }}>
                    {user.email}
                  </td>
                  <td onClick={openUserPopup} style={{ cursor: "pointer" }}>
                    {user.role}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-around align-items-center">
                      <IconButton
                        Icon={PencilFill}
                        onClick={() => {
                          setIsEditMode.on();
                          setSecurityData(user);
                          setUserFormPopupOpen.on();
                        }}
                        iconProps={{ color: "#444444" }}
                      />
                      <IconButton
                        Icon={TrashFill}
                        onClick={() => {
                          setDeletePopup.on();
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
      <Details
        show={showDetailsPopup}
        hide={() => {
          setDetailsPopup.off();
          setSecurityData(null);
        }}
        user={securityData}
      />
      <Form
        show={userFormPopupOpen}
        hide={() => {
          setUserFormPopupOpen.off();
          setIsEditMode.off();
          setSecurityData(null);
        }}
        isEditMode={isEditMode}
        oldData={securityData}
      />
      <ConfirmationPopup
        isOpen={showDeletePopup}
        title="Are you sure you want to delete?"
        onConfirm={() => {
          deleteSecurity();
          setDeletePopup.off();
        }}
        onCancel={() => {
          setDeletePopup.off();
        }}
        danger
      />
    </div>
  );
};

export default List;
