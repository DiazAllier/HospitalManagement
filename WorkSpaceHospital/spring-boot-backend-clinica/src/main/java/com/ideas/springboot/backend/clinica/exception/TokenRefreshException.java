package com.ideas.springboot.backend.clinica.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class TokenRefreshException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public TokenRefreshException(String message) {
		super(String.format(message));
	}
}