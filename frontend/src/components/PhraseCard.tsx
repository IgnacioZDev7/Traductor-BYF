import React from 'react';
import type { Frase } from '../types/frase';

export interface PhraseCardProps {
  frase: Frase;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ frase }) => {
  return (
    <div className="phrase-card">
      <div className="phrase-sections">
        
        {/* Sección: Español */}
        <div className="phrase-section lang-es">
          <small className="phrase-section-label">Español</small>
          <p className="phrase-section-text">
            {frase.texto_es || 'No disponible'}
          </p>
        </div>

        {/* Sección: Aymara */}
        <div className="phrase-section lang-ay">
          <small className="phrase-section-label">Aymara</small>
          <p className="phrase-section-text">
            {frase.texto_ay || 'No disponible'}
          </p>
        </div>

        {/* Sección: Quechua */}
        <div className="phrase-section lang-qu">
          <small className="phrase-section-label">Quechua</small>
          <p className="phrase-section-text">
            {frase.texto_qu || 'No disponible'}
          </p>
        </div>

      </div>

      {/* Metadatos: Categoría y Subcategoría */}
      <div className="phrase-metadata">
        <span>
          <strong>Categoría:</strong>
          <span>{frase.categoria || 'No disponible'}</span>
        </span>
        
        <span>
          <strong>Subcategoría:</strong>
          <span>{frase.subcategoria || 'No disponible'}</span>
        </span>
      </div>
    </div>
  );
};

export default PhraseCard;
