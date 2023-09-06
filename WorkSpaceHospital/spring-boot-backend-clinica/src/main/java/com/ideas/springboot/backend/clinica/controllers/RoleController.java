package com.ideas.springboot.backend.clinica.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas.springboot.backend.clinica.entities.Role;
import com.ideas.springboot.backend.clinica.services.RoleServices;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {

	@Autowired
	private RoleServices services;

	@GetMapping("controller/roles")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(services.findAll());
	}

	@GetMapping("controller/roles/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.ok(services.findById(id));
	}

	@PostMapping("controller/roles")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> save(@RequestBody Role role) {
		return ResponseEntity.ok(services.save(role));
	}

	@PutMapping("controller/roles/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> saveEdit(@RequestBody Role role, @PathVariable Long id) {
		Role roleDbb = services.findById(id);
		roleDbb.setName(role.getName());
		return ResponseEntity.ok(services.save(roleDbb));
	}

	@DeleteMapping("controller/roles/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		services.delete(id);
		return ResponseEntity.ok("Role deleted");
	}

}
