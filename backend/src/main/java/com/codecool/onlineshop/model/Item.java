package com.codecool.onlineshop.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long price;
    private String imagePath;
    private String category;
    private String description;
    @Column(columnDefinition = "BOOLEAN")
    private boolean visibility;

    @Override
    public String toString() {
        return "Id: " + id + "\n" +
                "Name: " + name + "\n" +
                "Price: " + price + "\n" +
                "Category: " + category + "\n" +
                "Description: " + description + "\n" +
                "Visibility: " + visibility;
    }

}
