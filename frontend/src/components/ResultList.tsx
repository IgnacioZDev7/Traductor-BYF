import React from 'react';
import type { Frase } from '../types/frase';
import PhraseCard from './PhraseCard';

export interface ResultListProps {
  frases: Frase[];
}

const ResultList: React.FC<ResultListProps> = ({ frases }) => {
  if (!frases || frases.length === 0) {
    return (
      <div className="empty-results">
        <p>No se encontraron resultados.</p>
      </div>
    );
  }

  return (
    <div className="resultlist-container">
      {frases.map((frase) => (
        <PhraseCard key={frase.id} frase={frase} />
      ))}
    </div>
  );
};

export default ResultList;
