package com.recBrowserActions.repo;

import com.recBrowserActions.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    Optional<User> findOneByEmailAndPassword(String email, String password);
    Optional<User> findOneByUsernameAndPassword(String username, String password);
    User findByEmail(String email);
    User findByUsername(String username);
}
