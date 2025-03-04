package com.copyPastaHtml.controllers;

import com.copyPastaHtml.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.io.Serializable;

@Controller
public class UserControllers {

    @Autowired
    private UserService userService;
    static final String JSON_API_CONTENT_HEADER = "Content-type=application/json";

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Serializable loginUser(ModelMap model, @RequestBody String name, String password) {
        //todo:
        boolean isValidUser = userService.loginUser(name, password);
        if (!isValidUser) {
            //добавляем к разметке значение атрибута error
            model.addAttribute("error", "Access Denied , Invalid Data");
            return "dashboard";
        }
        return "dashboard";
    }
}



