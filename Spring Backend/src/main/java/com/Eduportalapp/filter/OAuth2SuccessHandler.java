package com.Eduportalapp.filter;
import com.Eduportalapp.model.User;
import com.Eduportalapp.repo.UserRepo;
import com.Eduportalapp.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Extract user info from Google
        String email = oAuth2User.getAttribute("email");
        String name  = oAuth2User.getAttribute("name");

        // ✅ Check if user exists, if not — create them
        User user = userRepo.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode("OAUTH2_USER")); // dummy password
            user.setRole("ROLE_USER");
            userRepo.save(user);
        }

        // Generate your existing JWT
        String token = jwtService.generateToken(email);

        // Redirect to frontend with token in URL
        String redirectUrl = "http://localhost:3000/oauth2/callback?token=" + token
                + "&username=" + name
                + "&role=USER";

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}