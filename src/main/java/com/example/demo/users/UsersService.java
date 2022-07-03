package com.example.demo.users;

import com.example.demo.exceptions.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class UsersService {

    @Autowired
    UserRepository userRepository;


    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public void updateUser(Users user) {
        if (!userRepository.existsById(user.getId()))
            throw new BadRequestException("User with id " + user.getId() + " is not in the database");
        if (userRepository.existsByEmail(user.getEmail()))
            throw new BadRequestException("User with email " + user.getEmail() + " already exists");
        if (userRepository.existsByUsername(user.getUsername()))
            throw new BadRequestException("User with username " + user.getUsername() + " already exists");
        userRepository.save(user);
    }

    public void addUser(Users user) {
        if ( userRepository.existsByEmail(user.getEmail()))
            throw new BadRequestException("User with email " + user.getEmail() + " already exists");
        if (userRepository.existsByUsername(user.getUsername()))
            throw new BadRequestException("User with username " + user.getUsername() + " already exists");
        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id))
            throw new BadRequestException("User with id " + id + " is not in the database");
        userRepository.deleteById(id);

    }
}
