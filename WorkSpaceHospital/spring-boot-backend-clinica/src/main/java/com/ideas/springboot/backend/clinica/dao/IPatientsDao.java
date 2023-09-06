package com.ideas.springboot.backend.clinica.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas.springboot.backend.clinica.entities.Patient;

public interface IPatientsDao extends JpaRepository<Patient, Long>{

	Patient findPatientByPersonEmail(String email);
	List<Patient> findByPersonEnableTrue();
}
