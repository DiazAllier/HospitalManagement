package com.ideas.springboot.backend.clinica.entities;

import java.util.Collection;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;

	private String password;

	private String email;

	private String image;

	private boolean enable;

	private boolean status;

	@ManyToMany()
	@JoinTable(name = "users_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Collection<Role> roles;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinTable(name = "users_person", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"))
	private Person person;
	@ManyToMany
	private List<Invoices> invoices;

	public User() {
	}

	public User(Long id, String username, String password, String email, String image, boolean enable, boolean status,
			Collection<Role> roles, Person person) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.image = image;
		this.enable = enable;
		this.status = status;
		this.roles = roles;
		this.person = person;
	}

	public List<Invoices> getInvoices() {
		return invoices;
	}

	public void setBills(List<Invoices> invoices) {
		this.invoices = invoices;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Collection<Role> getRoles() {
		return roles;
	}

	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
