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
      {id:"1",isin:"12",issuer:"asdf",maturityDate:"22/8/22",type:"asset",status:"active"},
      {id:"2",isin:"13",issuer:"qwe",maturityDate:"21/8/22",type:"instrument",status:"failed"},
      {id:"3",isin:"14",issuer:"zxc",maturityDate:"20/8/22",type:"asset",status:"active"}
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
            <th>ISIN</th>
            <th>Issuer</th>
            <th>Maturity Date</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <>
            <tr key={trade.id} onClick = {()=>{
              setModalData(trade) ; 
              showSecurity()
            }} style={{"cursor":"pointer"}}>
              <td>{trade.isin}</td>
              <td>{trade.issuer}</td>
              <td>{trade.maturityDate}</td>
              <td>{trade.type}</td>
              <td>{trade.status}</td>
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
              <ul  >
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
