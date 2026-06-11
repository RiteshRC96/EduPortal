package com.Eduportalapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Lightweight projection returned by the paginated college listing endpoint.
 * Only the fields needed to render a college card on the Home page.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstituteCardDTO {

    private Long id;
    private String instituteName;
    private String address;
    private String stateName;
    private String districtName;
    private String institutionType;
    private String university;
    private String aicteId;
}
