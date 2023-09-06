package com.ideas.springboot.backend.clinica.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Notes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private Patient patient;
	@ManyToOne
	private Doctor doctor;
	private String medicalNote;
	private Date createdDate;
	private Boolean status;

	public Notes(Long id, Patient patient, Doctor doctor, String medicalNote, Date createdDate, Boolean status) {
		this.id = id;
		this.patient = patient;
		this.doctor = doctor;
		this.medicalNote = medicalNote;
		this.createdDate = createdDate;
		this.status = status;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Notes() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getMedicalNote() {
		return medicalNote;
	}

	public void setMedicalNote(String medicalNote) {
		this.medicalNote = medicalNote;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

}
