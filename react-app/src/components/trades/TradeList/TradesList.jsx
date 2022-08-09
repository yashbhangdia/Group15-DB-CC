import React, { useEffect, useState } from "react";
import { useBoolean } from "../../../base/hooks";
import { Table } from "react-bootstrap";
import StandardButton from "../../shared/forms/StandardButton/StandardButton";
import "./trade-list.scss";
import qs from 'query-string';
import {useSearchParams, useLocation} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Autocomplete from '../../../components/shared/Autocomplete/autocomplete';

const TradesList = () => {
  const [trades, setTrades] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchVal, setSearchVal] = useSearchParams();
  const location = useLocation();


  const options = [
    { value: '', label: 'Select a Book ...' },
    { value: 'Amazon', label: 'Amazon' },
    { value: 'Google', label: 'Google' },
    { value: 'Apple', label: 'Apple' }
  ]

  useEffect(() => {
    setTrades ( [
        
            {
                "id": 1,
                "quantity": 2,
                "status": "active",
                "price": 300,
                "buy_sell": "sell",
                "tradeDate": "2020-09-18T18:30:00.000+00:00",
                "settlementDate": "2025-08-17T18:30:00.000+00:00",
                "book": {
                    "id": 101,
                    "createdAt": "2022-08-06",
                    "lastUpdatedAt": "2022-08-05T18:30:00.000+00:00",
                    "bookName": "book1"
                },
                "security": {
                    "id": 1003,
                    "inis": "askhd234",
                    "cusip": "shdg",
                    "issuer": "tesla",
                    "maturityDate": "2022-08-30T18:30:00.000+00:00",
                    "coupon": "1003-c",
                    "type": "asset",
                    "faceValue": 3400,
                    "status": "active"
                },
                "counterparty": {
                    "id": 10002,
                    "name": "XYZ"
                }
            },
            {
                "id": 2,
                "quantity": 3,
                "status": "active",
                "price": 400,
                "buy_sell": "buy",
                "tradeDate": "2021-09-18T18:30:10.000+00:00",
                "settlementDate": "2022-10-31T18:30:00.000+00:00",
                "book": {
                    "id": 102,
                    "createdAt": "2022-08-05",
                    "lastUpdatedAt": "2022-08-05T18:30:00.000+00:00",
                    "bookName": "book2"
                },
                "security": {
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
                "counterparty": {
                    "id": 10001,
                    "name": "ABC"
                }
            },
            {
                "id": 1000001,
                "quantity": 1,
                "status": "done",
                "price": 200,
                "buy_sell": "buy",
                "tradeDate": "2020-08-18T18:30:00.000+00:00",
                "settlementDate": "2020-08-17T18:30:00.000+00:00",
                "book": {
                    "id": 101,
                    "createdAt": "2022-08-06",
                    "lastUpdatedAt": "2022-08-05T18:30:00.000+00:00",
                    "bookName": "book1"
                },
                "security": {
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
                "counterparty": {
                    "id": 10001,
                    "name": "ABC"
                }
            }
        
    ])
  });

  const showSecurity = () =>{
      setShow(true);
  };

  const hideSecurity = () =>{
    setShow(false);
  };

  const handleBookFilter = (book) => {
    const queryParam = qs.parse(location.search);
    setSearchVal({...queryParam, book: book });
    //backend call for filter book
  } 
  return (
    <div className="trades-list">

      <div style={{display:'flex', justifyContent:'space-between'}} className='mb-5' >
        <h2>Trade List</h2>
        <Autocomplete options={options} selectedBook={options.find((op)=> searchVal.get('book')==op.label )} handleBookFilter={handleBookFilter}/>
      </div>

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
            <tr key={trade.id} onClick = {()=>{
              setModalData(trade.security) ; 
              showSecurity()
            }} style={{"cursor":"pointer"}}>
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
      <Modal centered show={show} onHide={hideSecurity}>
            <Modal.Header closeButton>
              <Modal.Title>Security</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
              <ul>
                    <li><b>Maturity Date </b>: <span>{modalData.maturityDate}</span></li>
                    <li><b>Status </b>: <span>{modalData.status}</span></li>
                    <li><b>Type </b>:   <span>{modalData.type}</span></li>
                    <li><b>Issuer </b>: <span>{modalData.issuer}</span></li>
              </ul>
            </Modal.Body>
    </Modal>
    </div>
  );
};

export default TradesList;
