package com.recBrowserActions.controllers;

import com.recBrowserActions.dto.UserDTO;
import com.recBrowserActions.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.io.Serializable;

@Controller
public class UserControllers {

    @Autowired
    private UserService userService;
    static final String JSON_API_CONTENT_HEADER = "Content-type=application/json";

    @RequestMapping(path ="/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }



    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Serializable loginUser(ModelMap model, @ModelAttribute("userDTO") UserDTO userDTO) {
        boolean isValidUser = userService.loginUser(userDTO.getUserName(), userDTO.getUserPassword());
        if (!isValidUser) {
            //добавляем к разметке значение атрибута error
            model.addAttribute("error", "Access Denied , Invalid Data");
            return model;
        }
        return "dashboard";
    }

    @RequestMapping(path = "/registration", method = RequestMethod.POST)
    public String registration(@ModelAttribute("userDTO") UserDTO userDTO) {
        userService.addUser(userDTO);
        return "redirect:/login";
    }

    @RequestMapping(path = "/registration", method = RequestMethod.GET)
    public String registration(Model model) {
        model.addAttribute("UserDTO", new UserDTO());
        return "registration";
    }

    @RequestMapping(path = "/app", method = RequestMethod.GET)
    public String app(@ModelAttribute("userDTO") UserDTO userDTO) {
        //js и sel

        // 1. получить с html ссылку для js (в js код для возврата путей элементов)

        // 2. нажатие на элементы сохраняются в файл

        // 3. css i xpath после нажатия на элементы

        // 4. принять элементы и сохранить

        // 5. после окончания отобразить во вкладке нажатые элементы

        // 6. запуск по скрипту
        return "app";
    }
}



