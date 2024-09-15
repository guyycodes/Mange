 package com.mange.mange.controller;
// /**
//  * Client
//  * │
//  * │ (HTTP Request)
//  * ▼
//  * Controller
//  * │
//  * │ (Method call with params)
//  * ▼
//  * Service
//  * │
//  * │ (Business logic / Method call)
//  * ▼
//  * Repository
//  * │
//  * │ (Database operation)
//  * ▼
//  * Model / Database
//  * │
//  * │ (Results / Data)
//  * ▲
//  * Repository
//  * │
//  * │ (Processed data / Entities)
//  * ▲
//  * Service
//  * │
//  * │ (Optional additional processing)
//  * ▲
//  * Controller
//  * │
//  * │ (HTTP Response)
//  * ▲
//  * Client
//  */

 import com.mange.mange.models.User;
 import com.mange.mange.service.UserService;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.util.List;

 @RestController
 @RequestMapping("/api/users")
 public class UserController {

     private final UserService userService;

     @Autowired
     public UserController(UserService userService) {
         this.userService = userService;
     }

     @PostMapping
     public ResponseEntity<User> createUser(@RequestBody User user) {
         User newUser = userService.createUser(user);
         return new ResponseEntity<>(newUser, HttpStatus.CREATED);
     }

     @GetMapping
     public ResponseEntity<List<User>> getAllUsers() {
         List<User> users = userService.getAllUsers();
         return new ResponseEntity<>(users, HttpStatus.OK);
     }

     @GetMapping("/{id}")
     public ResponseEntity<User> getUserById(@PathVariable Long id) {
         return userService.getUserById(id)
                 .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
         userService.deleteUser(id);
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
     }
 }