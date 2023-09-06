package com.ideas.springboot.backend.clinica.payload.dto.payment;

import java.util.List;

public class PaymentsDTO {

	private List<CaptureDTO> captures;

	public List<CaptureDTO> getCaptures() {
		return captures;
	}

	public void setCaptures(List<CaptureDTO> captures) {
		this.captures = captures;
	}

    
}
