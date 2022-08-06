package com.db.grad.javaapi.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="trade")
public class Trade {
	
	@Id
	private long id;
	private long bookId;
	private long counterpartyId;
	private long securityId;
	private long quantity;
	private String status;
	private long price;
	private String buy_sell;
	private Date tradeDate;
	private Date settlementDate;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getBookId() {
		return bookId;
	}
	public void setBookId(long bookId) {
		this.bookId = bookId;
	}
	public long getCounterpartyId() {
		return counterpartyId;
	}
	public void setCounterpartyId(long counterpartyId) {
		this.counterpartyId = counterpartyId;
	}
	public long getSecurityId() {
		return securityId;
	}
	public void setSecurityId(long securityId) {
		this.securityId = securityId;
	}
	public long getQuantity() {
		return quantity;
	}
	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	public String getBuy_sell() {
		return buy_sell;
	}
	public void setBuy_sell(String buy_sell) {
		this.buy_sell = buy_sell;
	}
	public Date getTradeDate() {
		return tradeDate;
	}
	public void setTradeDate(Date tradeDate) {
		this.tradeDate = tradeDate;
	}
	public Date getSettlementDate() {
		return settlementDate;
	}
	public void setSettlementDate(Date settlementDate) {
		this.settlementDate = settlementDate;
	}
	
	
}
