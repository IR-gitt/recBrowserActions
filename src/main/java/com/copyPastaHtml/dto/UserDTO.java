package com.copyPastaHtml.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UserDTO {
    private int userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String resp_person;
}
