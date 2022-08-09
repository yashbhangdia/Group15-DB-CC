import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useBoolean, useDebounce } from "../../../base/hooks";
import { errorNoti } from "../../../base/Notification/Notification";
import * as securityService from "../../../services/securityService";
import * as bookService from "../../../services/bookService";
import { getErrorMessage } from "../../../utils/generalUtils";
import StandardSelect from "../../shared/forms/StandardSelect/StandardSelect";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import "./security-card-list.scss";
import TradeDetails from "../TradeDetails/tradeDetailsModal";

const SecurityCardList = () => {
  const [securities, setSecurities] = useState([]);
  const [assignedBooks, setAssignedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [loading, setLoading] = useBoolean(true);
  const [tradeDetailsPopupOpen, setTradeDetailsPopupOpen] = useBoolean(false);
  const [tradeDetails, setTradeDetails] = useState([]);

  const getSecurities = async () => {
    let filters = { search: searchText };
    try {
      setLoading.on();
      const securs = await securityService.getSecurities(filters);
      setSecurities(securs);
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
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

  const getTradeDetails = async (id) => {
    try {
      setLoading.on();
      const trades = await securityService.getTrades(id);
      setTradeDetails(trades);
      setTradeDetailsPopupOpen.on();
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  useEffect(() => {
    getAssignedBooks();
  }, []);

  useEffect(() => {
    getSecurities();
  }, [debouncedSearchText]);

  return (
    <div className="security-card-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="sub-heading">Securities</h3>
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
      <Row>
        {securities.map((security) => (
          <Col xs={1} sm={2} md={3} lg={4}>
            <Card
              onClick={() => getTradeDetails(security.id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Header style={{ textTransform: "capitalize" }}>
                {security.type}
              </Card.Header>
              <Card.Body>
                <Card.Title>ISIN: {security.inis}</Card.Title>
                <Card.Subtitle className="text-muted">
                  {security.status}
                </Card.Subtitle>
                <Card.Text className="pt-3">
                  <ul className="security-details">
                    <li>
                      <b>Maturity Date </b>:{" "}
                      {security.maturityDate.split("T")[0]}
                    </li>
                    <li>
                      <b>Face Value </b>: {security.faceValue}
                    </li>
                    <li>
                      <b>Coupon </b>: {security.coupon}
                    </li>
                    <li>
                      <b>Issuer </b>: {security.issuer}
                    </li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <TradeDetails
        show={tradeDetailsPopupOpen}
        hide={() => {
          setTradeDetailsPopupOpen.off();
          setTradeDetails([]);
        }}
        tradeData={tradeDetails}
      />
    </div>
  );
};

export default SecurityCardList;
