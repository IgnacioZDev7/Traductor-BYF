import React from 'react';

export interface FilterPanelProps {
  selectedCategoria: string | null;
  onSelectCategoria: (categoria: string | null) => void;
}

const CATEGORIAS = [
  'comunicacion',
  'antecedentes',
  'sintomas',
  'exploracion',
  'laboratorio',
  'farmacia',
  'tratamiento'
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategoria,
  onSelectCategoria,
}) => {
  const handleCategoryClick = (categoria: string) => {
    // Si la categoría clicada ya estaba seleccionada, la deseleccionamos (null)
    if (selectedCategoria === categoria) {
      onSelectCategoria(null);
    } else {
      // De lo contrario, enviamos la nueva categoría
      onSelectCategoria(categoria);
    }
  };

  return (
    <div 
      className="filterpanel-container" 
      style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        margin: '1rem 0'
      }}
    >
      {CATEGORIAS.map((cat) => {
        const isSelected = selectedCategoria === cat;
        return (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`filter-button ${isSelected ? 'selected' : ''}`}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${isSelected ? '#646cff' : '#555'}`,
              backgroundColor: isSelected ? '#646cff' : '#1a1a1a',
              color: isSelected ? '#ffffff' : '#cccccc',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: isSelected ? 'bold' : 'normal',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default FilterPanel;
