package com.Eduportalapp.filter;

import com.Eduportalapp.service.JwtService;
import com.Eduportalapp.service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;



@Configuration
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext context;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String path = request.getRequestURI();
        if (
                path.equals("/api/auth/login") ||
                        path.equals("/api/auth/register")
        ) {
            filterChain.doFilter(request, response);
            return;
        }
        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);//"Bearer " 6 idx skip
            username = jwtService.extractEmail(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails=context.getBean(MyUserDetailsService.class).loadUserByUsername(username);

            if (jwtService.validateToken(token,userDetails)) {
                UsernamePasswordAuthenticationToken authentication = new
                        UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        }
        filterChain.doFilter(request, response);
    }
}
