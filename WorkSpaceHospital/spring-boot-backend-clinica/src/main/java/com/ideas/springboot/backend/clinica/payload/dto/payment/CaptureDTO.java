package com.ideas.springboot.backend.clinica.payload.dto.payment;

import java.io.Serializable;

public class CaptureDTO implements Serializable{

	private static final long serialVersionUID = 5318533344277278302L;
	private String id;
    private String status;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
    
}
