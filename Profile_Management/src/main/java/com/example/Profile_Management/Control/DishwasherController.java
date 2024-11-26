package com.example.Profile_Management.Control;

import com.example.Profile_Management.Entity.Dishwasher;
import com.example.Profile_Management.Service.DishwasherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/dishwashers")
public class DishwasherController {

    @Autowired
    private DishwasherService dishwasherService;

    @GetMapping("/all")
    public List<Dishwasher> getAllDishwashers() {
        return dishwasherService.getAllDishwashers();
    }

    @GetMapping("/{id}")
    public Dishwasher getDishwasherById(@PathVariable Long id) {
        return dishwasherService.getDishwasherById(id);
    }

    @PostMapping("/add")
    public Dishwasher createDishwasher(@RequestBody Dishwasher dishwasher) {
        return dishwasherService.createDishwasher(dishwasher);
    }

    @PutMapping("/{id}")
    public Dishwasher updateDishwasher(@PathVariable Long id, @RequestBody Dishwasher dishwasherDetails) {
        return dishwasherService.updateDishwasher(id, dishwasherDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteDishwasher(@PathVariable Long id) {
        dishwasherService.deleteDishwasher(id);
    }
}
