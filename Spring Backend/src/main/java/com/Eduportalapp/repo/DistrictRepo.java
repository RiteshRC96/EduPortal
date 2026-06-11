package com.Eduportalapp.repo;

import com.Eduportalapp.model.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepo extends JpaRepository<District, Long> {

    // Fetch all districts that belong to a given state
    List<District> findByStateId(Long stateId);
}
