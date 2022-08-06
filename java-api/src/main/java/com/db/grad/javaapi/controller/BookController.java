package com.db.grad.javaapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BookRepository;

@RestController
@RequestMapping("/api/v1")
public class BookController {
	@Autowired
	private BookRepository bookrepository;
	
	@PostMapping("/book")
    public Book createBook(@Valid @RequestBody Book book) {
        return bookrepository.saveAndFlush(book);
    }
}
