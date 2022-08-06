package com.db.grad.javaapi.mapping;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.Test;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;

public class Mapping {
	private static SessionFactory sessionFactory;
	private Session session;
	
	@Test
    public void givenSession_whenRead_thenReturnsMtoMdata() {
		
		@SuppressWarnings("unchecked")
	    List<Book> bookList = session.createQuery("FROM Book").list();
   	    
		@SuppressWarnings("unchecked")
	    List<User> userList = session.createQuery("FROM User").list();
		
		assertNotNull(bookList);
		assertNotNull(userList);
		assertEquals(2, bookList.size());
	    assertEquals(2, userList.size());
	    
	    for(Book book : bookList) {
	        assertNotNull(book.getUsers());
	        assertEquals(2, book.getUsers().size());
	    }
	    
	    for(User user : userList) {
	    	assertNotNull(user.getBooks());
	        assertEquals(2, user.getBooks().size());
	    }
	}

	

}
