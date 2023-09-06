package com.ideas.springboot.backend.clinica.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas.springboot.backend.clinica.entities.Notes;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.NotesServices;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotesController {

	@Autowired
	private NotesServices services;

	@GetMapping("/controller/notes")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(services.findAll());
	}

	@GetMapping("/controller/notes/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.ok(services.findById(id));
	}

	@PostMapping("/controller/notes")
	public ResponseEntity<?> createNote(@RequestBody Notes notes) {
		if (notes.getPatient() == null || notes.getDoctor() == null) {
			return ResponseEntity.badRequest().body(new MessageResponse("Patient or doctor not found."));
		}
		if (notes.getMedicalNote() == null || notes.getMedicalNote().isBlank()) {
			return ResponseEntity.badRequest().body(new MessageResponse("Note cannot be empty."));
		}
		services.createdNote(notes);
		return ResponseEntity.ok(new MessageResponse("Note created"));
	}

	@GetMapping("/controller/notes/doctor/{id}")
	public ResponseEntity<?> findByDoctorId(@PathVariable Long id) {
		return ResponseEntity.ok(services.findByDoctorId(id));
	}

	@GetMapping("/controller/notes/patient/{id}")
	public ResponseEntity<?> findByPatientId(@PathVariable Long id) {
		return ResponseEntity.ok(services.findByPatientId(id));
	}

	@DeleteMapping("/controller/notes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		services.delete(id);
		return ResponseEntity.ok(new MessageResponse("successfully"));
	}
}
