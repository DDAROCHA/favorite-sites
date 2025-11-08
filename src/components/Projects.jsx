// Projects.jsx (Snippet de la lógica principal)

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

// La URL ya la tenemos definida:
const API_ENDPOINT = 'https://portfolio-ddr-backend.onrender.com/api/projects'; 

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        // Asume que la respuesta es un array de proyectos
        setProjects(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        setLoading(false);
        // Opcional: setProjects([]); para no mostrar nada
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="projects">
        <h2>Featured Projects</h2>
        <p>Cargando proyectos...</p>
      </section>
    );
  }

  return (
    <section className="projects">
      <h2>Featured Projects!</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * project.id }} // Usa el ID para un stagger effect
            whileHover={{ scale: 1.05 }}
          >
            {/* 🚨 AQUÍ SE RENDERIZA LA IMAGEN Y LOS DATOS DE LA DB */}
            {project.image_url && (
              <img 
                src={project.image_url} 
                alt={`Snapshot del proyecto ${project.title}`} 
                className="project-snapshot" 
              />
            )}
            
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a 
              href={project.link_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn"
            >
              {project.link_text || "View App"}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;