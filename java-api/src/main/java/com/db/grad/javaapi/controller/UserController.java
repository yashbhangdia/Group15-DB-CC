package com.db.grad.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BookRepository;
import com.db.grad.javaapi.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;


@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long id)
    throws ResourceNotFoundException {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.saveAndFlush(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updatedUser(@PathVariable(value = "id") Long id,
        @Valid @RequestBody User userDetails) throws ResourceNotFoundException {
    	 User getUser = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));

    	getUser.setName(userDetails.getName());
    	getUser.setEmail(userDetails.getEmail());
    	getUser.setRole(userDetails.getRole());
        final User updatedUser = userRepository.save(getUser);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long id)
    throws Exception {
    	User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));

    	userRepository.delete(user);
        Map<String, Boolean> response = new HashMap <>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
	
    
    //Get the books with the associated user id
    @GetMapping("/user/books")
    public ResponseEntity<List<Book>> getBookByUserId(@Param("id") Long id) 
    	    throws ResourceNotFoundException { 
    	    	List<Book> book = bookRepository.AnalyseByUserId(id); 
    	    	return ResponseEntity.ok().body(book); 
   }
	
}
