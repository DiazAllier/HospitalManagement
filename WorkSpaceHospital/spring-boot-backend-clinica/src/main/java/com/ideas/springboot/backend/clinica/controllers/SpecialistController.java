package com.ideas.springboot.backend.clinica.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas.springboot.backend.clinica.entities.Specialist;
import com.ideas.springboot.backend.clinica.services.SpecialistServices;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins ="http://localhost:4200")
public class SpecialistController {

	@Autowired
	private SpecialistServices service;

	@GetMapping("controller/specialists")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(service.findAll());
	}
	
	@GetMapping("controller/specialists/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PostMapping("controller/specialists")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> save(@RequestBody Specialist specialization) {
		return  ResponseEntity.ok(service.save(specialization));
	}
}
