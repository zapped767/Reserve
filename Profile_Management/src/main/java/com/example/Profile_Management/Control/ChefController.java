package com.example.Profile_Management.Control;

import com.example.Profile_Management.Entity.Chef;
import com.example.Profile_Management.Service.ChefService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/chefs")
public class ChefController {

    @Autowired
    private ChefService chefService;

    @GetMapping ("/all")
    public List<Chef> getAllChefs() {
        return chefService.getAllChefs();
    }

    @GetMapping("/{id}")
    public Chef getChefById(@PathVariable Long id) {
        return chefService.getChefById(id);
    }

    @PostMapping("/add")
    public Chef createChef(@RequestBody Chef chef) {
        return chefService.createChef(chef);
    }

    @PutMapping("/{id}")
    public Chef updateChef(@PathVariable Long id, @RequestBody Chef chefDetails) {
        return chefService.updateChef(id, chefDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteChef(@PathVariable Long id) {
        chefService.deleteChef(id);
    }
}
