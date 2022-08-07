package com.db.grad.javaapi.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="book")
public class Book {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="book_name")
	private String BookName;
	
	@Column(name="created_at")
	private java.sql.Date createdAt = new java.sql.Date(System.currentTimeMillis());
	
	@Column(name="last_updated_at")
	private Date lastUpdatedAt = new Date();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "book_fid", referencedColumnName="id")
	List<Trade> trades = new ArrayList<>();
	
	@ManyToMany
    @JoinTable(
        name="book_user",
        joinColumns=@JoinColumn(name="book_id"),
        inverseJoinColumns=@JoinColumn(name="user_id")
    )
    Set<User> users;
	
	public Book() {

	}
	
	public Book(String bookName) {
		super();
		BookName = bookName;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getBookName() {
		return BookName;
	}
	public void setBookName(String bookName) {
		BookName = bookName;
	}

	public java.sql.Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(java.sql.Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getLastUpdatedAt() {
		return lastUpdatedAt;
	}

	public void setLastUpdatedAt(Date lastUpdatedAt) {
		this.lastUpdatedAt = lastUpdatedAt;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public List<Trade> getTrades() {
		return trades;
	}

	public void setTrades(List<Trade> trades) {
		this.trades = trades;
	}
	
	
}
