package com.ideas.springboot.backend.clinica.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ideas.springboot.backend.clinica.dao.ISpecialistDao;
import com.ideas.springboot.backend.clinica.entities.Specialist;

@Service
public class SpecialistServices {

	@Autowired
	private ISpecialistDao specialistDao;
	
	@Transactional(readOnly = true)
	public List<Specialist> findAll() {
		return (List<Specialist>) specialistDao.findAll();
	}
	
	@Transactional(readOnly = true)
	public Specialist findById(Long id) {
		return specialistDao.findById(id).orElse(null);
	}
	
	@Transactional
	public Specialist save(Specialist especialidad) {
		return specialistDao.save(especialidad);
	}
	
	public void delete(Long id) {
		specialistDao.deleteById(id);
	}
}
