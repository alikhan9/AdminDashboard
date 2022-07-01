package com.example.demo.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    @Autowired
    UserRepository userRepository;
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }
}
