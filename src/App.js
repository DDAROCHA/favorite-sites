import './App.css';
import React, { useState } from 'react'; // Importar useState
import Hero from './components/Hero';
import Projects from './components/Projects';

function App() {
  // Estado para forzar la recarga del componente Projects
  const [refreshKey, setRefreshKey] = useState(0);

  // Función que se pasa a Hero para que Projects se recargue
  const handleProjectsRefresh = () => {
    // Incrementa la key para forzar la re-renderización de Projects
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      {/* <Header /> */}
      {/* Pasamos la función de recarga a Hero */}
      <Hero onProjectsRefresh={handleProjectsRefresh} />
      {/* Usamos la refreshKey para forzar la recarga */}
      <Projects key={refreshKey} /> 
    </div>
  );
}

export default App;
