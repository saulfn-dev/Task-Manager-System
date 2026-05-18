# Sistema de Gestión de Tareas

![Captura del Dashboard](./screenshots/dashboard.png)

Este proyecto es una solución integral que combina un **Backend en Java** con un **Cliente de monitoreo en Python**, demostrando la integración entre diferentes ecosistemas tecnológicos.

## Tecnologías Utilizadas
- **Backend:** Java 25, Spring Boot, Spring Data JPA.
- **Base de Datos:** H2 (En memoria, para pruebas rápidas).
- **Scripting:** Python 3 (Librería `requests`).
- **Gestión de API:** Arquitectura REST con manejo de estados HTTP (201, 404, 400).

## Estructura del Proyecto
* `/src/main/java`: Contiene la lógica del Backend y la configuración de la API.
* `reporte.py`: Script de Python que consume la API y genera un reporte técnico en consola.
* `pom.xml`: Dependencias de Maven para el proyecto Java.

## Cómo ejecutarlo
1. **Levantar el Backend:** Ejecuta la clase `DemoApplication.java` desde tu IDE (IntelliJ). El servidor iniciará en `http://localhost:8080`.
2. **Lanzar el Reporte:** Abre una terminal y ejecuta:
   ```bash
   python reporte.py