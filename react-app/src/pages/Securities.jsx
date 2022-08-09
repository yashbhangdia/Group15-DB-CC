import React, { useState, useEffect } from "react";
import AppLayout from "../base/Layout/AppLayout";
import CardGrid from "../components/shared/Cardgrid/cardgrid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from "../components/shared/Search/search";
import { useSearchParams, useLocation } from "react-router-dom";
import qs from "query-string";
import { getSecurities } from "../services/securityService";
import SecurityCardList from "../components/securities/SecurityCardList/SecurityCardList";

const Securities = () => {
  return (
    <AppLayout>
      <SecurityCardList />
    </AppLayout>
  );
};

const SecuritiesOld = () => {
  const [cardgrid, setCardgrid] = useState([]);

  const [searchVal, setSearchVal] = useSearchParams();

  const options = [
    { value: "", label: "Select a Book ..." },
    { value: "Amazon", label: "Amazon" },
    { value: "Google", label: "Google" },
    { value: "Apple", label: "Apple" },
  ];

  const location = useLocation();

  useEffect(() => {
    if (searchVal.get("search") || searchVal.get("book")) {
      //backend call for cardGrid;
      getSecurities(searchVal).then((data) => {
        //set card grid with the response
      });
    } else {
      //backend call for all securities
      getSecurities().then((data) => {
        //set card grid with the response
      });
      setCardgrid([
        {
          id: 1001,
          inis: "xyz123",
          cusip: "abc",
          issuer: "apple",
          maturityDate: "2023-08-31T18:30:00.000+00:00",
          coupon: "1001-a",
          type: "asset",
          faceValue: 1000,
          status: "active",
        },
        {
          id: 1002,
          inis: "tdz785",
          cusip: "ghd",
          issuer: "google",
          maturityDate: "2025-10-13T18:30:00.000+00:00",
          coupon: "1002-b",
          type: "instrument",
          faceValue: 2000,
          status: "active",
        },
        {
          id: 1003,
          inis: "askhd234",
          cusip: "shdg",
          issuer: "tesla",
          maturityDate: "2022-08-30T18:30:00.000+00:00",
          coupon: "1003-c",
          type: "asset",
          faceValue: 3400,
          status: "active",
        },
      ]);
    }
  }, []);

  const handleSearch = (search) => {
    const queryParam = qs.parse(location.search);
    setSearchVal({ ...queryParam, search: search });
    //backend call and setCardgrid
  };

  const handleBookFilter = (book) => {
    const queryParam = qs.parse(location.search);
    setSearchVal({ ...queryParam, book: book });
    //backend call for filter book
  };

  return (
    <AppLayout>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mb-5"
      >
        <h2>Securities</h2>
      </div>
      <Container className="mb-4" style={{ paddingLeft: "0px" }}>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Search
              searchVal={searchVal.get("search")}
              handleSearch={handleSearch}
            />
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
      <CardGrid cardgrid={cardgrid} />
    </AppLayout>
  );
};

export default Securities;
