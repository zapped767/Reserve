package com.example.Profile_Management.Service;

import com.example.Profile_Management.Entity.Security;
import com.example.Profile_Management.Exception.ResourceNotFoundException;
import com.example.Profile_Management.Repository.SecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityService {

    @Autowired
    private SecurityRepository securityRepository;

    public List<Security> getAllSecurities() {
        return securityRepository.findAll();
    }

    public Security getSecurityById(Long id) {
        return securityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Security not found with id " + id));
    }

    public Security createSecurity(Security security) {
        return securityRepository.save(security);
    }

    public Security updateSecurity(Long id, Security securityDetails) {
        Security security = securityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Security not found with id " + id));
        security.setName(securityDetails.getName());
        security.setPosition(securityDetails.getPosition());
        security.setAddress(securityDetails.getAddress());
        security.setContactNumber(securityDetails.getContactNumber());
        return securityRepository.save(security);
    }

    public void deleteSecurity(Long id) {
        Security security = securityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Security not found with id " + id));
        securityRepository.delete(security);
    }
}
