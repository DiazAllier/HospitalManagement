package com.ideas.springboot.backend.clinica.payload.response;

import org.springframework.validation.Errors;

public class MessageResponse {
	private String message;
	  public static MessageResponse builder() {
		    return new MessageResponse();
		  }
	public MessageResponse(String message) {
		this.message = message;
	}

	public MessageResponse(Errors errors) {
		this.message = errors.toString();
	}

	public MessageResponse() {
	}


	public String getMessage() {
		return message;
	}

	public String setMessage(String message) {
		return this.message = message;
	}
}