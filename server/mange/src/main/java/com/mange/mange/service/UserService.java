package com.mange.mange.service;

import com.mange.mange.models.User;
import com.mange.mange.repository.UserRepository;
import com.mange.mange.DTO.NewUserDTO;
import com.mange.mange.exceptions.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(NewUserDTO newUserDTO) {
        if (userRepository.findByEmail(newUserDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + newUserDTO.getEmail() + " already exists");
        }

        User user = new User(
                newUserDTO.getFirstName(),
                newUserDTO.getLastName(),
                newUserDTO.getEmail(),
                newUserDTO.getPassword()
        );

        user.setPhone(newUserDTO.getPhone());
        user.setGender(newUserDTO.getGender());
        user.setCountryCode(newUserDTO.getCountryCode());
        user.setDateOfBirth(newUserDTO.getDateOfBirth());
        user.setNotifications(newUserDTO.isNotifications());
        user.setRole(newUserDTO.getRole());
        user.setProfileImage(newUserDTO.getProfileImage());

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(User user) {
        if (!userRepository.existsById(user.getId())) {
            throw new RuntimeException("User not found");
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}