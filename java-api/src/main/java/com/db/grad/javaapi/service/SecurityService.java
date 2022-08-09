package com.db.grad.javaapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.repository.SecurityRepository;

@Service
public class SecurityService {
	@Autowired
	private SecurityRepository sr;
	
	public List<Security> listAll(String keyword){
		if (keyword != null) {
            return sr.search(keyword);
        }
        return sr.findAll();
	}
	
}
