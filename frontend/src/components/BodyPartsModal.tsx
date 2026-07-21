import { useEffect, useState } from 'react';
import Body from 'react-muscle-highlighter';
import type { ExtendedBodyPart } from 'react-muscle-highlighter';
import {
  bodyPartById,
  markersForPlace,
  partIdBySlug,
  type BodyView,
  type Region,
} from '../data/bodyParts';
import { FaceImage, HandImage } from './bodyModels/RegionOutlines';

interface BodyPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Gender = 'male' | 'female';

const REGIONS: { key: Region; label: string }[] = [
  { key: 'cuerpo', label: 'Cuerpo' },
  { key: 'cara', label: 'Cara' },
  { key: 'mano', label: 'Mano' },
];

// Módulo educativo: identificar partes del cuerpo y ver su nombre en aymara y quechua.
// Vista Cuerpo (diagrama muscular) + vistas de detalle Cara y Mano.
const BodyPartsModal: React.FC<BodyPartsModalProps> = ({ isOpen, onClose }) => {
  const [region, setRegion] = useState<Region>('cuerpo');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'ay' | 'qu'>('ay');
  const [gender, setGender] = useState<Gender>('male');
  const [view, setView] = useState<BodyView>('front');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPart = bodyPartById(selectedId);

  // Marcadores del diagrama activo.
  const markers =
    region === 'cuerpo'
      ? markersForPlace(view === 'front' ? 'body-front' : 'body-back')
      : markersForPlace(region);

  // Resaltar zonas musculares de la parte estructural seleccionada (solo en Cuerpo).
  const highlighted: ExtendedBodyPart[] =
    currentPart && currentPart.kind === 'muscle'
      ? currentPart.slugs.map((slug) => ({ slug, color: '#2563eb', intensity: 1 }))
      : [];

  const langText = (part: typeof currentPart, lang: 'ay' | 'qu') => {
    if (!part) return '';
    return (lang === 'ay' ? part.ay : part.qu) ?? 'No disponible en la guía';
  };

  const changeRegion = (next: Region) => {
    setRegion(next);
    setSelectedId(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div>
            <h2 className="modal-title">Partes del cuerpo</h2>
            <p className="modal-subtitle">Referencia visual en Aymara y Quechua</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </header>

        {/* Navegación por región */}
        <div className="body-toggles">
          <div className="body-toggle-group">
            {REGIONS.map((r) => (
              <button
                key={r.key}
                className={`body-toggle ${region === r.key ? 'active' : ''}`}
                onClick={() => changeRegion(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Género y vista solo aplican al modelo del cuerpo */}
          {region === 'cuerpo' && (
            <>
              <div className="body-toggle-group">
                <button
                  className={`body-toggle ${gender === 'male' ? 'active' : ''}`}
                  onClick={() => setGender('male')}
                >
                  Varón
                </button>
                <button
                  className={`body-toggle ${gender === 'female' ? 'active' : ''}`}
                  onClick={() => setGender('female')}
                >
                  Mujer
                </button>
              </div>
              <div className="body-toggle-group">
                <button
                  className={`body-toggle ${view === 'front' ? 'active' : ''}`}
                  onClick={() => setView('front')}
                >
                  Frente
                </button>
                <button
                  className={`body-toggle ${view === 'back' ? 'active' : ''}`}
                  onClick={() => setView('back')}
                >
                  Espalda
                </button>
              </div>
            </>
          )}
        </div>

        <div className="modal-body">
          {/* Diagrama + capa de marcadores */}
          <div className="modal-svg-container bodycmp-stage">
            <div className="body-stage">
              <div className="body-figure">
                {region === 'cuerpo' && (
                  <Body
                    data={highlighted}
                    side={view}
                    gender={gender}
                    scale={1}
                    onBodyPartPress={(part) => {
                      const id = partIdBySlug(part.slug);
                      if (id) setSelectedId(id);
                    }}
                  />
                )}
                {region === 'cara' && <FaceImage />}
                {region === 'mano' && <HandImage />}

                {markers.map((m) => (
                  <button
                    key={m.id}
                    className={`body-marker ${selectedId === m.id ? 'selected' : ''}`}
                    style={{ left: `${m.x}%`, top: `${m.y}%` }}
                    title={m.es}
                    aria-label={m.es}
                    onClick={() => setSelectedId(m.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Panel de información */}
          <div className="modal-info-panel">
            <div className="lang-tabs">
              <button
                className={`lang-tab ${activeLang === 'ay' ? 'active' : ''}`}
                onClick={() => setActiveLang('ay')}
              >
                Aymara
              </button>
              <button
                className={`lang-tab ${activeLang === 'qu' ? 'active' : ''}`}
                onClick={() => setActiveLang('qu')}
              >
                Quechua
              </button>
            </div>

            {currentPart ? (
              <div className="part-details">
                <h3 className="part-es">{currentPart.es}</h3>
                <div className={`part-lang-box lang-${activeLang}`}>
                  <span className="part-lang-label">
                    {activeLang === 'ay' ? 'Aymara' : 'Quechua'}
                  </span>
                  <p className="part-lang-text">{langText(currentPart, activeLang)}</p>
                </div>
              </div>
            ) : (
              <div className="part-empty-state">
                Haz clic en una parte del cuerpo (o en un punto marcado) para ver su traducción.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyPartsModal;
