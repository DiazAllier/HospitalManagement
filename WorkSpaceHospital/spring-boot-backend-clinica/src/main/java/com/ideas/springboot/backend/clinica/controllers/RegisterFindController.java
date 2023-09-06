package com.ideas.springboot.backend.clinica.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas.springboot.backend.clinica.entities.Person;
import com.ideas.springboot.backend.clinica.payload.request.FindPersonRegisterRequest;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.PersonServices;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RegisterFindController {

	@Autowired
	private PersonServices servicesPerson;

	@PostMapping("/auth/register/person")
	public ResponseEntity<?> findByNameAndLastNameAndDob(@RequestBody FindPersonRegisterRequest request) {
		Person person = servicesPerson.findByNameAndLastNameAndDob(request.getFirstName(), request.getLastName(),
				request.getDob());
		if (person != null) {
			return ResponseEntity.ok(person);
		}
		return ResponseEntity.badRequest().body(new MessageResponse("No records found!"));
	}
}
