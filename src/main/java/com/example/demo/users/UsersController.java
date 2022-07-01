package com.example.demo.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( path = "api/v1/users")
public class UsersController {

    @Autowired
    UsersService userService = new UsersService();

    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }
}
