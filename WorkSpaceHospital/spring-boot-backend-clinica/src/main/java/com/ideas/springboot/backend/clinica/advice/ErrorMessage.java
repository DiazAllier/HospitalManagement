package com.ideas.springboot.backend.clinica.advice;

import java.util.Date;
import java.util.List;
import java.util.Map;


public class ErrorMessage {

	private String key;
	private String msg;
	private Map<String, List<String>> details;
	private int statusCode;
	private String description;
	private String message;

	public ErrorMessage(int statusCode, Date timestamp, String message, String description) {
		this.statusCode = statusCode;
		this.setMessage(message);
		this.description = description;
	}

	public int getStatusCode() {
		return statusCode;
	}


	public String getDescription() {
		return description;
	}

	public ErrorMessage(String key, String msg, Map<String, List<String>> details) {
		this.key = key;
		this.msg = msg;
		this.details = details;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Map<String, List<String>> getDetails() {
		return details;
	}

	public void setDetails(Map<String, List<String>> details) {
		this.details = details;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
