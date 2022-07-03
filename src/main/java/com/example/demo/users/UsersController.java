package com.example.demo.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @PutMapping (path = "/update")
    public void updateUser(@RequestBody Users user) {
        userService.updateUser(user);
    }

    @PostMapping (path = "/add")
    public void addUser(@RequestBody Users user) {
        userService.addUser(user);
    }

    @DeleteMapping (path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);
    }

}
