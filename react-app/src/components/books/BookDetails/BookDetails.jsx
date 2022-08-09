import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import Loading from "../../../base/Loading/Loading";
import * as bookService from "../../../services/bookService";
import { useBoolean } from "../../../base/hooks";
import { errorNoti } from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";
import "./book-details.scss";

const BookDetails = ({ show, hide, book }) => {
  const [loading, setLoading] = useBoolean(true);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const getAssignedUsersOfBook = async (bookId) => {
    try {
      setLoading.on();
      const users = await bookService.getAssignedUsersOfBook(bookId);
      setAssignedUsers(users);
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  useEffect(() => {
    if (book) {
      getAssignedUsersOfBook(book.id);
    }
  }, [show, book]);
  return (
    <Modal
      show={show}
      size="md"
      onHide={hide}
      dialogClassName="book-details-popup"
      fullscreen="sm-down"
      centered
    >
      <Modal.Header>
        <Modal.Title>Details of {book?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loading />
        ) : (
          <Table hover responsive className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {assignedUsers.length === 0 && (
                <tr key="No data">
                  <td colSpan={3}>No Data</td>
                </tr>
              )}
              {assignedUsers.length > 0 &&
                assignedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookDetails;
