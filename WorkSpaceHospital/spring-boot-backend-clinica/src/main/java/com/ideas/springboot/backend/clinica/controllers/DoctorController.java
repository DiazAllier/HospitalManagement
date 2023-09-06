package com.ideas.springboot.backend.clinica.controllers;

import java.util.List;

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

import com.ideas.springboot.backend.clinica.entities.Doctor;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.DoctorPatientService;
import com.ideas.springboot.backend.clinica.services.DoctorServices;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorController {

	@Autowired
	private DoctorServices service;

	@Autowired
	private DoctorPatientService servicesDoctorPatients;

	@GetMapping("controller/doctor")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("controller/doctor/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PostMapping("controller/doctor")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> save(@RequestBody Doctor doctor) {
		service.save(doctor);
		return ResponseEntity.ok().body(new MessageResponse("Doctor created"));
	}

	@PutMapping("controller/doctor/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> update(@RequestBody Doctor doctor, @PathVariable Long id) {
		Doctor doctorBd = service.findById(id);
		doctorBd.setLicense(doctor.getLicense());
		doctorBd.setPerson(doctor.getPerson());
		doctorBd.setSpecialization(doctor.getSpecialization());
		service.save(doctorBd);
		return ResponseEntity.ok().body(new MessageResponse("Doctor edited"));
	}
	
	@DeleteMapping("controller/doctor/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok(new MessageResponse("Doctor deleted"));
	}

	@GetMapping("controller/doctor/specialization/{id}")
	public ResponseEntity<?> findDoctorBySpecializationId(@PathVariable Long id) {
		List<Doctor> doctor = service.findDoctorBySpecializationId(id);
		return ResponseEntity.ok(doctor);
	}

	@GetMapping("controller/doctor/{id}/patients")
	public ResponseEntity<?> getDoctorPatients(@PathVariable Long id) {
		Doctor doctor = service.findById(id);
		return ResponseEntity.ok(doctor.getPatient());
	}

	@Transactional
	@DeleteMapping("/controller/doctor/{idD}/patients/{idP}")
	public ResponseEntity<?> removeRelationShip(@PathVariable Long idD, @PathVariable Long idP) throws Exception {
		servicesDoctorPatients.removeRelation(idD, idP);
		return ResponseEntity.ok(new MessageResponse("Relationship deleted"));
	}
	
	@GetMapping("controller/doctor/email/{email}")
	public ResponseEntity<?> getDoctorByEmail(@PathVariable String email) {
		Doctor doctor = service.findByEmail(email);
		if(doctor != null) {
			return ResponseEntity.ok(doctor);
		}
		return ResponseEntity.badRequest().body(new MessageResponse("No doctor found with email"));
	}

}
