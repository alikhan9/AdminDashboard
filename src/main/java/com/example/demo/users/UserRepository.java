package com.example.demo.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<Users, Long> {

    Boolean existsByEmail(String email);
    Boolean existsByUsername(String email);

    Long deleteByUsername(String username);

    Optional<Users> findByUsername(String username);
}
