package com.recBrowserActions.service;


import com.recBrowserActions.dto.UserDTO;

public interface UserService {
    String addUser(UserDTO userDTO);
    boolean loginUser(String name, String pass);
}