package com.example.Profile_Management.Control;
import com.example.Profile_Management.Entity.Waiter;
import com.example.Profile_Management.Service.WaiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/waiters")
public class WaiterController {

    @Autowired
    private WaiterService waiterService;

    @GetMapping("/all")
    public List<Waiter> getAllWaiters() {
        return waiterService.getAllWaiters();
    }

    @GetMapping("/{id}")
    public Waiter getWaiterById(@PathVariable Long id) {
        return waiterService.getWaiterById(id);
    }

    @PostMapping("/add")
    public Waiter createWaiter(@RequestBody Waiter waiter) {
        return waiterService.createWaiter(waiter);
    }

    @PutMapping("/{id}")
    public Waiter updateWaiter(@PathVariable Long id, @RequestBody Waiter waiterDetails) {
        return waiterService.updateWaiter(id, waiterDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteWaiter(@PathVariable Long id) {
        waiterService.deleteWaiter(id);
    }
}
