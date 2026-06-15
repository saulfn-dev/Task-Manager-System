package com.example.demo;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

class TaskTest {

    @Test
    @DisplayName("Debería inicializar una tarea con descripción, prioridad y estado PENDIENTE")
    void deberiaCrearTareaCorrectamente() {
        String descripcionEsperada = "Configurar servidor de producción en la nube";
        String prioridadEsperada = "ALTA";

        Task tarea = new Task(descripcionEsperada, prioridadEsperada);

        assertNotNull(tarea, "La tarea no debería ser nula");
        assertEquals(descripcionEsperada, tarea.getDescription(), "La descripción debe coincidir");
        assertEquals(prioridadEsperada, tarea.getPriority(), "La prioridad debe coincidir");
        assertEquals("PENDIENTE", tarea.getStatus(), "Toda tarea nueva debe nacer en estado PENDIENTE");
    }

    @Test
    @DisplayName("Debería permitir cambiar el estado de una tarea")
    void deberiaPermitirCambiarEstado() {

        Task tarea = new Task("Revisar logs de errores", "BAJA");

        tarea.setStatus("COMPLETADO");

        assertEquals("COMPLETADO", tarea.getStatus(), "El estado debería haber cambiado a COMPLETADO");
    }
}