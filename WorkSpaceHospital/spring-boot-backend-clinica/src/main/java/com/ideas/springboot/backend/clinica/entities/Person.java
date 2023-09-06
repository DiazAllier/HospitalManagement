package com.ideas.springboot.backend.clinica.entities;

import java.io.Serializable;
import java.time.LocalDate;

import com.ideas.springboot.backend.clinica.entities.enums.ESex;
import com.ideas.springboot.backend.clinica.entities.enums.EType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "person")
public class Person implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	private String name;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String homeNumber;
	private String address;
	private Integer age;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ESex sex;
	@Enumerated(EnumType.STRING)
	private EType type;
    private LocalDate dob;
	private String socialSecNumber;
	private String city;
	private String state; 
	private String zipCode;
	private boolean status;
	private boolean enable;
 
	public Person() {
	}

	public Person(Long id, String name, String lastName, String email, String phoneNumber, String homeNumber,
			String address, Integer age, ESex sex, EType type, LocalDate dob,  String city, String state,
			String zipCode, String socialSecNumber, Boolean enable, Boolean status) {
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.homeNumber = homeNumber;
		this.address = address;
		this.age = age;
		this.sex = sex;
		this.type = type;
		this.dob = dob;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.socialSecNumber = socialSecNumber;
		this.enable = enable;
		this.status = status;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getHomeNumber() {
		return homeNumber;
	}

	public void setHomeNumber(String homeNumber) {
		this.homeNumber = homeNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public ESex getSex() {
		return sex;
	}

	public void setSex(ESex sex) {
		this.sex = sex;
	}

	public EType getType() {
		return type;
	}

	public void setType(EType type) {
		this.type = type;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	

	public String getSocialSecNumber() {
		return socialSecNumber;
	}

	public void setSocialSecNumber(String socialSecNumber) {
		this.socialSecNumber = socialSecNumber;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}