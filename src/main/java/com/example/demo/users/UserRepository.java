package com.example.demo.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<Users, Long> {
    Optional<Users> findById(String email);
    Optional<Users> findByUsernameAndEmail(String username, String email);

    Boolean existsByEmail(String email);
    Boolean existsByUsername(String email);

    Long deleteByUsername(String username);
}
