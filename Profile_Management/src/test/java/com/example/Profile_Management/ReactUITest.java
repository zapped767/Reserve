package com.example.Profile_Management;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ReactUITest {

    private WebDriver driver;

    @BeforeAll
    void setup() {
        WebDriverManager.chromedriver().setup(); // Automatically downloads correct ChromeDriver
        driver = new ChromeDriver();
    }

    @Test
    void testReactHomePageLoads() {
        driver.get("http://localhost:3000"); // or wherever your React app is served
        Assertions.assertTrue(driver.getTitle().contains("React App")); // Replace with your actual page title
    }

    @Test
    void testLoginPageElements() {
        driver.get("http://localhost:3000/login"); // Adjust path as per your app
        WebElement usernameField = driver.findElement(By.id("username")); // Adjust selectors as needed
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement loginButton = driver.findElement(By.id("loginBtn"));

        Assertions.assertTrue(usernameField.isDisplayed());
        Assertions.assertTrue(passwordField.isDisplayed());
        Assertions.assertTrue(loginButton.isDisplayed());
    }

    @AfterAll
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
