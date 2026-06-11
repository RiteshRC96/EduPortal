package com.Eduportalapp.repo;

import com.Eduportalapp.model.Institute;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstituteRepo extends JpaRepository<Institute, Long> {

    // Filter by state only (paginated)
    Page<Institute> findByStateIdOrderByInstituteNameAsc(Long stateId, Pageable pageable);

    // Filter by state + district (paginated)
    Page<Institute> findByStateIdAndDistrictIdOrderByInstituteNameAsc(Long stateId, Long districtId, Pageable pageable);

    // All institutes A-Z (paginated) — used when no filter is applied
    Page<Institute> findAllByOrderByInstituteNameAsc(Pageable pageable);
}
