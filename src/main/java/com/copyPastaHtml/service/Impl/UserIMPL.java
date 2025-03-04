package com.copyPastaHtml.service.Impl;

import com.copyPastaHtml.dto.UserDTO;
import com.copyPastaHtml.entity.User;
import com.copyPastaHtml.repo.UserRepo;
import com.copyPastaHtml.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserIMPL implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO) {
        String nameIsUsed = "Имя пользователя занято";
        String emailIsUsed = "Email уже используется";
        String NameAndEmailIsUsed = "Указанные Email и Имя пользователя используются";
        String successRegistration = "Регистрация прошла успешно";

        User user = new User(
                userDTO.getUserId(),
                userDTO.getUserName(),
                userDTO.getUserEmail(),
                this.passwordEncoder.encode(userDTO.getUserPassword())
        );
        User username = userRepo.findByUsername(user.getUsername());
        User email = userRepo.findByEmail(user.getEmail());

        if (username != null && email != null) {
            return NameAndEmailIsUsed;
        } else if (email != null) {
            return emailIsUsed;
        } else if (username != null) {
            return nameIsUsed;
        } else {
            userRepo.save(user);
        }
        return successRegistration;
    }


    // По логину и паролю выполняем авторизацию
    @Override
    public boolean loginUser(String login, String pass) {
        User user1 = userRepo.findByUsername(login);
        if (user1 != null) {
            String encodedPassword = user1.getPassword();
            boolean isPwdRight = passwordEncoder.matches(pass, encodedPassword);
            if (isPwdRight) {
                Optional<User> employee = userRepo.findOneByUsernameAndPassword(login, encodedPassword);
                if (employee.isPresent()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
