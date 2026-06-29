import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('MEDIA');
  const [errorBackend, setErrorBackend] = useState(false);

  const API_URL = 'http://localhost:8080/api/tasks';

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
      setErrorBackend(true);
      setTasks([
        { id: 1, description: 'Ejemplo: Configurar CI/CD con GitHub Actions', priority: 'ALTA' },
        { id: 2, description: 'Ejemplo: Desplegar Frontend en GitHub Pages', priority: 'MEDIA' }
      ]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
        setNewTitle('');
        fetchTasks();
      }
    } catch (error) {
      console.error('Error al guardar la tarea en Java:', error);
      const mockTask = { id: Date.now(), description: newTitle, priority: newPriority };
      setTasks([...tasks, mockTask]);
      setNewTitle('');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTasks();
      } else {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Error al borrar la tarea en Java:', error);
      setTasks(tasks.filter(task => task.id !== id));
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
              ⚠️ <strong>Modo Demostración Activo:</strong> El backend local está desconectado. Puedes probar la interfaz interactiva simulada.
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
                          <div className="card-footer">
                            <span className="badge">{task.priority}</span>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="delete-button"
                                title="Eliminar tarea"
                            >
                              🗑️
                            </button>
                          </div>
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