package com.ideas.springboot.backend.clinica.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ideas.springboot.backend.clinica.entities.Invoices;

public interface IInvoicesDao extends JpaRepository<Invoices, Long>{
	List<Invoices> findAllByStatus(String status);
	List<Invoices> findAllByPatientPersonIdAndStatus(Long id, String status); 
	List<Invoices> findTotalPriceByPatientId(Long id);
}