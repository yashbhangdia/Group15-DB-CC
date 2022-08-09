package com.db.grad.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.Security;

@Repository
public interface SecurityRepository extends JpaRepository<Security, Long>{

	@Query(value="SELECT * FROM security s JOIN trade t ON s.id=t.security_id", nativeQuery =true)
	Security AnalyseBySecurityId(@Param("security_id") long security_id);

}
