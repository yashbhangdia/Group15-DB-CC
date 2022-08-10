import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useBoolean, useDebounce } from "../../../base/hooks";
import { errorNoti } from "../../../base/Notification/Notification";
import Loading from "../../../base/Loading/Loading";
import * as securityService from "../../../services/securityService";
import * as bookService from "../../../services/bookService";
import * as userService from "../../../services/manageUsersService";
import { getErrorMessage } from "../../../utils/generalUtils";
import StandardSelect from "../../shared/forms/StandardSelect/StandardSelect";
import StandardInput from "../../shared/forms/StandardInput/StandardInput";
import "./security-card-list.scss";
import TradeDetails from "../TradeDetails/tradeDetailsModal";

const SecurityCardList = () => {
  const [securities, setSecurities] = useState([]);
  const [assignedBooks, setAssignedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [loading, setLoading] = useBoolean(true);
  const [tradeDetailsPopupOpen, setTradeDetailsPopupOpen] = useBoolean(false);
  const [tradeDetails, setTradeDetails] = useState([]);

  const getUsers = async () => {
    try {
      setLoading.on();
      const us = await userService.getUsers();
      setUsers(us.map((u) => ({ label: u.name, value: u.id })));
      setCurrentUserId(us[0]?.id ?? null);
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  const getSecurities = async () => {
    let filters = { search: debouncedSearchText, issuer: selectedBook };
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
      const books = await bookService.getAssignedBooks(currentUserId);
      setAssignedBooks(books);
      setSelectedBook(books[0]?.bookName ?? null);
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  const getTradeDetails = async (id) => {
    try {
      setLoading.on();
      const secur = await securityService.getSecurityById(id);
      setTradeDetails(secur?.trades ?? []);
      setTradeDetailsPopupOpen.on();
    } catch (e) {
      errorNoti(getErrorMessage(e));
    } finally {
      setLoading.off();
    }
  };

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  useEffect(async () => {
    await getUsers();
  }, []);

  useEffect(() => {
    getAssignedBooks();
  }, [currentUserId]);

  useEffect(() => {
    getSecurities();
  }, [debouncedSearchText, selectedBook]);

  if (loading) <Loading />;
  if (selectedBook === null) return <h6>No Data Found</h6>;
  return (
    <div className="security-card-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="sub-heading">Securities</h3>
        <div className="d-flex">
          <StandardSelect
            options={users}
            value={currentUserId}
            onChange={(e) => setCurrentUserId(e?.value)}
            placeholder="Select a User..."
            isSearchable={true}
            className="me-3"
          />
          <StandardSelect
            options={assignedBooks.map((ab) => ({
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
      {/* <div className="d-flex mb-3 justify-content-between align-items-center">
        <StandardInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search here..."
        />
      </div> */}
      <Row>
        {securities.map((security) => (
          <Col xs={12} sm={6} md={4} xl={3}>
            <Card
              onClick={() => getTradeDetails(security.id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Header
                style={{
                  textTransform: "capitalize",
                  backgroundColor:
                    new Date(security.maturityDate) < new Date()
                      ? "#F94C66"
                      : monthDiff(
                          new Date(),
                          new Date(security.maturityDate)
                        ) <= 1
                      ? "#FFC54D"
                      : "#53BF9D",
                  color: "white",
                }}
              >
                {security.type}
              </Card.Header>
              <Card.Body>
                <Card.Title>ISIN: {security.isin}</Card.Title>
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
