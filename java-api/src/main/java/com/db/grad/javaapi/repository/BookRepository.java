package com.db.grad.javaapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.Book;


@Repository
public interface BookRepository extends JpaRepository<Book, Long>{

	@Query(value="SELECT * FROM book b JOIN book_user bu ON b.id = bu.book_id JOIN users u ON u.id=bu.user_id WHERE bu.user_id=:id", nativeQuery =true)
	List<Book> AnalyseByUserId(@Param("id") Long id);

	
}
