package com.codecool.onlineshop.service;


import com.codecool.onlineshop.exceptions.ItemNotFoundException;
import com.codecool.onlineshop.model.Item;
import com.codecool.onlineshop.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.IntStream;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }
    public void addItem(Item item) {
        itemRepository.save(item);
    }
    public void addItems(List<Item> items) {
        itemRepository.saveAll(items);
    }
    public void deleteItemById(Long id) {
        itemRepository.deleteById(id);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long itemId) {
        return itemRepository.findById(itemId);
    }

    public Item updateItem(Long itemId, Item updatedItem) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with ID: " + itemId));

        item.setName(updatedItem.getName());
        item.setPrice(updatedItem.getPrice());
        item.setImagePath(updatedItem.getImagePath());
        item.setCategory(updatedItem.getCategory());
        item.setDescription(updatedItem.getDescription());
        item.setVisibility(updatedItem.isVisibility());

        return itemRepository.save(item);
    }

    public Item visibilityToggle(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with ID: " + itemId));

        item.setVisibility(!item.isVisibility());

        return itemRepository.save(item);
    }

//    @Transactional
//    public void generateAndInsertRandomItems() {
//        IntStream.rangeClosed(1, 10).forEach(i -> {
//            Item item = createRandomItem();
//            itemRepository.save(item);
//        });
//    }

    private Item createRandomItem() {
        String randomName = generateRandomName();
        Long randomPrice = generateRandomPrice();

        return Item.builder()
                .name(randomName)
                .price(randomPrice)
                .build();
    }

    private String generateRandomName() {
        return "Item" + new Random().nextInt(1000);
    }

    private Long generateRandomPrice() {
        return (long) (10 + Math.random() * 91);
    }
}
