package com.Eduportalapp.controller;

import com.Eduportalapp.dto.LoginRequest;
import com.Eduportalapp.dto.LoginResponse;
import com.Eduportalapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Eduportalapp.model.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.verify(request.getEmail(), request.getPassword());
    }

}
