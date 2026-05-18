package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    @GetMapping
    public List<Task> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Task task) {
        try {
            if (task.getDescription() == null || task.getDescription().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: La descripción de la tarea es obligatoria.");
            }

            String priority = (task.getPriority() != null) ? task.getPriority() : "MEDIA";
            Task savedTask = repository.save(new Task(task.getDescription(), priority));

            return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la tarea: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody String newStatus) {
        try {
            Task task = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Tarea no encontrada con ID: " + id));
            task.setStatus(newStatus);
            return ResponseEntity.ok(repository.save(task));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            if (!repository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se puede borrar: ID " + id + " no existe.");
            }
            repository.deleteById(id);
            return ResponseEntity.ok("Tarea eliminada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar.");
        }
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<?> completeTask(@PathVariable Long id) {
        try {
            Task task = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("No se pudo completar: La tarea con ID " + id + " no existe."));
            task.setStatus("COMPLETADO");
            return ResponseEntity.ok(repository.save(task));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado.");
        }
    }
}