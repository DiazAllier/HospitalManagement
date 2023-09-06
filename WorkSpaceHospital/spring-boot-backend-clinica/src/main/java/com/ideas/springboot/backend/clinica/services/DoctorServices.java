package com.ideas.springboot.backend.clinica.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ideas.springboot.backend.clinica.dao.IDoctorDao;
import com.ideas.springboot.backend.clinica.entities.Doctor;

@Service
public class DoctorServices {

	@Autowired
	private IDoctorDao doctorDao;
	
	@Transactional(readOnly = true)
	public List<Doctor> findAll() {
		//return (List<Doctor>) doctorDao.findAll();
		return (List<Doctor>) doctorDao.findByPersonEnableTrue();
	}
	
	@Transactional(readOnly = true)
	public Doctor findById(Long id) {
		return doctorDao.findById(id).orElse(null);
	}
	
	@Transactional
	public Doctor save(Doctor medico) {
		return doctorDao.save(medico);
	}
	
	public void delete(Long id) {
		doctorDao.deleteById(id);
	}

	@Transactional(readOnly = true)
	public List<Doctor> findDoctorBySpecializationId(Long id) {
		return doctorDao.findDoctorBySpecializationId(id);
	}
	
	
	@Transactional(readOnly = true)
	public Doctor findByEmail(String email) {
		return doctorDao.findDoctorByPersonEmail(email).orElse(null);
	}
	
}
