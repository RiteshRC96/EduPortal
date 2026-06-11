package com.Eduportalapp.service;

import com.Eduportalapp.dto.InstituteCardDTO;
import com.Eduportalapp.dto.InstituteDetailDTO;
import com.Eduportalapp.model.District;
import com.Eduportalapp.model.Institute;
import com.Eduportalapp.model.Programme;
import com.Eduportalapp.model.State;
import com.Eduportalapp.repo.DistrictRepo;
import com.Eduportalapp.repo.InstituteRepo;
import com.Eduportalapp.repo.ProgrammeRepo;
import com.Eduportalapp.repo.StateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InstituteService {

    @Autowired
    private StateRepo stateRepo;

    @Autowired
    private DistrictRepo districtRepo;

    @Autowired
    private InstituteRepo instituteRepo;

    @Autowired
    private ProgrammeRepo programmeRepo;

    // ── Build lookup maps once per request ────────────────────────────────────

    private Map<Long, String> buildStateNameMap() {
        return stateRepo.findAll()
                .stream()
                .collect(Collectors.toMap(State::getId, State::getStateName));
    }

    private Map<Long, String> buildDistrictNameMap() {
        return districtRepo.findAll()
                .stream()
                .collect(Collectors.toMap(District::getId, District::getDistrictName));
    }

    // ── States ────────────────────────────────────────────────────────────────

    public List<State> getAllStates() {
        return stateRepo.findAll();
    }

    // ── Districts ──────────────────────────────────────────────────────────────

    public List<District> getDistrictsByState(Long stateId) {
        return districtRepo.findByStateId(stateId);
    }

    // ── Paginated Institute Listing (card view) ────────────────────────────────

    /**
     * Returns a paginated page of InstituteCardDTO sorted A–Z.
     * Filters are optional:
     *   - stateId only   → filter by state
     *   - stateId + districtId → filter by both
     *   - neither        → return everything
     */
    public Page<InstituteCardDTO> getInstitutes(Long stateId, Long districtId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Institute> institutePage;

        if (stateId != null && districtId != null) {
            institutePage = instituteRepo.findByStateIdAndDistrictIdOrderByInstituteNameAsc(stateId, districtId, pageable);
        } else if (stateId != null) {
            institutePage = instituteRepo.findByStateIdOrderByInstituteNameAsc(stateId, pageable);
        } else {
            institutePage = instituteRepo.findAllByOrderByInstituteNameAsc(pageable);
        }

        Map<Long, String> stateNames    = buildStateNameMap();
        Map<Long, String> districtNames = buildDistrictNameMap();

        return institutePage.map(inst -> toCardDTO(inst, stateNames, districtNames));
    }

    // ── Full Institute Detail ──────────────────────────────────────────────────

    public InstituteDetailDTO getInstituteDetail(Long instituteId) {

        Institute institute = instituteRepo.findById(instituteId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Institute not found with id: " + instituteId));

        Map<Long, String> stateNames    = buildStateNameMap();
        Map<Long, String> districtNames = buildDistrictNameMap();

        List<Programme> programmes = programmeRepo.findByInstituteId(instituteId);

        // Aggregate stats from all programmes safely parsing strings to ints
        int totalIntake      = programmes.stream().mapToInt(p -> safeParseInt(p.getIntake())).sum();
        int totalEnrollment  = programmes.stream().mapToInt(p -> safeParseInt(p.getEnrollment())).sum();
        int totalPlacement   = programmes.stream().mapToInt(p -> safeParseInt(p.getPlacement())).sum();
        double placementPct  = totalEnrollment > 0
                ? Math.round((totalPlacement * 100.0 / totalEnrollment) * 10.0) / 10.0
                : 0.0;

        List<InstituteDetailDTO.ProgrammeDTO> programmeDTOs = programmes.stream()
                .map(this::toProgrammeDTO)
                .collect(Collectors.toList());

        return new InstituteDetailDTO(
                institute.getId(),
                institute.getInstituteName(),
                institute.getAddress(),
                stateNames.getOrDefault(institute.getStateId(), ""),
                districtNames.getOrDefault(institute.getDistrictId(), ""),
                institute.getInstitutionType(),
                institute.getUniversity(),
                institute.getAicteId(),
                institute.getWomen(),
                institute.getMinority(),
                totalIntake,
                totalEnrollment,
                totalPlacement,
                placementPct,
                programmeDTOs
        );
    }

    // ── Mappers ───────────────────────────────────────────────────────────────

    private InstituteCardDTO toCardDTO(Institute inst,
                                       Map<Long, String> stateNames,
                                       Map<Long, String> districtNames) {
        return new InstituteCardDTO(
                inst.getId(),
                inst.getInstituteName(),
                inst.getAddress(),
                stateNames.getOrDefault(inst.getStateId(), ""),
                districtNames.getOrDefault(inst.getDistrictId(), ""),
                inst.getInstitutionType(),
                inst.getUniversity(),
                inst.getAicteId()
        );
    }

    private InstituteDetailDTO.ProgrammeDTO toProgrammeDTO(Programme p) {
        return new InstituteDetailDTO.ProgrammeDTO(
                p.getId(),
                p.getProgramme(),
                p.getCourse(),
                p.getCourseType(),
                p.getLevel(),
                p.getShift(),
                p.getIntake(),
                p.getAvailability(),
                p.getEnrollment(),
                p.getPlacement()
        );
    }

    private int safeParseInt(String value) {
        if (value == null || value.trim().isEmpty()) {
            return 0;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            return 0; // Ignore non-numeric strings like 'FULL TIME'
        }
    }
}
