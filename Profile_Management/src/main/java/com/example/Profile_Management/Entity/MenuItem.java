package com.example.Profile_Management.Entity;




import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table (name="MenuItem")
@AllArgsConstructor
@NoArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    public MenuItem(long l, String burger, String deliciousBeefBurger, int i, double v) {
    }

    public MenuItem(long l, String pizza, String cheesePizza, double v) {
    }

    public MenuItem(Long o, String pasta, String creamyAlfredo, double v) {
    }

    public MenuItem(Long o, String pasta, double v, String creamyAlfredoPasta) {
    }

    public MenuItem(String pizza, String cheesyPizza, double v) {
    }


    public boolean getQuantity() {
        return true;
    }
}
