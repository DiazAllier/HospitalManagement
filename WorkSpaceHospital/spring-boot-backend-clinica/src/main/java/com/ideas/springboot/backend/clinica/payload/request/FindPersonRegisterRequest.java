package com.ideas.springboot.backend.clinica.payload.request;

import java.time.LocalDate;

public class FindPersonRegisterRequest {

	private String firstName;
	private String lastName;
	private LocalDate dob;
	
	public FindPersonRegisterRequest(String firstName, String lastName, LocalDate dob) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

}
