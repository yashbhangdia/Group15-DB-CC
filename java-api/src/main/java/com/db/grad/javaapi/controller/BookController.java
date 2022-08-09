package com.db.grad.javaapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BookRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class BookController {
	@Autowired
	private BookRepository bookrepository;
	
	@GetMapping("/books")
	public List<Book> getAllSecurities(){
		return bookrepository.findAll();
	}
	
	@PutMapping("/books/{id}")
    public ResponseEntity<Book> updatedBook(@PathVariable(value = "id") Long id,
        @Valid @RequestBody Book bookDetails) throws ResourceNotFoundException {
    	Book getBook = bookrepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Book not found for this id :: " + id));
    	
    	getBook.setBookName(bookDetails.getBookName());
 
        final Book updatedBook = bookrepository.save(getBook);
        return ResponseEntity.ok(updatedBook);
    }
	
	@PostMapping("/books")
    public Book createBook(@Valid @RequestBody Book book) {
        return bookrepository.saveAndFlush(book);
    }
	
	
}
