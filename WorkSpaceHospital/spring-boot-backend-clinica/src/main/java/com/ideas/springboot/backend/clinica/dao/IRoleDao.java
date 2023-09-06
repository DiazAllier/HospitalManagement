package com.ideas.springboot.backend.clinica.dao;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas.springboot.backend.clinica.entities.Role;
import com.ideas.springboot.backend.clinica.entities.enums.ERole;

public interface IRoleDao extends JpaRepository<Role, Long>{


    Set<Role> findByIdIn(Set<Long> roleNames);

	Optional<Role> findByName(ERole name);
}
