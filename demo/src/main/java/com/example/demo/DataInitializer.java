package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(TaskRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("Cargando datos de tareas de prueba...");

                repository.saveAll(List.of(
                        new Task("Configurar servidor de producción en la nube", "ALTA"),
                        new Task("Actualizar dependencias de seguridad de Python", "MEDIA"),
                        new Task("Revisar logs de errores en el módulo de reporting", "BAJA")
                ));

                System.out.println("Datos cargados con éxito");
            }
        };
    }
}