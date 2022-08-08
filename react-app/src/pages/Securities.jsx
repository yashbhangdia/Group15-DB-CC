import React, {useState, useEffect} from "react";
import AppLayout from "../base/Layout/AppLayout";
import Autocomplete from '../components/shared/Autocomplete/autocomplete';
import CardGrid from "../components/shared/Cardgrid/cardgrid";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Search from "../components/shared/Search/search";

const Securities = () => {

  const [cardgrid, setCardgrid] = useState([]);

  useEffect(()=>{
    setCardgrid([
      {
        "id": 1001,
        "inis": "xyz123",
        "cusip": "abc",
        "issuer": "apple",
        "maturityDate": "2023-08-31T18:30:00.000+00:00",
        "coupon": "1001-a",
        "type": "asset",
        "faceValue": 1000,
        "status": "active"
    },
    {
        "id": 1002,
        "inis": "tdz785",
        "cusip": "ghd",
        "issuer": "google",
        "maturityDate": "2025-10-13T18:30:00.000+00:00",
        "coupon": "1002-b",
        "type": "instrument",
        "faceValue": 2000,
        "status": "active"
    },
    {
        "id": 1003,
        "inis": "askhd234",
        "cusip": "shdg",
        "issuer": "tesla",
        "maturityDate": "2022-08-30T18:30:00.000+00:00",
        "coupon": "1003-c",
        "type": "asset",
        "faceValue": 3400,
        "status": "active"
    }
    ])
  }, [])

  const handleSearch = (searchVal) => {
      //backend call and setCardgrid 
  }

  return <AppLayout>
    <h2 style={{textAlign:'center'}}>Securities</h2>

    <Autocomplete />
    <Container className="mb-4" style={{paddingLeft:'0px'}}>
      <Row>
        <Col md={3} >
          
        </Col>
        <Col md={6} >
          <Search />
        </Col>
        <Col md={3} >
          
        </Col>
      </Row>
    </Container>
    <CardGrid cardgrid={cardgrid}/>

  </AppLayout>;
};

export default Securities;
