package com.example.demo.users;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {


    @Autowired
    private UserRepository userRepository;

    private UsersService underTest;

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void itShouldCheckWhenUserExistsByEmail() {
        // given
        String email = "john.dao@gmail.com";
        Users user = new Users(
                1L,
                "john49",
                "John",
                "Dao",
                "john.dao@gmail.com",
                LocalDateTime.now(),
                "123456"
        );
        userRepository.save(user);

        // when
        boolean expected = userRepository.existsByEmail(email);

        // then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldCheckWhenUserDoesNotExistByEmail() {
        // given
        String email = "john.dao@gmail.com";

        // when
        boolean expected = userRepository.existsByEmail(email);

        // then
        assertThat(expected).isFalse();
    }

    @Test
    void itShouldCheckWhenUserExistsByUserName() {
        // given
        String username = "john49";
        Users user = new Users(
                1L,
                "john49",
                "John",
                "Dao",
                "john.dao@gmail.com",
                LocalDateTime.now(),
                "123456"
        );
        userRepository.save(user);

        // when
        boolean expected = userRepository.existsByUsername(username);

        // then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldCheckWhenUserDoesNotExistByUserName() {
        // given
        String username = "john49";

        // when
        boolean expected = userRepository.existsByUsername(username);

        // then
        assertThat(expected).isFalse();
    }

    @Test
    void ItShouldDeleteUserByUsername() {
        // given
        Users user = new Users(
                1L,
                "john49",
                "John",
                "Dao",
                "john.dao@gmail.com",
                LocalDateTime.now(),
                "123456"
        );
        userRepository.save(user);

        // when
        Long expected = userRepository.deleteByUsername(user.getUsername());

        // then
        assertThat(expected).isEqualTo(1);
    }

    @Test
    void ItShouldNotDeleteUserWhenUsernameIsNotFound() {
        // given
        String username = "john49";

        // when
        Long expected = userRepository.deleteByUsername(username);

        // then
        assertThat(expected).isEqualTo(0);
    }

    @Test
    void ItShouldGetUserByUsername() {
        // given
        Users user = new Users(
                1L,
                "john49",
                "John",
                "Dao",
                "john.dao@gmail.com",
                LocalDateTime.now(),
                "123456"
        );
        userRepository.save(user);

        // when
        Optional<Users> expected = userRepository.findByUsername(user.getUsername());

        // then
        assertThat(expected.get()).isEqualTo(user);
    }

    @Test
    void ItShouldNotGetUserWhenUsernameIsNotFound() {
        // given
        String username = "john49";

        // when
        Optional<Users> expected = userRepository.findByUsername(username);

        // then
        assertThat(expected).isEmpty();
    }

}