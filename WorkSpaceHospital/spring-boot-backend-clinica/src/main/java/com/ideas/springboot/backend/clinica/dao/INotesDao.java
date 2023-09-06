package com.ideas.springboot.backend.clinica.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas.springboot.backend.clinica.entities.Notes;

public interface INotesDao extends JpaRepository<Notes, Long>{
	
	List<Notes> findAllByStatusTrue();
	List<Notes> findByPatientIdAndStatusTrue(Long id);
	List<Notes> findByDoctorIdAndStatusTrue(Long id);
}
