import React from 'react';
import type { Frase } from '../types/frase';

export interface PhraseCardProps {
  frase: Frase;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ frase }) => {
  return (
    <div 
      className="phrase-card"
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        textAlign: 'left',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="phrase-sections" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Sección: Español */}
        <div className="phrase-section">
          <small style={{ color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Español
          </small>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.15rem', color: '#ffffff' }}>
            {frase.texto_es || 'No disponible'}
          </p>
        </div>

        {/* Sección: Aymara */}
        <div className="phrase-section" style={{ paddingLeft: '1rem', borderLeft: '3px solid #646cff' }}>
          <small style={{ color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Aymara
          </small>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.15rem', color: '#e0e0e0' }}>
            {frase.texto_ay || 'No disponible'}
          </p>
        </div>

        {/* Sección: Quechua */}
        <div className="phrase-section" style={{ paddingLeft: '1rem', borderLeft: '3px solid #ff4646' }}>
          <small style={{ color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Quechua
          </small>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.15rem', color: '#e0e0e0' }}>
            {frase.texto_qu || 'No disponible'}
          </p>
        </div>

      </div>

      {/* Metadatos: Categoría y Subcategoría */}
      <div 
        className="phrase-metadata"
        style={{
          marginTop: '0.5rem',
          paddingTop: '1rem',
          borderTop: '1px dotted #444',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontSize: '0.85rem',
          color: '#888'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <strong style={{ color: '#bbb' }}>Categoría:</strong>
          <span style={{ textTransform: 'capitalize' }}>
            {frase.categoria || 'No disponible'}
          </span>
        </span>
        
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <strong style={{ color: '#bbb' }}>Subcategoría:</strong>
          <span style={{ textTransform: 'capitalize' }}>
            {frase.subcategoria || 'No disponible'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default PhraseCard;
