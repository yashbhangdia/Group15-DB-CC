import React, { useState, useEffect } from "react";
import { useBoolean } from "../../../base/hooks";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";


// TODO: add role field
const TradeDetails = ({ show, hide, tradeData }) => {
  const [tradeDetails, setTradeDetails] = useState([]);

  const onCancel = () => {
    setTradeDetails([]);
    hide();
  };


  useEffect(() => {
    setTradeDetails(tradeData);
  }, [tradeData]);

  return (
    <Modal
      show={show}
      size="lg"
      onHide={onCancel}
      dialogClassName="add-user-popup"
      fullscreen="sm-down"
      centered
    >
      <Modal.Header>
        <Modal.Title>Trades</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table hover bordered responsive className="trade-table" >
            <thead>
                <tr>
                    <th>TradeID</th>
                    <th>Security INIS</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Buy / Sell</th>
                    <th>Trade Date</th>
                    <th>Counterparty</th>
                </tr>
            </thead>
            <tbody>
                {tradeDetails.map((trade)=>{
                    return <tr key={trade.id}>
                        <td>{trade.id}</td>
                        <td>{trade?.security?.inis}</td>
                        <td>{trade.quantity}</td>
                        <td>{trade.price}</td>
                        <td>{trade.buy_sell}</td>
                        <td>{trade.tradeDate.split("T")[0]}</td>
                        <td>{trade?.counterparty?.name}</td>
                    </tr>
                })}
            </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default TradeDetails;
