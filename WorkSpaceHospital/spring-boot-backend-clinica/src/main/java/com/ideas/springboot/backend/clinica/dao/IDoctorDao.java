package com.ideas.springboot.backend.clinica.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas.springboot.backend.clinica.entities.Doctor;
public interface IDoctorDao extends JpaRepository<Doctor, Long>{
	
	List<Doctor> findDoctorBySpecializationId(Long id);
	Optional<Doctor> findDoctorByPersonEmail(String email);
	List<Doctor> findByPersonEnableTrue();
}
 