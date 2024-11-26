package com.example.Profile_Management.Entity;




import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name="MenuItem")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    public MenuItem(long l, String burger, String deliciousBeefBurger, int i, double v) {
    }

    public MenuItem() {

    }

    public MenuItem(long l, String pizza, String cheesePizza, double v) {
    }

    public MenuItem(Long o, String pasta, String creamyAlfredo, double v) {
    }

    public boolean getQuantity() {
        return true;
    }
}
