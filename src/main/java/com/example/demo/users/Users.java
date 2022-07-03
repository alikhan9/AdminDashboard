package com.example.demo.users;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@EqualsAndHashCode
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String username;
    private String first_name;
    private String last_name;
    private String email;
    private LocalDateTime dateofbirth;
    private String password;

    public Users(String username, String first_name, String last_name, String email, LocalDateTime dateofbirth, String password) {
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.dateofbirth = dateofbirth;
        this.password = password;
    }
}
