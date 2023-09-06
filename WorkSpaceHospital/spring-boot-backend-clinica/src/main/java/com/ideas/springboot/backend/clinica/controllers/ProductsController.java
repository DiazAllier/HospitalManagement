package com.ideas.springboot.backend.clinica.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas.springboot.backend.clinica.entities.Product;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.ProductServices;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductsController {

	@Autowired
	private ProductServices services;

	@GetMapping("controller/product")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(services.findAll());
	}

	@GetMapping("controller/product/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.ok(services.findById(id));
	}

	@PostMapping("controller/product")
	public ResponseEntity<?> save(@RequestBody Product product) {
		Product existingProductCode = services.findByCode(product.getCode());
		Product existingProductName = services.findByName(product.getName());
		
		if(existingProductCode != null || existingProductName != null) {
			return ResponseEntity.badRequest().body(new MessageResponse("Code or name already registered!"));
		}
		product.setEnable(true);
		return ResponseEntity.ok(services.save(product));
	}

	@DeleteMapping("controller/product/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		services.delete(id);
		return ResponseEntity.ok("Product deleted");
	}

}
