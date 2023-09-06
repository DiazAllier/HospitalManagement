package com.ideas.springboot.backend.clinica.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas.springboot.backend.clinica.services.EmailService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EmailController {

	@Autowired
	private EmailService service;
	
	@PostMapping("/auth/email") 
	public ResponseEntity<?> SendEmailMessage() {
		this.service.sendEmail("allierluluchii@gmail.com", "TEST", "TEST");
		return ResponseEntity.ok().body("EMAIL SENT");
		
	}
}
