package com.ideas.springboot.backend.clinica.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas.springboot.backend.clinica.entities.Order;

public interface IOrderDao extends JpaRepository<Order, Long>{

    Order findByPaypalOrderId(String paypalOrderId);
}
