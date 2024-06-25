package ru.kata.spring.boot_security.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import ru.kata.spring.boot_security.demo.models.Role;

public class CustomGrantedAuthority implements GrantedAuthority {

    private Role role;

    @Autowired
    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role.getName();
    }
}
