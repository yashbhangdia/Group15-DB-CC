package com.db.grad.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@GetMapping("/users/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable(value = "id") Long id)
    throws ResourceNotFoundException {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createDog(@Valid @RequestBody User user) {
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
	
	
}
