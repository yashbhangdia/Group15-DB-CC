package com.db.grad.javaapi.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="book_user")
public class BookUser {
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private long id;
	
	@ManyToOne(fetch= FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name="book_id", referencedColumnName="id", nullable=false)
	private Book book;
	
	@ManyToOne(fetch= FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
	private User user;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}