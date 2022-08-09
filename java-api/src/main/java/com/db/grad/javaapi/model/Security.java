package com.db.grad.javaapi.model;


import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="security")
public class Security {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="inis")
	private String inis;
	
	@Column(name="cusip")
	private String cusip;
	
	@Column(name="issuer")
	private String issuer;
	
	@Column(name="maturity_date")
	private Date maturityDate;
	
	@Column(name="coupon")
	private String coupon;
	
	@Column(name="type")
	private String type;
	
	@Column(name="face_value")
	private long faceValue;
	
	@Column(name="status")
	private String status;
	
	public Security() {
		
	}
	
	public Security(long id, String inis, String cusip, String issuer, Date maturityDate, String coupon, String type,
			long faceValue, String status) {
		super();
		this.id = id;
		this.inis = inis;
		this.cusip = cusip;
		this.issuer = issuer;
		this.maturityDate = maturityDate;
		this.coupon = coupon;
		this.type = type;
		this.faceValue = faceValue;
		this.status = status;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getInis() {
		return inis;
	}
	public void setInis(String inis) {
		this.inis = inis;
	}
	public String getCusip() {
		return cusip;
	}
	public void setCusip(String cusip) {
		this.cusip = cusip;
	}
	public String getIssuer() {
		return issuer;
	}
	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}
	public Date getMaturityDate() {
		return maturityDate;
	}
	public void setMaturityDate(Date maturityDate) {
		this.maturityDate = maturityDate;
	}
	public String getCoupon() {
		return coupon;
	}
	public void setCoupon(String coupon) {
		this.coupon = coupon;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public long getFaceValue() {
		return faceValue;
	}
	public void setFaceValue(long faceValue) {
		this.faceValue = faceValue;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
