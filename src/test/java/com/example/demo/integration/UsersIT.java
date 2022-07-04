package com.example.demo.integration;

import com.example.demo.users.UserRepository;
import com.example.demo.users.Users;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
public class UsersIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository usersRepository;

    private final Faker faker = new Faker();


    @Test
    void canGetAllUsers() throws Exception {
        // given
        List<Users> users = new ArrayList<Users>();
        for (int i = 0; i < 3; i++)
            users.add(new Users(
                    faker.name().username(),
                    faker.name().firstName(),
                    faker.name().lastName(),
                    faker.internet().emailAddress(),
                    LocalDateTime.now(),
                    faker.internet().password()
            ));

        users.stream().forEach(user -> usersRepository.save(user));
        // when
        ResultActions resultActions = mockMvc
                .perform(get("/api/v1/users"));

        // then
        resultActions.andExpect(status().isOk());
        List<Users> usersFromDatabase = usersRepository.findAll();
        assertThat(usersFromDatabase)
                .usingRecursiveFieldByFieldElementComparatorIgnoringFields("dateofbirth")
                .containsAll(users);
    }

    @Test
    void canAddUser() throws Exception {
        //given
        Users user = new Users(
                faker.name().username(),
                faker.name().firstName(),
                faker.name().lastName(),
                faker.internet().emailAddress(),
                LocalDateTime.now(),
                faker.internet().password()
        );

        // when
        ResultActions resultActions = mockMvc
                .perform(post("/api/v1/users/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)));

        // then
        resultActions.andExpect(status().isOk());
        assertThat(usersRepository.existsByUsername(user.getUsername())).isTrue();
    }

    @Test
    void canDeleteUser() throws Exception {
        // given
        Users user = new Users(
                faker.name().username(),
                faker.name().firstName(),
                faker.name().lastName(),
                faker.internet().emailAddress(),
                LocalDateTime.now(),
                faker.internet().password()
        );
        usersRepository.save(user);

        // when
        ResultActions resultActions = mockMvc
                .perform(delete("/api/v1/users/delete/" + user.getId()));

        // then
        resultActions.andExpect(status().isOk());
        assertThat(usersRepository.existsById(user.getId())).isFalse();
    }

    @Test
    void canUpdateUser() throws Exception {
        // given
        Users user = new Users(
                faker.name().username(),
                faker.name().firstName(),
                faker.name().lastName(),
                faker.internet().emailAddress(),
                LocalDateTime.now(),
                faker.internet().password()
        );
        usersRepository.save(user);
        Optional<Users> actualUser = usersRepository.findByUsername(user.getUsername());
        Users updatedUser = new Users(
                actualUser.get().getId(),
                actualUser.get().getUsername(),
                "Johny",
                actualUser.get().getLast_name(),
                actualUser.get().getEmail(),
                actualUser.get().getDateofbirth(),
                actualUser.get().getPassword()
        );

        // when
        ResultActions resultActions = mockMvc
                .perform(put("/api/v1/users/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedUser)));

        // then
        resultActions.andExpect(status().isOk());
        assertThat(usersRepository.findById(actualUser.get().getId()).get().getFirst_name()).isEqualTo(updatedUser.getFirst_name());
    }
}
