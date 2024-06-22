package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
public class UserController {
    private UserServiceImpl userServiceImpl;

    private RoleServiceImpl roleServiceImpl;

    @Autowired
    public void setUserService(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @Autowired
    public void setRoleService(RoleServiceImpl roleServiceImpl) {
        this.roleServiceImpl = roleServiceImpl;
    }

    @GetMapping("/user")
    public String openUserPage(Model model) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        model.addAttribute("username", username);

        return "user";
    }

    @GetMapping("/admin")
    public String showAllUsers(Model model) {
        List<User> allUsers = userServiceImpl.getAllUsers();
        List<Role> allRoles = roleServiceImpl.getAllRoles();
        model.addAttribute("allUsers", allUsers);
        model.addAttribute("allRoles", allRoles);
        model.addAttribute("user", new User());

        return "index";
    }

    @PostMapping("/admin/saveUser")
    public String saveUser(@ModelAttribute User user, @RequestParam("roles") List<Integer> roleIds) {
        Set<Role> roles = new HashSet<>();
        for (Integer roleId : roleIds) {
            roles.add(roleServiceImpl.findById(roleId));
        }
        user.setRoles(roles);
        userServiceImpl.save(user);
        return "redirect:/admin";
    }

    @PostMapping("/admin/updateUserPage")
    public String updateUserPage(@RequestParam("userId") int id, Model model) {
        User user = userServiceImpl.getUser(id);
        List<Role> allRoles = roleServiceImpl.getAllRoles();
        model.addAttribute("user", user);
        model.addAttribute("allRoles", allRoles);

        return "update-user";
    }

    @PostMapping("/admin/updateUser")
    public String updateUser(@RequestParam("id") int id, @ModelAttribute("user") User user) {
        userServiceImpl.update(id, user);

        return "redirect:/admin";
    }

    @PostMapping("/admin/deleteUser")
    public String deleteUser(@RequestParam("userId") int id) {
        userServiceImpl.delete(id);

        return "redirect:/admin";
    }
}
