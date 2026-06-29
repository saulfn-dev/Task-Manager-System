import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('MEDIA');
  const [errorBackend, setErrorBackend] = useState(false);

  // La URL exacta donde tu Spring Boot escucha las peticiones
  const API_URL = 'http://localhost:8080/api/tasks';

  // FUNCIÓN PARA TRAER LAS TAREAS DE JAVA (GET)
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        setErrorBackend(false);
      } else {
        console.error('Error al traer tareas de la API');
      }
    } catch (error) {
      console.error('No se pudo conectar con Spring Boot:', error);
      setErrorBackend(true); // Activa la alerta de que Java está apagado
    }
  };

  // Traer las tareas automáticamente nada más abrir la página web
  useEffect(() => {
    fetchTasks();
  }, []);

  // FUNCIÓN PARA MANDAR UNA TAREA NUEVA A JAVA (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const taskToSend = {
      description: newTitle,
      priority: newPriority
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskToSend)
      });

      if (response.ok) {
        setNewTitle(''); // Limpia el formulario
        fetchTasks();    // Recarga la lista llamando de nuevo a Java para ver la nueva tarea
      }
    } catch (error) {
      console.error('Error al guardar la tarea en Java:', error);
    }
  };

  return (
      <div className="app-container">
        <header className="app-header">
          <h1>🚀 Task Manager System</h1>
          <p className="subtitle">Frontend desarrollado en React | Backend en Spring Boot 4</p>
        </header>

        {errorBackend && (
            <div className="backend-alert">
              ⚠️ <strong>Backend desconectado:</strong> No se pudo conectar con el servidor Java. Asegúrate de encender Spring Boot en IntelliJ.
            </div>
        )}

        <main className="app-main">
          {/* Formulario de Creación */}
          <section className="form-section">
            <h2>Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="task-form">
              <input
                  type="text"
                  placeholder="¿Qué hay que hacer?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="task-input"
              />
              <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="task-select"
              >
                <option value="BAJA">🟢 Baja</option>
                <option value="MEDIA">🟡 Media</option>
                <option value="ALTA">🔴 Alta</option>
              </select>
              <button type="submit" className="task-button">Añadir</button>
            </form>
          </section>

          {/* Listado de Tareas */}
          <section className="list-section">
            <h2>Listado de Tareas</h2>
            <div className="task-grid">
              {tasks.length === 0 ? (
                  <p className="empty-message">No hay tareas pendientes en la base de datos.</p>
              ) : (
                  tasks.map(task => (
                      <div key={task.id} className={`task-card priority-${task.priority.toLowerCase()}`}>
                        <div className="card-body">
                          <p className="task-desc">{task.description}</p>
                          <span className="badge">{task.priority}</span>
                        </div>
                      </div>
                  ))
              )}
            </div>
          </section>
        </main>
      </div>
  );
}

export default App;