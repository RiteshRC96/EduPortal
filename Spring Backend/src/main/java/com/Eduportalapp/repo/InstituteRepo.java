package com.Eduportalapp.repo;

import com.Eduportalapp.dto.InstituteCardDTO;
import com.Eduportalapp.model.Institute;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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


    @Query("SELECT new com.Eduportalapp.dto.InstituteCardDTO(" +
            "i.id, i.instituteName, i.address, s.stateName, d.districtName, " +
            "i.institutionType, i.university, i.aicteId) " +
            "FROM Institute i, State s, District d " +
            "WHERE i.stateId = s.id AND i.districtId = d.id " +
            "AND LOWER(i.instituteName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<InstituteCardDTO> searchInstitutes(@Param("keyword") String keyword);
}
