package com.example.Profile_Management.Control;

import com.example.Profile_Management.Entity.Manager;
import com.example.Profile_Management.Service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/managers")
public class ManagerController {
    @Autowired
    private ManagerService managerService;

    @GetMapping("/all")
    public List<Manager> getAllManagers() {
        return managerService.getAllManagers();
    }

    @GetMapping("/{id}")
    public Manager getManagerById(@PathVariable Long id) {
        return managerService.getManagerById(id);
    }

    @PostMapping("/add")
    public Manager createManager(@RequestBody Manager manager) {
        return managerService.createManager(manager);
    }

    @PutMapping("/{id}")
    public Manager updateManager(@PathVariable Long id, @RequestBody Manager managerDetails) {
        return managerService.updateManager(id, managerDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteManager(@PathVariable Long id) {
        managerService.deleteManager(id);
    }
}
