import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

// Usamos la variable de entorno que definimos
// En un proyecto real, se accedería así: process.env.REACT_APP_API_URL
// Por simplicidad en este ejemplo, la definimos primero.
//const API_ENDPOINT = process.env.REACT_APP_API_URL || 'https://nombre-de-tu-servicio.onrender.com/api/projects'; 
const API_ENDPOINT = 'https://portfolio-ddr-backend.onrender.com/api/projects';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
          // Si el fetch falla (ej: 404, 500)
          throw new Error(`HTTP error! Status: ${response.status}. Check CORS or API endpoint.`);
        }
        
        const data = await response.json();
        // Los datos deben coincidir con la estructura de tu tabla (title, description, link_url, link_text)
        setProjects(data); 

      } catch (e) {
        console.error("Error fetching projects:", e);
        setError("Error al cargar los proyectos desde el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // --- Renderizado Condicional ---

  if (loading) {
    return <section className="projects"><h2>Cargando Proyectos...</h2></section>;
  }

  if (error) {
    return <section className="projects"><h2>Error de Conexión</h2><p>{error}</p></section>;
  }
  
  // Si no hay proyectos (ej: tabla vacía)
  if (projects.length === 0) {
    return <section className="projects"><h2>No hay proyectos disponibles.</h2></section>;
  }


  return (
    <section className="projects">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {/* El CSS original usaba un 'delay' fijo, ahora lo hacemos dinámico por el índice */}
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} // Usamos el ID de la BD como key única
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }} // Retraso dinámico 
            whileHover={{ scale: 1.05 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a 
              href={project.link_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn"
            >
              {project.link_text || 'Ver Proyecto'}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;