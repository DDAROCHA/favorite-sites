// Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

// URL de la API de Render (Ya verificamos que funciona)
const API_ENDPOINT = 'https://portfolio-ddr-backend.onrender.com/api/projects'; 

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook para cargar los datos al montar el componente
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setProjects(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error loaing site list:", error);
        setLoading(false);
        // Opcional: setProjects([]); si quieres mostrar un error específico
      }
    };
    fetchProjects();
  }, []); // El array vacío asegura que se ejecute solo al inicio

  if (loading) {
    return (
      <section className="projects">
        <h2>Featured Sites</h2>
        <p>Loading List...</p>
      </section>
    );
  }

  return (
    <section className="projects">
      <h2>Featured Sites</h2>
      <div className="projects-grid">
        {/* ITERACIÓN DINÁMICA DE LOS PROYECTOS */}
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            // Ajuste el delay para que la animación sea escalonada
            transition={{ duration: 0.8, delay: 0.1 * index }} 
            whileHover={{ scale: 1.05 }}
          >
            {/* 🚨 AQUÍ SE CARGA LA IMAGEN CON LA URL DE LA BASE DE DATOS */}
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