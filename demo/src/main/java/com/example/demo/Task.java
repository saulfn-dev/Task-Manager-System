package com.example.demo;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String status;
    private String priority;
    private LocalDateTime createdAt;

    public Task() {}

    public Task(String description, String priority) {
        this.description = description;
        this.priority = priority;
        this.status = "PENDIENTE";
        this.createdAt = LocalDateTime.now();
    }
    
    public Long getId() { return id; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}