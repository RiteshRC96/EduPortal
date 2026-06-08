package com.Eduportalapp.repo;

import com.Eduportalapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
