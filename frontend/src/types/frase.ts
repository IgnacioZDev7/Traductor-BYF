export interface Frase {
  id: string;
  categoria: string | null;
  subcategoria: string | null;
  tipo: string | null;
  texto_es: string | null;
  texto_ay: string | null;
  texto_qu: string | null;
  seccion: string | null;
  requiere_revision: boolean | null;
  candidato_audio: boolean | null;
  estado: string | null;
}
