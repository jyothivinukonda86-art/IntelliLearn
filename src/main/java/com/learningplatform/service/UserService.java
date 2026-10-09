package com.learningplatform.service;

import com.learningplatform.dto.LoginRequest;
import com.learningplatform.dto.LoginResponse;
import com.learningplatform.dto.RegisterRequest;

public interface UserService {

    void registerUser(RegisterRequest request);

    LoginResponse loginUser(LoginRequest request);
}