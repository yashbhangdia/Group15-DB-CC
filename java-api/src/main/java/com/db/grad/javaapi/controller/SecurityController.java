package com.db.grad.javaapi.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.repository.SecurityRepository;
import com.db.grad.javaapi.repository.TradeRepository;
import com.db.grad.javaapi.service.SecurityService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class SecurityController {
	@Autowired
	private SecurityRepository securityRepository;
	
	@Autowired 
	private SecurityService ss;
	
	@GetMapping("/securities")
	public List<Security> getAllSecurities(){
		return securityRepository.findAll();
	}
	
	@GetMapping("/securities/{id}")
    public ResponseEntity<Security> getSecurityById(@PathVariable(value = "id") Long id)
    throws ResourceNotFoundException {
		Security security = securityRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Security not found for this id :: " + id));
        return ResponseEntity.ok().body(security);
    }
	
    @PostMapping("/securities")
    public Security createSecurity(@Valid @RequestBody Security security) {
        return securityRepository.saveAndFlush(security);
    }

    @PutMapping("/securities/{id}")
    public ResponseEntity<Security> updatedSecurity(@PathVariable(value = "id") Long id,
        @Valid @RequestBody Security securityDetails) throws ResourceNotFoundException {
    	Security getSecurity = securityRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Security not found for this id :: " + id));
    	getSecurity.setIsin(securityDetails.getIsin());
    	getSecurity.setCusip(securityDetails.getCusip());
    	getSecurity.setCoupon(securityDetails.getCoupon());
    	getSecurity.setFaceValue(securityDetails.getFaceValue());
    	getSecurity.setIssuer(securityDetails.getIssuer());
    	getSecurity.setMaturityDate(securityDetails.getMaturityDate());
    	getSecurity.setStatus(securityDetails.getStatus());
    	getSecurity.setType(securityDetails.getType());
 
        final Security updatedSecurity = securityRepository.save(getSecurity);
        return ResponseEntity.ok(updatedSecurity);
    }

    @DeleteMapping("/securities/{id}")
    public Map<String, Boolean> deleteSecurity(@PathVariable(value = "id") Long id)
    throws Exception {
    	Security security = securityRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Security not found for this id :: " + id));

    	securityRepository.delete(security);
        Map<String, Boolean> response = new HashMap <>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
    @GetMapping("/securities/bookName")
    public ResponseEntity<List<Security>> AnalyseByBookName(@Param("issuer") String issuer){
    	List<Security> securities = securityRepository.AnalyseByBookName(issuer);
    	return ResponseEntity.ok().body(securities);
    }
    
    
    
    @GetMapping("/securities/bookNameAndISIN")
    public ResponseEntity<List<Security>> AnalyseByBookNameINIS(@Param("issuer") String issuer, @Param("isin") String isin){
    	List<Security> securities = securityRepository.AnalyseByBookNameINIS(issuer, isin);
    	return ResponseEntity.ok().body(securities);
    }
    
    @GetMapping("/securities/isin")
    public ResponseEntity<List<Security>> AnalyseByINIS(@Param("isin") String isin){
    	List<Security> securities = securityRepository.AnalyseByINIS(isin);
    	return ResponseEntity.ok().body(securities);
    }
    
    //search by any keyword
    @RequestMapping("/securities/search")
    public ResponseEntity<List<Security>> AnalyseByKeyword(@Param("keyword") String keyword){
    	List<Security> securities = ss.listAll(keyword);
    	return ResponseEntity.ok().body(securities);
    }
    
	/*
	 * @GetMapping("/security/trades/{id}") public ResponseEntity<Trade>
	 * getTradeBySecurityId(@PathVariable(value = "id") Long id) throws
	 * ResourceNotFoundException { Trade trade =
	 * tradeRepository.AnalyseBySecurityId(id); return
	 * ResponseEntity.ok().body(trade); }
	 */
    
	/*
	 * @GetMapping("/securities/search/alltrades") public String
	 * AnalyseBySecurityId(@Param("security_id") long security_id, Model model) {
	 * 
	 * List<Trade> trade = tradeRepository.findAll();
	 * 
	 * for(Trade t: trade) { if(t.getId()==security_id) { return t.toString(); } }
	 * 
	 * Security security = securityRepository.AnalyseBySecurityId(security_id);
	 * Trade trades = tradeRepository.AnalyseBySecurityId(security_id);
	 * 
	 * model.addAttribute("security", security); model.addAttribute("security_id",
	 * security_id); model.addAttribute("trade", trades);
	 * 
	 * if(security == null || trades==null) { model.addAttribute("trade", null);
	 * return "security_id"; } else { Trade tradeData = new Trade();
	 * 
	 * tradeData.setBook(trades.getBook());
	 * tradeData.setBuy_sell(trades.getBuy_sell());
	 * tradeData.setCounterparty(trades.getCounterparty());
	 * tradeData.setId(trades.getId()); tradeData.setPrice(trades.getPrice());
	 * tradeData.setQuantity(trades.getQuantity());
	 * tradeData.setSettlementDate(trades.getSettlementDate());
	 * tradeData.setStatus(trades.getStatus());
	 * tradeData.setTradeDate(trades.getTradeDate());
	 * 
	 * model.addAttribute("trades", tradeData);
	 * 
	 * return "security_id"; }
	 * 
	 * }
	 */}
