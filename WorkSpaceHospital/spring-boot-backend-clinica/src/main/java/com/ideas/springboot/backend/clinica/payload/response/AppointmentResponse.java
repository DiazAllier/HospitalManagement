package com.ideas.springboot.backend.clinica.payload.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.ideas.springboot.backend.clinica.entities.enums.EStatusAppointment;


public class AppointmentResponse {

	private Long id;

	private LocalDate date;

	private LocalTime startTime;
	private LocalTime endTime;
	private Long idDoctor;
	private String emailPatient;
	private EStatusAppointment status;
	
	

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public EStatusAppointment getStatus() {
		return status;
	}

	public void setStatus(EStatusAppointment status) {
		this.status = status;
	}

	public String getEmailPatient() {
		return emailPatient;
	}

	public void setEmailPatient(String emailPatient) {
		this.emailPatient = emailPatient;
	}
 
	private Long idSlot;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Long getIdDoctor() {
		return idDoctor;
	}

	public void setIdDoctor(Long idDoctor) {
		this.idDoctor = idDoctor;
	}

	

	public Long getIdSlot() {
		return idSlot;
	}

	public void setIdSlot(Long idSlot) {
		this.idSlot = idSlot;
	}

	
}
