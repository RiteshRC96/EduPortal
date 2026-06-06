package com.Eduportalapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {
    @GetMapping("/api/theme")
    public String getTheme() {
        return "home controller changed by shekhar";
    }
}