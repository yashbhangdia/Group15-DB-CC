package com.db.grad.javaapi.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="email")
	private String email;
	
	@Column(name="role")
	private String role;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName="id")
	private Set<Book_user> book_users = new HashSet<>();
	
	public User() {
		
	}
	
	public User(String name, String email, String role) {
		super();
		this.name = name;
		this.email = email;
		this.role = role;
	}
	public String getName() {
		return name;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Set<Book_user> getBooks() {
		return book_users;
	}
	public void setBooks(Set<Book_user> book_users) {
		this.book_users = book_users;
	}
	
	
}