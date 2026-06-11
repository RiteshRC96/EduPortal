package com.Eduportalapp.repo;

import com.Eduportalapp.model.Programme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgrammeRepo extends JpaRepository<Programme, Long> {

    // Fetch all programmes for a given institute
    List<Programme> findByInstituteId(Long instituteId);
}
