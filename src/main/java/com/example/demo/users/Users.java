package com.example.demo.users;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Table
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@EqualsAndHashCode
public class Users {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    private String username;
    private String first_name;
    private String last_name;
    private String email;
    private LocalDateTime dateofbirth;
    private String password;
}
