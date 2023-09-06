package com.ideas.springboot.backend.clinica.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ideas.springboot.backend.clinica.dao.IAppointmentDao;
import com.ideas.springboot.backend.clinica.entities.Appointment;
import com.ideas.springboot.backend.clinica.entities.enums.EStatusAppointment;
import com.ideas.springboot.backend.clinica.payload.request.AppointmentRequest;

@Service
public class AppointmentService {

	@Autowired
	private IAppointmentDao appointmentRepository;

	@Transactional
	public Appointment bookAppointment(Appointment appointment) throws Exception {

		appointment.setStatus(EStatusAppointment.PENDING);
		return appointmentRepository.save(appointment);
	}

	public Appointment updateStatus(Long appointmentId, AppointmentRequest appointment) {

		Optional<Appointment> appointmentList = appointmentRepository.findById(appointmentId);

		if (appointmentList.isPresent()) {
			if (appointment.getStatus() != null) {
				appointmentList.get().setStatus(appointment.getStatus());
			}
			return appointmentRepository.save(appointmentList.get());
		}
		return null;
	}

	@Transactional(readOnly = true)
	public List<Appointment> findByDoctorId(Long doctorId) {
		return appointmentRepository.findByDoctorId(doctorId);
	}


	@Transactional(readOnly = true)
	public List<Appointment> getAppointmentsByDoctor(EStatusAppointment status, Long doctorId) {
		return appointmentRepository.findByStatusAndDoctorId(status, doctorId);
	}

	@Transactional(readOnly = true)
	public List<Appointment> getAppointmentsByPatient(Long patientId) {
		return appointmentRepository.findByPatientId(patientId);
	}

	@Transactional
	public void delete(List<Appointment> app) throws Exception {
		appointmentRepository.deleteAll(app);
	}

}
