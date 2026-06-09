package com.Eduportalapp.service;

import com.Eduportalapp.dto.LoginResponse;
import com.Eduportalapp.model.User;
import com.Eduportalapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER");
        return userRepo.save(user);
    }

    public LoginResponse verify(String email, String password) {
        Authentication authentication =
                authManager.authenticate(

                        new UsernamePasswordAuthenticationToken(
                                email,
                                password
                        )
                );

        if(authentication.isAuthenticated()) {

            User user = userRepo.findByEmail(email);

            String token = jwtService.generateToken(email);

            String role =
                    user.getRole();

            return new LoginResponse(
                    token,
                    role,
                    user.getEmail()
            );
        }

        return null;
    }
}
