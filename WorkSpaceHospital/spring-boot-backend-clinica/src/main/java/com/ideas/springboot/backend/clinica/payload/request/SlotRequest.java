package com.ideas.springboot.backend.clinica.payload.request;

import java.time.LocalDate;
import java.time.LocalTime;

public class SlotRequest {

	private Long id;

	private LocalTime startTime;
	private LocalTime endTime;

	private LocalDate date;
	private boolean available;

	
	private Long idDoctor;

	
	public SlotRequest() {
	}

	public SlotRequest(Long id, LocalTime startTime, LocalTime endTime, boolean available, Long idDoctor) {
		this.id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.available = available;
		this.idDoctor = idDoctor;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public Long getIdDoctor() {
		return idDoctor;
	}

	public void setIdDoctor(Long idDoctor) {
		this.idDoctor = idDoctor;
	}
	
	
}
