package com.Eduportalapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "programme")
public class Programme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "institute_id")
    private Long instituteId;

    @Column(name = "programme")
    private String programme;

    @Column(name = "course")
    private String course;

    @Column(name = "course_type")
    private String courseType;

    @Column(name = "level")
    private String level;

    @Column(name = "shift")
    private String shift;

    @Column(name = "intake")
    private String intake;

    @Column(name = "availability")
    private String availability;

    @Column(name = "enrollment")
    private String enrollment;

    @Column(name = "placement")
    private String placement;
}
