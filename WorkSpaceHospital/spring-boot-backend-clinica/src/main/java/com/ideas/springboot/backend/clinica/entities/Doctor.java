package com.ideas.springboot.backend.clinica.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctor")
public class Doctor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String licenseId;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinTable(name = "DOCTOR_SPECIALIST_TABLE", joinColumns = {
			@JoinColumn(name = "doctor_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "specialist_id", referencedColumnName = "id") })
	private Specialist specialization;

	@JsonIgnore	
	@OneToMany(mappedBy = "doctor")
	private List<Patient> patient;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinTable(name = "doctor_person", joinColumns = @JoinColumn(name = "doctor_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"))
	private Person person;
 
	public Doctor() {
	} 

	public Doctor(Long id, String licenseId, Specialist specialization, List<Patient> patient, Person person) {
		this.id = id;
		this.licenseId = licenseId;
		this.specialization = specialization;
		this.patient = patient;
		this.person = person;
	}

	public List<Patient> getPatient() {
		return patient;
	}

	public void addPatient(Patient patients) {
		if (patient == null) {
			patient = new ArrayList<>();
		}
		patient.add(patients);
		patients.setDoctor(this);
	}
	public void removePatient(Patient patients) {
		if (patient == null) {
			patient = new ArrayList<>();
		}
		patient.remove(patients);
	}

	public void setPatient(List<Patient> patient) {
		this.patient = patient;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLicense() {
		return licenseId;
	}

	public void setLicense(String licenseId) {
		this.licenseId = licenseId;
	}

	public Specialist getSpecialization() {
		return specialization;
	}

	public void setSpecialization(Specialist specialization) {
		this.specialization = specialization;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}