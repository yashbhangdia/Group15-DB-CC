package com.db.grad.javaapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.Trade;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long>{

	
	
	@Query(value="SELECT * FROM trade t JOIN security s ON t.security_id=s.id WHERE t.security_id=:security_id", nativeQuery =true)
	List<Trade> AnalyseBySecurityId(@Param("security_id") Long security_id);

	@Query(value="SELECT * FROM trade t JOIN security s On t.security_id=s.id WHERE s.issuer=:issuer", nativeQuery =true)
	List<Trade> AnalyseByBookName(@Param("issuer") String issuer);

}
