package com.db.grad.javaapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	@Query(value="SELECT * FROM users u JOIN book_user bu ON u.id = bu.user_id JOIN book b ON b.id=bu.book_id WHERE bu.book_id=:id", nativeQuery =true)
	List<User> AnalyseByBookId(@Param("id") Long id);

}
