package com.ideas.springboot.backend.clinica.payload.request;


public class TokenConfirmationRequest {

	private String confirmationToken;

	public String getConfirmationToken() {
		return confirmationToken;
	}

	public void setConfirmationToken(String confirmationToken) {
		this.confirmationToken = confirmationToken;
	}

}