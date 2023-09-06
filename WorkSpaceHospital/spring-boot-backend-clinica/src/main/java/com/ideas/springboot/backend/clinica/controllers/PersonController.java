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

import com.ideas.springboot.backend.clinica.entities.Person;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.PersonServices;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonController {

	@Autowired
	private PersonServices service;


	@GetMapping("controller/person")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	private ResponseEntity<?> index() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("controller/person/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	private ResponseEntity<?> showId(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PostMapping("controller/person")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> save(@RequestBody Person person) {
		return ResponseEntity.ok(service.save(person));
	}

	@PutMapping("controller/person/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> edit(@RequestBody Person person, @PathVariable Long id) {
		Person personBdd = service.findById(id);
		personBdd.setName(person.getName());
		personBdd.setLastName(person.getLastName());
		personBdd.setEmail(person.getEmail());
		personBdd.setPhoneNumber(person.getPhoneNumber());
		personBdd.setHomeNumber(person.getHomeNumber());
		personBdd.setAge(person.getAge());
		personBdd.setCity(person.getCity());
		personBdd.setDob(person.getDob());
		personBdd.setSocialSecNumber(person.getSocialSecNumber());
		
		return ResponseEntity.ok(service.save(personBdd));
	}

	@DeleteMapping("controller/person/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	private ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok("Person deleted");
	}
	
	@GetMapping("controller/person/e/{email}")
	private ResponseEntity<?> findByEmail(@PathVariable String email) throws Exception {
		Person person = service.findByEmail(email);
		if(person != null) {
			return ResponseEntity.ok(person);
		}
		return ResponseEntity.badRequest().body(new MessageResponse("No person found with email"));
	}
}
