package com.codecool.onlineshop.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany
    @JoinColumn(name = "item_id")
    private List<Item> items = new ArrayList<>();
    private double total;

    public void updateTotal() {
        this.total = items.stream()
                .mapToDouble(Item::getPrice)
                .sum();
    }


    public void addItem(Item item) {
        items.add(item);
    }
}
