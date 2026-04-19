import { useState, useEffect } from 'react';
import type { Frase } from '../types/frase';
import { obtenerFrases, buscarFrases, obtenerFrasesPorCategoria } from '../api/frases';

import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ResultList from '../components/ResultList';

const Home: React.FC = () => {
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  
  const [frases, setFrases] = useState<Frase[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const envolverPeticion = async (peticion: () => Promise<Frase[]>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await peticion();
      setFrases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar las frases');
    } finally {
      setLoading(false);
    }
  };

  // Efecto principal reservado estrictamente para la carga inicial (Mount)
  useEffect(() => {
    envolverPeticion(() => obtenerFrases());
  }, []);

  // Manejador del buscador (botón o 'Enter')
  const handleSearch = () => {
    // Al realizar una búsqueda por texto, limpiamos el filtro visual de categoría
    setCategoriaSeleccionada(null);

    // Dependiendo del input, realizamos la petición respectiva
    if (textoBusqueda.trim() !== '') {
      envolverPeticion(() => buscarFrases(textoBusqueda));
    } else {
      envolverPeticion(() => obtenerFrases());
    }
  };

  // Interceptor para el panel de categorías
  const handleSelectCategoria = (cat: string | null) => {
    // Limpiamos visualmente el texto de búsqueda al tocar paneles
    setTextoBusqueda('');
    setCategoriaSeleccionada(cat);

    // Y delegamos directamente la petición explícitamente sin depender de un useEffect
    if (cat !== null) {
      envolverPeticion(() => obtenerFrasesPorCategoria(cat));
    } else {
      envolverPeticion(() => obtenerFrases());
    }
  };

  return (
    <div className="home-container" style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Cabecera / Títulos */}
      <header className="home-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Traductor Médico BYF</h1>
        <p style={{ color: '#888', fontSize: '1.2rem', margin: 0 }}>Aymara - Quechua - Español</p>
      </header>

      {/* Controles de Filtros y Búsqueda */}
      <section className="controls-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        <SearchBar 
          value={textoBusqueda}
          onChange={setTextoBusqueda}
          onSearch={handleSearch}
        />
        
        <FilterPanel 
          selectedCategoria={categoriaSeleccionada}
          onSelectCategoria={handleSelectCategoria}
        />
      </section>

      {/* Área de Resultados y Estados de Carga/Error */}
      <main className="home-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#646cff' }}>
            <h2 style={{ margin: 0 }}>Cargando resultados...</h2>
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ff4646', border: '1px solid #ff4646', borderRadius: '8px', backgroundColor: '#3a1a1a' }}>
            <h3>Oops! Algo salió mal</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <ResultList frases={frases} />
        )}
      </main>
      
    </div>
  );
};

export default Home;
