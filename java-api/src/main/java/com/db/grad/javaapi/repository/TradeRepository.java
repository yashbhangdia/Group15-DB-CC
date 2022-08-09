package com.db.grad.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.Trade;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long>{

	Trade findAllById(Long tradeId);
	
	@Query(value="SELECT * FROM security s JOIN trade t ON s.id=t.security_id", nativeQuery =true)
	Trade AnalyseBySecurityId(@Param("security_id") long security_id);

}
