import React from 'react';
import type { Frase } from '../types/frase';
import PhraseCard from './PhraseCard';

export interface ResultListProps {
  frases: Frase[];
}

const ResultList: React.FC<ResultListProps> = ({ frases }) => {
  // Comprobación de lista vacía
  if (!frases || frases.length === 0) {
    return (
      <div 
        className="empty-results"
        style={{
          padding: '2.5rem',
          textAlign: 'center',
          color: '#aaa',
          border: '2px dashed #444',
          borderRadius: '12px',
          backgroundColor: '#1a1a1a',
          marginTop: '1.5rem'
        }}
      >
        <p style={{ fontSize: '1.1rem', margin: 0 }}>No se encontraron resultados.</p>
      </div>
    );
  }

  // Renderizado de la lista
  return (
    <div 
      className="resultlist-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginTop: '1.5rem',
        width: '100%'
      }}
    >
      {frases.map((frase) => (
        <PhraseCard key={frase.id} frase={frase} />
      ))}
    </div>
  );
};

export default ResultList;
