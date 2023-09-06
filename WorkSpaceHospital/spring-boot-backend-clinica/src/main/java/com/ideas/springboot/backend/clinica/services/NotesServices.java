package com.ideas.springboot.backend.clinica.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ideas.springboot.backend.clinica.dao.INotesDao;
import com.ideas.springboot.backend.clinica.entities.Notes;

@Service
public class NotesServices {

	@Autowired
	private INotesDao notesDao;
	
	@Transactional(readOnly = true)
	public List<Notes> findAll() {
		return (List<Notes>) notesDao.findAllByStatusTrue();
	}
	
	@Transactional(readOnly = true)
	public Notes findById(Long id) {
		return notesDao.findById(id).orElse(null);
	}
	
	@Transactional
	public Notes save(Notes notes) {
		return notesDao.save(notes);
	}

	@Transactional
	public void delete(Long id) {
		Notes notes = findById(id);
		notes.setStatus(false);
	}
	
	@Transactional
	public Notes createdNote(Notes requestBody) {
		Notes notes = new Notes();
		notes.setMedicalNote(requestBody.getMedicalNote());
		notes.setDoctor(requestBody.getDoctor());
		notes.setPatient(requestBody.getPatient());
		notes.setCreatedDate(new Date());
		notes.setStatus(true);
		return notesDao.save(notes);
	}

	@Transactional(readOnly = true)
	public List<Notes> findByPatientId(Long id) {
		return (List<Notes>) notesDao.findByPatientIdAndStatusTrue(id);
	}
	

	@Transactional(readOnly = true)
	public List<Notes> findByDoctorId(Long id) {
			return (List<Notes>) notesDao.findByDoctorIdAndStatusTrue(id);
	}
	

}
