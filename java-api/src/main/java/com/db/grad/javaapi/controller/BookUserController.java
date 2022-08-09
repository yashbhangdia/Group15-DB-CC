package com.db.grad.javaapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.grad.javaapi.model.BookUser;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BookUserRepository;

@RestController
@RequestMapping("/api/v1")
public class BookUserController {
	
	@Autowired
	public BookUserRepository bur;
	
	@GetMapping("/bookuser")
	public List<BookUser> getAllBookUsers(){
		return bur.findAll();
	}
	
	//add or create
		@PostMapping("/bookuser")
	    public BookUser createBookUser(@Valid @RequestBody BookUser bookuser) {
	        return bur.saveAndFlush(bookuser);
	    }
}
