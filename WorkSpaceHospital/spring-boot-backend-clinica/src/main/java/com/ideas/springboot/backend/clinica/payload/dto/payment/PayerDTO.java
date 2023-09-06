package com.ideas.springboot.backend.clinica.payload.dto.payment;

public class PayerDTO {

	private String email_address;

	public String getEmail_address() {
		return email_address;
	}

	public void setEmail_address(String email_address) {
		this.email_address = email_address;
	}

	@Override
	public String toString() {
		return "PayerDTO [email_address=" + email_address + "]";
	}

	

}
