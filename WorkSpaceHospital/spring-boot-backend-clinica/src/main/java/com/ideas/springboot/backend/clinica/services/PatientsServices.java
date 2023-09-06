package com.ideas.springboot.backend.clinica.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ideas.springboot.backend.clinica.dao.IPatientsDao;
import com.ideas.springboot.backend.clinica.entities.Patient;

@Service
public class PatientsServices {

	@Autowired
	private IPatientsDao patientDao;
	
	@Transactional(readOnly = true)
	public List<Patient> findAll() {
		//return (List<Patient>) patientDao.findAll();
		return (List<Patient>) patientDao.findByPersonEnableTrue();
	}

	@Transactional(readOnly = true)
	public Patient findById(Long id) {
		return patientDao.findById(id).orElse(null);
	}

	@Transactional
	public Patient save(Patient patient) {
		return patientDao.save(patient);
	}

	@Transactional
	public void delete(Long id) {
		patientDao.deleteById(id);
	}
	
	@Transactional(readOnly = true)
	public Patient findPatientByPersonEmail(String email) {
		return patientDao.findPatientByPersonEmail(email);
	}

}
