package com.ideas.springboot.backend.clinica.payload.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.ideas.springboot.backend.clinica.entities.enums.EStatusAppointment;

public class AppointmentRequest {

	private Long id;

	private LocalDate date;

	private LocalTime startTime;
	private LocalTime endTime;
	private Long idDoctor;
	private String emailPatient;
	private String reason;
	private EStatusAppointment status;

	
	
	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
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

}
