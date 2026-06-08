package com.Eduportalapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String role;        // ← add
    private String email;    // ← add
}