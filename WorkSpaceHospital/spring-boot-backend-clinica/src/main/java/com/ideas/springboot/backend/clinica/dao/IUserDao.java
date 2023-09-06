package com.ideas.springboot.backend.clinica.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ideas.springboot.backend.clinica.entities.User;

public interface IUserDao extends CrudRepository<User, Long> {

	  User findByEmail(String email);

	  Optional<User> findByUsername(String username);

	  Boolean existsByUsername(String username);

	  Boolean existsByEmail(String email);

	  List<User> findByEnableTrue();
	  List<User> findByStatusTrue();

}
