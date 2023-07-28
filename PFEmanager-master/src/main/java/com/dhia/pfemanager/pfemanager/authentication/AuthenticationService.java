package com.dhia.pfemanager.pfemanager.authentication;


import com.dhia.pfemanager.pfemanager.authentication.requests.*;
import com.dhia.pfemanager.pfemanager.config.JwtService;
import com.dhia.pfemanager.pfemanager.token.Token;
import com.dhia.pfemanager.pfemanager.token.TokenRepository;
import com.dhia.pfemanager.pfemanager.token.TokenType;
import com.dhia.pfemanager.pfemanager.user.appUser.User;
import com.dhia.pfemanager.pfemanager.user.appUser.UserRepository;
import com.dhia.pfemanager.pfemanager.user.appUser.UserRole;
import com.dhia.pfemanager.pfemanager.user.enterprise.Enterprise;
import com.dhia.pfemanager.pfemanager.user.enterprise.EnterpriseRepository;
import com.dhia.pfemanager.pfemanager.user.exceptions.EmailTakenException;
import com.dhia.pfemanager.pfemanager.user.exceptions.EnterpriseBlockedException;
import com.dhia.pfemanager.pfemanager.user.exceptions.EnterpriseNotFoundException;
import com.dhia.pfemanager.pfemanager.user.intern.Intern;
import com.dhia.pfemanager.pfemanager.user.owner.SuperAdmin;
import com.dhia.pfemanager.pfemanager.user.owner.SuperAdminRepository;
import com.dhia.pfemanager.pfemanager.user.supervisor.Supervisor;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final SuperAdminRepository superAdminRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse adminRegister(AdminRegisterRequest registerRequest) {

        var user = SuperAdmin.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .role(UserRole.SUPER_ADMIN)
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userType("admin")
                .build();
    }

    public AuthenticationResponse enterpriseRegister(EnterpriseRegisterRequest registerRequest) throws EmailTakenException {
        Optional<User> userOptional = repository.findUserByEmail(registerRequest.getEmail());
        if (userOptional.isPresent()){
            throw new EmailTakenException("This email is already taken");
        }
        var enterprise = Enterprise.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .role(UserRole.ENTERPRISE)
                .field(registerRequest.getField())
                .isBlocked(false)
                .build();
        var savedEnterprise = repository.save(enterprise);
        var jwtToken = jwtService.generateToken(enterprise);
        var refreshToken = jwtService.generateRefreshToken(enterprise);
        saveUserToken(savedEnterprise, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userType("enterprise")
                .build();
    }


    public AuthenticationResponse internRegister(InternRegisterRequest registerRequest) throws EmailTakenException, EnterpriseNotFoundException, EnterpriseBlockedException {
        Optional<User> userOptional = repository.findUserByEmail(registerRequest.getEmail());
        if (userOptional.isPresent()){
            throw new EmailTakenException("This email is already taken");
        }
        if (!enterpriseRepository.existsEnterpriseByEmail(registerRequest.getEnterpriseEmail())){
            throw new EnterpriseNotFoundException("Enterprise by this email doesn't exist");
        }
        var enterprise = enterpriseRepository.findEnterpriseByEmail(registerRequest.getEnterpriseEmail());
        if (enterprise.isBlocked()){
            throw new EnterpriseBlockedException("The enterprise which email you are using is currently blocked");
        }
        var intern = Intern.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .speciality(registerRequest.getSpeciality())
                .enterprise(enterprise)
                .role(UserRole.INTERN)
                .build();
        var savedIntern = repository.save(intern);
        var jwtToken = jwtService.generateToken(intern);
        var refreshToken = jwtService.generateRefreshToken(intern);
        saveUserToken(savedIntern, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userType("intern")
                .build();
    }

    public AuthenticationResponse supervisorRegister(SupervisorRegisterRequest registerRequest) throws EmailTakenException, EnterpriseNotFoundException, EnterpriseBlockedException {
        Optional<User> userOptional = repository.findUserByEmail(registerRequest.getEmail());
        if (userOptional.isPresent()){
            throw new EmailTakenException("This email is already taken");
        }
        if (!enterpriseRepository.existsEnterpriseByEmail(registerRequest.getEnterpriseEmail())){
            throw new EnterpriseNotFoundException("Enterprise by this email doesn't exist");
        }
        var enterprise = enterpriseRepository.findEnterpriseByEmail(registerRequest.getEnterpriseEmail());
        if (enterprise.isBlocked()){
            throw new EnterpriseBlockedException("The enterprise which email you are using is currently blocked");
        }
        var supervisor = Supervisor.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .speciality(registerRequest.getSpeciality())
                .role(UserRole.SUPERVISOR)
                .enterprise(enterprise)
                .type(registerRequest.getType())
                .build();
        var savedSupervisor = repository.save(supervisor);
        var jwtToken = jwtService.generateToken(supervisor);
        var refreshToken = jwtService.generateRefreshToken(supervisor);
        saveUserToken(savedSupervisor, jwtToken);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userType("supervisor")
                .build();
    }

    private void revokeAllTokens(User user){
        var validTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validTokens.isEmpty()){
            return;
        }
        validTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );
        var user = repository.findUserByEmail(authenticationRequest.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        var userRole = user.getRole().name().toLowerCase();
        revokeAllTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userType(userRole)
                .id(user.getId())
                .build();
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userName; //User email

        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }
        refreshToken = authHeader.substring(7);
        userName = jwtService.extractUsername(refreshToken);

        if (userName != null){
            var userDetails = this.repository.findUserByEmail(userName)
                    .orElseThrow();


            if (jwtService.isTokenValid(refreshToken, userDetails)){
                var accessToken = jwtService.generateToken(userDetails);
                revokeAllTokens(userDetails);
                saveUserToken(userDetails, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
