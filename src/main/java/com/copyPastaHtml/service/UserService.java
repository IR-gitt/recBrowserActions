package com.copyPastaHtml.service;


import com.copyPastaHtml.dto.UserDTO;

public interface UserService {
    String addUser(UserDTO userDTO);
    boolean loginUser(String name, String pass);
}