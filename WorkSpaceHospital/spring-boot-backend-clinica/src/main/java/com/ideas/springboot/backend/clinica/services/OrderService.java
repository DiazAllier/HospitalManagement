package com.ideas.springboot.backend.clinica.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ideas.springboot.backend.clinica.dao.IOrderDao;
import com.ideas.springboot.backend.clinica.entities.Order;

@Service
public class OrderService {

	@Autowired
	private IOrderDao orderDao;

	@Transactional
	public List<Order> findAll() {
		return orderDao.findAll();
	}

	@Transactional
	public Optional<Order> findById(Long id) {
		return orderDao.findById(id);
	}

	@Transactional
	public Order save(Order order) {
		return orderDao.save(order);
	}

}
