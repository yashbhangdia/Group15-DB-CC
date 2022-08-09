package com.db.grad.javaapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.Security;

@Repository
public interface SecurityRepository extends JpaRepository<Security, Long>{

	@Query(value="SELECT * FROM security s JOIN trade t ON s.id=t.security_id", nativeQuery =true)
	Security AnalyseBySecurityId(@Param("security_id") Long security_id);

	
	@Query(value="SELECT * From security s JOIN trade t ON s.id=t.security_id JOIN book b ON b.id=t.book_id WHERE b.book_name=:issuer", nativeQuery=true)
	List<Security> AnalyseByBookName(@Param("issuer") String issuer);
	
	@Query(value=("SELECT * From security s JOIN trade t ON s.id=t.security_id JOIN book b ON b.id=t.book_id WHERE b.book_name=:issuer AND s.isin=:isin"), nativeQuery=true)
	List<Security>  AnalyseByBookNameINIS(@Param("issuer") String issuer, @Param("isin") String isin);

	@Query(value="SELECT * FROM security s where s.isin=:isin", nativeQuery=true)
	List<Security> AnalyseByINIS(@Param("isin") String isin);

	@Query(value="SELECT * FROM security s WHERE CONCAT(s.isin,' ', s.cusip,' ', s.issuer,' ', s.maturity_date,' ', s.face_value, ' ', s.coupon,' ', s.type,' ', s.status) LIKE %?1%", nativeQuery=true)
	public List<Security> search(@Param("keyword") String keyword);
}
