package com.example.demo.integration;

import com.example.demo.users.UserRepository;
import com.example.demo.users.Users;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

    @Test
    void canAddUser() throws Exception {
        //given
        Users user = new Users(
                "john49",
                "John",
                "Dao",
                "john.dao@gmail.com",
                LocalDateTime.now(),
                "123456"
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
}
