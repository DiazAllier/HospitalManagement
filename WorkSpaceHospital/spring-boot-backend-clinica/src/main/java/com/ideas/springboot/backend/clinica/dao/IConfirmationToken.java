package com.ideas.springboot.backend.clinica.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.ideas.springboot.backend.clinica.entities.ConfirmationToken;
import com.ideas.springboot.backend.clinica.entities.User;

public interface IConfirmationToken extends CrudRepository<ConfirmationToken, Long> {

	ConfirmationToken findByConfirmationToken(String token);
	List<ConfirmationToken> findByUser(User user);
	
}
