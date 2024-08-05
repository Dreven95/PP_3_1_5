package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dao.UserDAO;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.util.List;
import java.util.NoSuchElementException;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private UserServiceImpl userServiceImpl;

    private UserDAO userDAO;

    private RoleServiceImpl roleServiceImpl;

    @Autowired
    public void setUserServiceImpl(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @Autowired
    public void setRoleServiceImpl(RoleServiceImpl roleServiceImpl) {
        this.roleServiceImpl = roleServiceImpl;
    }

    @Autowired
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @GetMapping("/current-user")
    public User getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userDAO.findByEmail(userDetails.getUsername());
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userServiceImpl.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable int id) {
        return userServiceImpl.getUser(id);
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        userServiceImpl.save(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userServiceImpl.update(user.getId(), user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        try {
            userServiceImpl.delete(id);
            return ResponseEntity.ok("User with ID: " + id + " was deleted");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleServiceImpl.getAllRoles();
    }

}
