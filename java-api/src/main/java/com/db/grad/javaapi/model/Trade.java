package com.db.grad.javaapi.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="trade")
public class Trade {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="quantity")
	private long quantity;
	
	@Column(name="status")
	private String status;
	
	@Column(name="price")
	private long price;
	
	@Column(name="buy_sell")
	private String buy_sell;
	
	@Column(name="trade_date")
	private Date tradeDate;
	
	@Column(name="settlement_date")
	private Date settlementDate;
	
	@ManyToOne()
	@JoinColumn(name="book_id", referencedColumnName="id")
	private Book book;
	
	@ManyToOne()
	@JoinColumn(name="security_id", referencedColumnName="id")
	private Security security;
	
	@ManyToOne()
	@JoinColumn(name="counterparty_id", referencedColumnName="id")
	private Counterparty counterparty;
	
	public Trade() {
		
	}
	
	
	public Trade(long id, long quantity, String status, long price, String buy_sell, Date tradeDate,
			Date settlementDate) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.status = status;
		this.price = price;
		this.buy_sell = buy_sell;
		this.tradeDate = tradeDate;
		this.settlementDate = settlementDate;
	}


	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Security getSecurity() {
		return security;
	}

	public void setSecurity(Security security) {
		this.security = security;
	}

	public Counterparty getCounterparty() {
		return counterparty;
	}

	public void setCounterparty(Counterparty counterparty) {
		this.counterparty = counterparty;
	}
	
	
}
