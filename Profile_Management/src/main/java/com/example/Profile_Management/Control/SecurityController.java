package com.example.Profile_Management.Control;

import com.example.Profile_Management.Entity.Security;
import com.example.Profile_Management.Service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/securities")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    @GetMapping("/all")
    public List<Security> getAllSecurities() {
        return securityService.getAllSecurities();
    }

    @GetMapping("/{id}")
    public Security getSecurityById(@PathVariable Long id) {
        return securityService.getSecurityById(id);
    }

    @PostMapping("/add")
    public Security createSecurity(@RequestBody Security security) {
        return securityService.createSecurity(security);
    }

    @PutMapping("/{id}")
    public Security updateSecurity(@PathVariable Long id, @RequestBody Security securityDetails) {
        return securityService.updateSecurity(id, securityDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteSecurity(@PathVariable Long id) {
        securityService.deleteSecurity(id);
    }
}
