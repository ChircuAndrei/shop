package com.codecool.onlineshop.controller;

import com.codecool.onlineshop.model.Item;
import com.codecool.onlineshop.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }
    @GetMapping()
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @PostMapping
    public void addItem(@RequestBody Item item) {
        itemService.addItem(item);
    }

    @PostMapping("/add-items")
    public void addItems(@RequestBody List<Item> items) {
        itemService.addItems(items);
    }

    @GetMapping("/{itemId}")
    @ResponseBody
    public Optional<Item> getItemById(@PathVariable Long itemId) {
        return itemService.getItemById(itemId);
    }

    @DeleteMapping()
    public void deleteItem(@RequestBody Long itemId) {
        itemService.deleteItemById(itemId);
    }

    @PutMapping("/{itemId}")
    public Item updateItem(@PathVariable Long itemId, @RequestBody Item item) {
        return itemService.updateItem(itemId, item);
    }

    @PutMapping("/toggle-visibility/{itemId}")
    public Item itemVisibilityToggle(@PathVariable Long itemId) {
        return itemService.visibilityToggle(itemId);
    }
}
