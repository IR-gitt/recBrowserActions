package com.copyPastaHtml.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Users")
public class User implements UserDetails {
    //todo: пофиксить создание id
    @Id
   // @Column(name = "user_id", length = 45)
    //@GeneratedValue(strategy = GenerationType.AUTO)
    //private int id;
    @Column(name = "user_name", length = 255)
    private String username;
    @Column(name = "user_email", length = 255)
    private String email;
    @Column(name = "user_password", length = 255)
    private String password;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }
}
