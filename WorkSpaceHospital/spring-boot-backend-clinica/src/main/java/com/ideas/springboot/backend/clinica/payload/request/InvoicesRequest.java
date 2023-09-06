package com.ideas.springboot.backend.clinica.payload.request;

import java.util.List;

import com.ideas.springboot.backend.clinica.entities.Product;

public class InvoicesRequest {

	private Long idPatient;
	private List<Product> products;
	private String description;

	public Long getIdPatient() {
		return idPatient;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public void setIdPatient(Long idPatient) {
		this.idPatient = idPatient;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "InvoicesRequest [idPatient=" + idPatient + ", product=" + products.toString() + ", description="
				+ description + "]";
	}

}
