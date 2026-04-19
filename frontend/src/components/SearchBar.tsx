import React from 'react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Escribe aquí para buscar...',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div 
      className="searchbar-container" 
      style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        width: '100%', 
        maxWidth: '600px', 
        margin: '0 auto' 
      }}
    >
      <input
        type="text"
        className="searchbar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #555',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          outline: 'none'
        }}
      />
      <button
        className="searchbar-button"
        onClick={onSearch}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#646cff',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
