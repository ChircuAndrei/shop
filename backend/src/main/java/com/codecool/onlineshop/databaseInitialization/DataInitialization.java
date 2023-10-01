package com.codecool.onlineshop.databaseInitialization;

import com.codecool.onlineshop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitialization implements CommandLineRunner {
    private final ItemService itemService;

    @Autowired
    public DataInitialization(ItemService itemService) {
        this.itemService = itemService;
    }

    @Override
    public void run(String... args) {
        //itemService.generateAndInsertRandomItems();
    }
}
