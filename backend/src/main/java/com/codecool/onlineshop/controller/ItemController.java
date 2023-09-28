package com.codecool.onlineshop.controller;

import com.codecool.onlineshop.model.Item;
import com.codecool.onlineshop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }
    @CrossOrigin(origins = "http://localhost:3000") // Allow CORS policy
    @GetMapping()
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @PostMapping
    public void addItem(@RequestBody Item item) {
        itemService.addItem(item);
    }

    @GetMapping("/{itemId}")
    @ResponseBody
    public Optional<Item> getItemById(@PathVariable Long itemId) {
        return itemService.getItemById(itemId);
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable Long itemId) {
        itemService.deleteItemById(itemId);
    }
    @PutMapping("{itemId}")
    public Item updateRoom(@PathVariable Long itemId, @RequestBody Item item) {
        itemService.updateItem(itemId, item);
        return item;
    }

}
