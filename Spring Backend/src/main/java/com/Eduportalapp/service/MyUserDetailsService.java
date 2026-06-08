package com.Eduportalapp.service;

import com.Eduportalapp.model.User;
import com.Eduportalapp.repo.UserPrincipal;
import com.Eduportalapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = repo.findByEmail(email);

        if(user == null){
            throw new UsernameNotFoundException(email);
        }

        return new UserPrincipal(user);
    }
}
