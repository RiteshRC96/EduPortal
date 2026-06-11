package com.Eduportalapp.controller;

import com.Eduportalapp.dto.InstituteCardDTO;
import com.Eduportalapp.dto.InstituteDetailDTO;
import com.Eduportalapp.model.District;
import com.Eduportalapp.model.State;
import com.Eduportalapp.service.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/colleges")
public class InstituteController {

    @Autowired
    private InstituteService instituteService;

    // ── GET /api/colleges/states ───────────────────────────────────────────────
    // Returns all states for the State dropdown
    @GetMapping("/states")
    public ResponseEntity<List<State>> getAllStates() {
        return ResponseEntity.ok(instituteService.getAllStates());
    }

    // ── GET /api/colleges/districts?stateId=1 ─────────────────────────────────
    // Returns all districts for a given state (powers the District dropdown)
    @GetMapping("/districts")
    public ResponseEntity<List<District>> getDistrictsByState(
            @RequestParam Long stateId) {
        return ResponseEntity.ok(instituteService.getDistrictsByState(stateId));
    }

    // ── GET /api/colleges?stateId=1&districtId=2&page=0&size=10 ──────────────
    // Paginated, A–Z sorted list. stateId and districtId are optional filters.
    @GetMapping
    public ResponseEntity<Page<InstituteCardDTO>> getInstitutes(
            @RequestParam(required = false) Long stateId,
            @RequestParam(required = false) Long districtId,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                instituteService.getInstitutes(stateId, districtId, page, size));
    }

    // ── GET /api/colleges/{id} ────────────────────────────────────────────────
    // Full institute detail with aggregated stats and programme list
    @GetMapping("/{id}")
    public ResponseEntity<InstituteDetailDTO> getInstituteDetail(
            @PathVariable Long id) {
        return ResponseEntity.ok(instituteService.getInstituteDetail(id));
    }
}
