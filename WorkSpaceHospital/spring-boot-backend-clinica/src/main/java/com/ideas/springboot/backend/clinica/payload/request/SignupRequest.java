package com.ideas.springboot.backend.clinica.payload.request;

import java.util.Set;

import com.ideas.springboot.backend.clinica.entities.Person;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;

public class SignupRequest {
	
	private String username;

	@Email
	private String email;

	private Set<Long> roles;
	
	@Column(length = 3000) 
	private String password;

	private Person person;
	
	public Person getPerson() {
		return person;
	}
 
	public void setPerson(Person person) {
		this.person = person;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<Long> getRoles() {
		return roles;
	}

	public void setRoles(Set<Long> roles) {
		this.roles = roles;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}



	@Override
	public String toString() {
		return "SignupRequest [username=" + username + ", email=" + email + ", roles=" + roles + ", password="
				+ password + ", person=" + person + "]";
	}
	
}