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
    if (selectedCategoria === categoria) {
      onSelectCategoria(null);
    } else {
      onSelectCategoria(categoria);
    }
  };

  return (
    <div className="filterpanel-container">
      {CATEGORIAS.map((cat) => {
        const isSelected = selectedCategoria === cat;
        return (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`filter-button ${isSelected ? 'selected' : ''}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default FilterPanel;
