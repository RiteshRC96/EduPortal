package com.Eduportalapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "institute")
public class Institute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "state_id")
    private Long stateId;

    @Column(name = "district_id")
    private Long districtId;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "institution_type")
    private String institutionType;

    @Column(name = "women")
    private String women;

    @Column(name = "minority")
    private String minority;

    @Column(name = "other_id")
    private String otherId;

    @Column(name = "university")
    private String university;

    @Column(name = "aicte_id")
    private String aicteId;

    @Column(name = "institute_name")
    private String instituteName;
}
