package com.ideas.springboot.backend.clinica.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ideas.springboot.backend.clinica.entities.Person;

public interface IPersonDao extends CrudRepository<Person, Long>{

	Optional<Person> findByEmail(String email);
	List<Person> findByEnableTrue();
	Person findByNameAndLastNameAndDob(String name, String lastName, LocalDate localDate);
}
