import React, { useEffect, useState } from "react";
import { useBoolean } from "../../../base/hooks";
import { Table } from "react-bootstrap";
import * as bookService from "../../../services/bookService";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import BookForm from "../BookForm/BookForm";
import "./book-list.scss";
import IconButton from "../../shared/forms/IconButton/IconButton";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { colors } from "../../../config/colors";
import ConfirmationPopup from "../../shared/ConfirmationPopup/ConfirmationPopup";
import {
  errorNoti,
  successNoti,
} from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";
import BookDetails from "../BookDetails/BookDetails";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showBookDetailsPopup, setShowBookDetailsPopup] = useBoolean(false);
  const [bookDetail, setBookDetail] = useState(null);
  const [loading, setLoading] = useBoolean(true);
  const [bookFormPopupOpen, setBookFormPopupOpen] = useBoolean(false);
  const [isEditMode, setIsEditMode] = useBoolean(false);
  const [bookOldData, setBookOldData] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useBoolean(false);

  const hideBookDetails = () => {
    setShowBookDetailsPopup.off();
    setBookDetail(null);
  };

  const getBooks = async () => {
    try {
      setLoading.on();
      const filters = {};
      const bookList = await bookService.getAllBooks(filters);
      setBooks(bookList);
    } catch (e) {
    } finally {
      setLoading.off();
    }
  };

  const deleteBook = async (bookId) => {
    try {
      setLoading.on();
      await bookService.deleteBook(bookId);
      successNoti("Book Deleted");
      getBooks();
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="book-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="sub-heading">Book List</h3>
        <StandardButton
          text="Add Book"
          className="btn-sm"
          color="btn-primary"
          onClick={() => setBookFormPopupOpen.on()}
        />
      </div>
      <Table hover bordered responsive className="book-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th className="text-center actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowBookDetailsPopup.on();
                  setBookDetail(book);
                }}
              >
                {book.name}
              </td>
              <td className="text-center">
                <div className="d-flex justify-content-around align-items-center">
                  <IconButton
                    Icon={PencilFill}
                    onClick={() => {
                      setIsEditMode.on();
                      setBookOldData(book);
                      setBookFormPopupOpen.on();
                    }}
                    iconProps={{ color: "#444444" }}
                  />
                  <IconButton
                    Icon={TrashFill}
                    onClick={() => {
                      setShowDeletePopup.on();
                    }}
                    iconProps={{ color: colors.danger }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BookDetails
        show={showBookDetailsPopup}
        hide={hideBookDetails}
        book={bookDetail}
      />
      <BookForm
        show={bookFormPopupOpen}
        hide={() => {
          setBookFormPopupOpen.off();
          setIsEditMode.off();
          setBookOldData.apply(null);
        }}
        isEditMode={isEditMode}
        oldData={bookOldData}
      />
      <ConfirmationPopup
        isOpen={showDeletePopup}
        title="Are you sure you want to delete?"
        onConfirm={() => {
          deleteBook();
          setShowDeletePopup.off();
        }}
        onCancel={() => {
          setShowDeletePopup.off();
        }}
        danger
      />
    </div>
  );
};

export default BookList;
