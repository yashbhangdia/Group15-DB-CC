import React, { useEffect, useState } from "react";
import { useBoolean, useDebounce } from "../../../base/hooks";
import { Table } from "react-bootstrap";
import Loading from "../../../base/Loading/Loading";
import * as bookService from "../../../services/bookService";
import * as tradeService from "../../../services/tradeService";
import StandardSelect from "../../shared/forms/StandardSelect/StandardSelect";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import "./trade-list.scss";
import Modal from "react-bootstrap/Modal";
import { errorNoti } from "../../../base/Notification/Notification";
import { getErrorMessage } from "../../../utils/generalUtils";

const TradesList = () => {
  const [trades, setTrades] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const [loading, setLoading] = useBoolean(true);
  const [assignedBooks, setAssignedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const getTrades = async () => {
    try {
      setLoading.on();
      const filters = {
        search: debouncedSearchText,
        book: selectedBook,
      };
      const trs = await tradeService.getTrades(filters);
      setTrades(trs);
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  useEffect(() => {
    getTrades();
  }, [debouncedSearchText, selectedBook]);

  const showSecurity = () => {
    setShow(true);
  };

  const hideSecurity = () => {
    setShow(false);
  };

  const getAssignedBooks = async () => {
    try {
      setLoading.on();
      const books = await bookService.getAssignedBooks();
      setAssignedBooks(books);
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  useEffect(() => {
    getAssignedBooks();
  }, []);

  return (
    <div className="trades-list">
      <div className="mb-3 d-flex justify-content-between">
        <h2>Trade List</h2>
        <StandardSelect
          options={assignedBooks.map((ab) => ({
            label: ab.name,
            value: ab.id,
          }))}
          value={selectedBook}
          onChange={(e) => setSelectedBook(e?.value)}
          placeholder="Select a Book..."
          isClearable={true}
          isSearchable={true}
        />
      </div>
      <div className="d-flex mb-3 justify-content-between align-items-center">
        <StandardInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search here..."
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Table hover bordered responsive className="trade-table">
          <thead>
            <tr>
              <th>Trade Id</th>
              <th>Security ISIN</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Buy / Sell</th>
              <th>Trade Date</th>
              <th>Settlement Date</th>
              <th>Counter Party</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <>
                <tr
                  key={trade.id}
                  onClick={() => {
                    setModalData(trade.security);
                    showSecurity();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td>{trade.id}</td>
                  <td>{trade.security.inis}</td>
                  <td>{trade.quantity}</td>
                  <td>{trade.price}</td>
                  <td>{trade.buy_sell}</td>
                  <td>{trade.tradeDate.split("T")[0]}</td>
                  <td>{trade.settlementDate.split("T")[0]}</td>
                  <td>{trade.counterparty.name}</td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      )}
      <Modal centered show={show} onHide={hideSecurity}>
        <Modal.Header closeButton>
          <Modal.Title>Security</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <ul>
            <li>
              <b>Maturity Date </b>: <span>{modalData.maturityDate}</span>
            </li>
            <li>
              <b>Status </b>: <span>{modalData.status}</span>
            </li>
            <li>
              <b>Type </b>: <span>{modalData.type}</span>
            </li>
            <li>
              <b>Issuer </b>: <span>{modalData.issuer}</span>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TradesList;
