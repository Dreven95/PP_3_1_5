package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dao.RoleDAO;
import ru.kata.spring.boot_security.demo.dao.UserDAO;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class Init {

    private UserServiceImpl userService;

    private RoleDAO roleDAO;

    @Autowired
    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleDAO(RoleDAO roleDAO) {
        this.roleDAO = roleDAO;
    }

    @PostConstruct
    private void postConstruct() {
        Role adminRole = new Role(1, "ADMIN");
        Role userRole = new Role(2, "USER");
        roleDAO.save(adminRole);
        roleDAO.save(userRole);
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        User admin = new User(1, "admin1", "admin1@mail.ru", "123", adminRoles);
        User user = new User(2, "user1", "user1@mail.ru", "123", userRoles);
        userService.save(admin);
        userService.save(user);
    }

}
