package com.db.grad.javaapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.repository.TradeRepository;

@Service
public class TradeService {
	
	@Autowired 
	public TradeRepository traderepository;
	
	//single resource
	/*
	 * public tradeDTO getTradeById(Long tradeId, boolean securityData) { Trade
	 * trade; trade = traderepository.findAllById(tradeId);
	 * 
	 * return null; }
	 */
	
//	public List<Trade> getTrades(){
//		
//	}
}
