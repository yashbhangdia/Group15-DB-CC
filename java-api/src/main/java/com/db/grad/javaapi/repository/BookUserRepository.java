package com.db.grad.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.BookUser;

@Repository
public interface BookUserRepository extends JpaRepository<BookUser, Long>{

}
