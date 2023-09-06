package com.ideas.springboot.backend.clinica.dao;

import org.springframework.data.repository.CrudRepository;

import com.ideas.springboot.backend.clinica.entities.Specialist;

public interface ISpecialistDao extends CrudRepository<Specialist, Long>{

}
