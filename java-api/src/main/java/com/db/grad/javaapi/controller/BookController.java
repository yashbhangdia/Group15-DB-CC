package com.db.grad.javaapi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

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
import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BookRepository;
import com.db.grad.javaapi.repository.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class BookController {
    @Autowired
    private BookRepository bookrepository;

    @Autowired
    private UserRepository userrepository;

    @GetMapping("/books")
    public List<Book> getAllSecurities() {
        return bookrepository.findAll();
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Book book = bookrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));
        return ResponseEntity.ok().body(book);
    }

    // update
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

    // delete
    @DeleteMapping("/books/{id}")
    public Map<String, Boolean> deleteBook(@PathVariable(value = "id") Long id)
            throws Exception {
        Book book = bookrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found for this id :: " + id));

        bookrepository.delete(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    // Get the users with the associated book id
    @GetMapping("/book/users")
    public ResponseEntity<List<User>> getUserByBookId(@Param("id") Long id)
            throws ResourceNotFoundException {
        List<User> user = userrepository.AnalyseByBookId(id);
        return ResponseEntity.ok().body(user);
    }
}
