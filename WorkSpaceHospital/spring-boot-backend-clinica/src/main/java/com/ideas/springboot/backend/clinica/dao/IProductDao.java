package com.ideas.springboot.backend.clinica.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ideas.springboot.backend.clinica.entities.Product;

public interface IProductDao extends JpaRepository<Product, Long>{
	
	List<Product> findByEnableTrue();
	Product findByName(String name);
	Product findByCode(String code);
} 