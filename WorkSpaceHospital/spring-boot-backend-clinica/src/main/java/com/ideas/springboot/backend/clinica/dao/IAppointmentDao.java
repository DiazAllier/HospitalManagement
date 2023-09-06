package com.ideas.springboot.backend.clinica.dao;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ideas.springboot.backend.clinica.entities.Appointment;
import com.ideas.springboot.backend.clinica.entities.enums.EStatusAppointment;

public interface IAppointmentDao extends JpaRepository<Appointment, Long>{

	List<Appointment> findByDoctorId(Long doctor);

	List<Appointment> findByStatusAndDoctorId(EStatusAppointment status, Long doctor);
	
	List<Appointment> findByPatientId(Long doctor);
	
    List<Appointment> findAllByDateBetween( LocalDate startDate, LocalDate endDate);

    List<Appointment> findAllByDateAfter( LocalDate date);

    List<Appointment> findAllByDateBefore( LocalDate date);
 
//    List<Appointment> findAllByCreatorAndAppointmentDateBetween( User creator,  LocalDate startDate,  LocalDate endDate);
//
//    List<Appointment> findAllByCreatorAndAppointmentDateBetweenAndAppointmentStatus( User creator,  LocalDate startDate, LocalDate endDate, AppointmentStatus status);
//
//    List<Appointment> findAllByCreatorAndAppointmentDateBefore( User creator, LocalDate date);
//
//    List<Appointment> findAllByCreatorAndAppointmentDateBeforeAndAppointmentStatus( User creator,  LocalDate date, AppointmentStatus status);
//
//    List<Appointment> findAllByCreatorAndAppointmentDateAfter( User creator, LocalDate date);
//
//    List<Appointment> findAllByCreatorAndAppointmentDateAfterAndAppointmentStatus( User creator, LocalDate date, AppointmentStatus status);
}
