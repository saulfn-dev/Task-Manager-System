# Sistema de Gestión de Tareas

<p align="center">
  <img src="./screenshots/dashboard.png" width="800" title="Dashboard Preview">
</p>

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

### 1. Levantar el Backend
Ejecuta `DemoApplication.java`. El servidor iniciará en `http://localhost:8080`.

### 2. Consumir los datos

Hay dos opciones para visualizar la información:

*   **Opción A: Dashboard Visual**
    1. Instala las dependencias: `pip install streamlit pandas plotly requests`
    2. Ejecuta: `streamlit run dashboard.py`

*   **Opción B: Reporte Técnico**
    1. Ejecuta: `python reporte.py`