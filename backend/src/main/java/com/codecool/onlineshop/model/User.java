package com.codecool.onlineshop.model;

import com.codecool.onlineshop.enums.Roles;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private String address;
    private String phoneNumber;
    private String paymentInfo;
    private String imagePath;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Cart> carts = new ArrayList<>();
    private Roles role;

    @Override
    public String toString() {
        return "Id: " + id + "\n" +
                "User: " + username + "\n" +
                "Email: " + email + "\n" +
                "Password: " + password + "\n" +
                "Address: " + address + "\n" +
                "Phone number: " + phoneNumber + "\n" +
                "Payment info: " + paymentInfo;
    }
}
