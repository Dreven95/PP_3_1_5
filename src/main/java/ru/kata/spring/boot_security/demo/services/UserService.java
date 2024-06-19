package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

@Service
public interface UserService {

    public List<User> getAllUsers();

    public void save(User user);

    public User getUser(int id);

    public void update(int id, User user);

    public void delete(int id);

}
