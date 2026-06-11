package com.Eduportalapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Full detail DTO returned when a user clicks "View Details" on a college card.
 * Includes all institute fields + aggregated programme statistics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstituteDetailDTO {

    // ── Basic Info ─────────────────────────────────────────────────
    private Long id;
    private String instituteName;
    private String address;
    private String stateName;
    private String districtName;
    private String institutionType;
    private String university;
    private String aicteId;
    private String women;
    private String minority;

    // ── Aggregated Statistics (across all programmes) ──────────────
    private int totalIntake;
    private int totalEnrollment;
    private int totalPlacement;
    private double placementPercentage;   // (totalPlacement / totalEnrollment) * 100

    // ── Programme List ─────────────────────────────────────────────
    private List<ProgrammeDTO> programmes;

    // ── Nested DTO ─────────────────────────────────────────────────
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProgrammeDTO {
        private Long id;
        private String programme;
        private String course;
        private String courseType;
        private String level;
        private String shift;
        private String intake;
        private String availability;
        private String enrollment;
        private String placement;
    }
}
