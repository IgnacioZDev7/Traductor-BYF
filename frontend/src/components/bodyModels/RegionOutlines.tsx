import caraImg from '../../assets/cara.png';
import manoImg from '../../assets/mano.png';

// Vistas de detalle generadas para el proyecto (imágenes propias).
export const FaceImage: React.FC = () => (
  <img src={caraImg} alt="Cara humana" className="ro-image" />
);

export const HandImage: React.FC = () => (
  <img src={manoImg} alt="Mano humana" className="ro-image" />
);
