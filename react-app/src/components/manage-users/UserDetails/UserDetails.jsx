import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import Loading from "../../../base/Loading/Loading";
import * as bookService from "../../../services/bookService";
import { useBoolean } from "../../../base/hooks";
import { errorNoti } from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";
import "./user-details.scss";

const UserDetails = ({ show, hide, user }) => {
  const [loading, setLoading] = useBoolean(true);
  const [assignedBooks, setAssignedBooks] = useState([]);
  const getAssignedBooksOfUser = async (bookId) => {
    try {
      setLoading.on();
      const users = await bookService.getAssignedBooks(bookId);
      setAssignedBooks(users);
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  useEffect(() => {
    if (user) {
      getAssignedBooksOfUser(user.id);
    }
  }, [show, user]);
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
        <Modal.Title>Details of {user?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loading />
        ) : (
          <Table hover responsive className="book-table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {assignedBooks.length === 0 && (
                <tr key="No data">
                  <td>No Data</td>
                </tr>
              )}
              {assignedBooks.length > 0 &&
                assignedBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.name}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UserDetails;
