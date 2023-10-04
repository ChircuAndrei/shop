package com.codecool.onlineshop.controller;

import com.codecool.onlineshop.model.User;
import com.codecool.onlineshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }


   @GetMapping("/{userId}")
   @ResponseBody
   public Optional<User> getRoomById(@PathVariable Long userId) {
       return userService.getUserById(userId);
   }
    @DeleteMapping()
    public void deleteUser(@RequestBody Long userId) {
        userService.deleteUserById(userId);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        return userService.updateUserById(userId, updatedUser);
    }

}
