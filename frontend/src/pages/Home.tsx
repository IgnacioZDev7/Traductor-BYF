import { useState, useEffect } from 'react';
import type { Frase } from '../types/frase';
import { obtenerFrases, buscarFrases, obtenerFrasesPorCategoria } from '../api/frases';

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

  useEffect(() => {
    envolverPeticion(() => obtenerFrases());
  }, []);

  const handleSearch = () => {
    setCategoriaSeleccionada(null);

    if (textoBusqueda.trim() !== '') {
      envolverPeticion(() => buscarFrases(textoBusqueda));
    } else {
      envolverPeticion(() => obtenerFrases());
    }
  };

  const handleSelectCategoria = (cat: string | null) => {
    setTextoBusqueda('');
    setCategoriaSeleccionada(cat);

    if (cat !== null) {
      envolverPeticion(() => obtenerFrasesPorCategoria(cat));
    } else {
      envolverPeticion(() => obtenerFrases());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  // El primer resultado retornado será asumido como la "Traducción Principal" en el display superior
  const traduccionPrincipal = frases.length > 0 ? frases[0] : null;

  return (
    <div className="home-container">
      
      <header className="home-header">
        <h1 className="home-title">Traductor Médico BYF</h1>
        <p className="home-subtitle">Aymara - Quechua - Español</p>
      </header>

      {/* BLOQUE PRINCIPAL: Traductor Clínico Dual */}
      <section className="translator-panel">
        
        {/* Lado Izquierdo: Input de Español */}
        <div className="translator-section translator-section-left">
          <label className="translator-label">Español</label>
          <textarea 
            className="translator-textarea"
            placeholder="Escriba el síntoma o instrucción médica..."
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="translator-action-bar">
            <button onClick={handleSearch} disabled={loading}>
              {loading ? 'Traduciendo...' : 'Traducir'}
            </button>
          </div>
        </div>

        {/* Lado Derecho: Output de Aymara y Quechua */}
        <div className="translator-section">
          {loading && (
            <div className="translator-empty-state" style={{ color: 'var(--color-primary-500)' }}>
              Procesando traducción...
            </div>
          )}

          {error && !loading && (
            <div className="translator-empty-state" style={{ color: 'var(--color-error)' }}>
              Oops! {error}
            </div>
          )}

          {!loading && !error && !traduccionPrincipal && textoBusqueda.trim() !== '' && (
            <div className="translator-empty-state">
              No se encontraron traducciones exactas para el término ingresado.
            </div>
          )}

          {!loading && !error && !traduccionPrincipal && textoBusqueda.trim() === '' && (
            <div className="translator-empty-state">
              La traducción de la frase aparecerá aquí.
            </div>
          )}

          {!loading && !error && traduccionPrincipal && (
            <div className="translator-results-container">
              <div className="translator-result-box lang-ay">
                <span className="translator-label">Aymara</span>
                <p className="phrase-section-text">{traduccionPrincipal.texto_ay || 'No disponible en Aymara'}</p>
              </div>
              
              <div className="translator-result-box lang-qu">
                <span className="translator-label">Quechua</span>
                <p className="phrase-section-text">{traduccionPrincipal.texto_qu || 'No disponible en Quechua'}</p>
              </div>

              {traduccionPrincipal.categoria && (
                <div className="translator-metadata">
                  Categoría: <span style={{ textTransform: 'capitalize' }}>{traduccionPrincipal.categoria}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* BLOQUE SECUNDARIO: Resultados o Historial Auxiliar (Menos Prioritario) */}
      <section className="additional-content-section">
        <h2 className="section-title">Contexto Clínico y Resultados Adicionales</h2>
        
        <FilterPanel 
          selectedCategoria={categoriaSeleccionada}
          onSelectCategoria={handleSelectCategoria}
        />

        <main className="home-content">
          <ResultList frases={frases} />
        </main>
      </section>
      
    </div>
  );
};

export default Home;
