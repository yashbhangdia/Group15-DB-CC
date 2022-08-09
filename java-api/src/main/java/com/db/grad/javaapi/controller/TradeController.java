package com.db.grad.javaapi.controller;

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

import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.repository.TradeRepository;

@RestController
@RequestMapping("/api/v1")
public class TradeController {
	
	@Autowired
	private TradeRepository traderepository;
	
	@GetMapping("/trades")
	public List<Trade> getAllTrades(){
		return traderepository.findAll();
	}
	
	@GetMapping("/trades/{id}")
    public ResponseEntity<Trade> getTradeById(@PathVariable(value = "id") Long id)
    throws ResourceNotFoundException {
        Trade trade = traderepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Trade not found for this id :: " + id));
        return ResponseEntity.ok().body(trade);
    }

    @PostMapping("/trades")
    public Trade createTrade(@Valid @RequestBody Trade trade) {
        return traderepository.saveAndFlush(trade);
    }

    @PutMapping("/trades/{id}")
    public ResponseEntity<Trade> updatedTrade(@PathVariable(value = "id") Long id,
        @Valid @RequestBody Trade tradeDetails) throws ResourceNotFoundException {
    	 Trade getTrade = traderepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Trade not found for this id :: " + id));
    	 
    	getTrade.setBuy_sell(tradeDetails.getBuy_sell());
    	getTrade.setPrice(tradeDetails.getPrice());
    	getTrade.setQuantity(tradeDetails.getQuantity());
    	getTrade.setSettlementDate(tradeDetails.getSettlementDate());
    	getTrade.setStatus(tradeDetails.getStatus());
    	getTrade.setTradeDate(tradeDetails.getTradeDate());

        final Trade updatedTrade = traderepository.save(getTrade);
        return ResponseEntity.ok(updatedTrade);
    }

    @DeleteMapping("/trades/{id}")
    public Map<String, Boolean> deleteTrade(@PathVariable(value = "id") Long id)
    throws Exception {
    	Trade trade = traderepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Trade not found for this id :: " + id));

    	traderepository.delete(trade);
        Map<String, Boolean> response = new HashMap <>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
//    @GetMapping("/trade/search/securityid")
//    public String AnalyseBySecurityId(@Param("value") long value, Model model) {
//    	Trade trade = traderepository.AnalyseBySecurityId(value);
//    	Security security = securityRepository.AnalyseBySecurityId(value);
//    	
//    	model.addAttribute("id", id);
//    	
//    	return security
//    	
//    }
    
    //Retrieve security to which trade belongs here model is the UI part
	/*
	 * @GetMapping("/trade/security/id") public String findById(@Param("value")
	 * String value,Model model) {
	 * 
	 * List<Security> security = securityRepository.listAll();
	 * 
	 * return "security_fid"; }
	 */
	

}
