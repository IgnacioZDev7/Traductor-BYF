import { useState, useEffect, useRef } from 'react';
import type { Frase } from '../types/frase';
import { obtenerFrases, buscarFrases, obtenerFrasesPorCategoria } from '../api/frases';

import FilterPanel from '../components/FilterPanel';
import ResultList from '../components/ResultList';

import BodyPartsModal from '../components/BodyPartsModal';

const Home: React.FC = () => {
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [isBodyModalOpen, setIsBodyModalOpen] = useState<boolean>(false);
  
  const [frases, setFrases] = useState<Frase[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Referencia para manejar el Debounce de tipado en tiempo real sin dependencias descontroladas
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    // Carga inicial pasiva
    envolverPeticion(() => obtenerFrases());
  }, []);

  const handleSearch = () => {
    setCategoriaSeleccionada(null); // Al forzar búsqueda, anular filtros visuales
    if (textoBusqueda.trim() !== '') {
      envolverPeticion(() => buscarFrases(textoBusqueda));
    } else {
      envolverPeticion(() => obtenerFrases());
    }
  };

  // UX: Búsqueda en tiempo real (Debounced)
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextoBusqueda(value);
    setCategoriaSeleccionada(null);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (value.trim() !== '') {
        envolverPeticion(() => buscarFrases(value));
      } else {
        envolverPeticion(() => obtenerFrases());
      }
    }, 500); // 500ms debounce
  };

  const handleSelectCategoria = (cat: string | null) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    setTextoBusqueda('');
    setCategoriaSeleccionada(cat);

    if (cat !== null) {
      envolverPeticion(() => obtenerFrasesPorCategoria(cat));
    } else {
      envolverPeticion(() => obtenerFrases());
    }
  };

  const handleClear = () => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setTextoBusqueda('');
    setCategoriaSeleccionada(null);
    setError(null);
    envolverPeticion(() => obtenerFrases()); // Regresar a glosario default
  };

  // Nulifica la traducción principal frente a usuarios que dejan todos los inputs vacíos, a fin de no secuestrar visualmente la app con el index 0 de la BD
  const isBuscando = textoBusqueda.trim() !== '' || categoriaSeleccionada !== null;
  const traduccionPrincipal = isBuscando && frases.length > 0 ? frases[0] : null;

  // Manejo de Tema Claro/Oscuro persistente
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="home-container">
      
      <header className="home-header" style={{ position: 'relative' }}>
        <button 
          onClick={toggleTheme}
          className="btn-secondary"
          style={{ position: 'absolute', top: '-10px', right: 0, padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
        >
          {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
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
            onChange={handleTextChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <div className="translator-action-bar">
            <button 
              className="btn-secondary" 
              onClick={handleClear}
              disabled={loading || (!isBuscando && error === null)}
            >
              Limpiar
            </button>
            <button onClick={handleSearch} disabled={loading}>
              Traducir
            </button>
          </div>
        </div>

        {/* Lado Derecho: Output Fluido */}
        <div className="translator-section">
          
          {error && (
            <div className="translator-empty-state" style={{ color: 'var(--color-error)' }}>
              Oops! {error}
            </div>
          )}

          {!error && !traduccionPrincipal && textoBusqueda.trim() === '' && !loading && (
            <div className="translator-empty-state">
              Escribe una frase en español para ver la traducción.
            </div>
          )}

          {!error && !traduccionPrincipal && loading && (
            <div className="translator-empty-state" style={{ color: 'var(--color-primary-500)' }}>
              Traduciendo consulta...
            </div>
          )}

          {!error && !traduccionPrincipal && !loading && textoBusqueda.trim() !== '' && (
            <div className="translator-empty-state">
              No se encontraron traducciones exactas para el término ingresado.
            </div>
          )}

          {/* Renderizado con 'Fade' suave para realismo en tiempo real */}
          {!error && traduccionPrincipal && (
            <div className={`translator-results-container ${loading ? 'is-translating' : ''}`}>
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

      {/* BLOQUE SECUNDARIO: Resultados o Historial Auxiliar */}
      <section className="additional-content-section">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px solid var(--border-color)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <h2 className="section-title" style={{ borderBottom: 'none', margin: 0, padding: 0 }}>Filtrar por contexto clínico</h2>
          <button className="btn-secondary" onClick={() => setIsBodyModalOpen(true)} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', marginTop: '10px' }}>
            🧍 Ver partes del cuerpo
          </button>
        </div>
        
        <FilterPanel 
          selectedCategoria={categoriaSeleccionada}
          onSelectCategoria={handleSelectCategoria}
        />

        <main className="home-content">
          {isBuscando ? (
            <ResultList frases={frases} />
          ) : (
            <div className="empty-results" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-6)' }}>
              <p>Escribe una frase o selecciona un contexto clínico para ver resultados relacionados.</p>
            </div>
          )}
        </main>
      </section>
      
      <BodyPartsModal isOpen={isBodyModalOpen} onClose={() => setIsBodyModalOpen(false)} />
    </div>
  );
};

export default Home;
