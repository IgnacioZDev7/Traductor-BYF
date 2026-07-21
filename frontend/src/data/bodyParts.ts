import type { Slug } from 'react-muscle-highlighter';

export type BodyView = 'front' | 'back';

// Dónde se coloca un marcador: sobre el modelo (frente/espalda) o en una vista de detalle.
export type MarkerPlace = 'body-front' | 'body-back' | 'cara' | 'mano';
export type Region = 'cuerpo' | 'cara' | 'mano';

// Traducciones transcritas de la Guía Intercultural (Figuras 28 aymara / 29 quechua).
// `null` = la guía no provee ese idioma para esa parte (NO se inventa; lo confirman los doctores).

interface CommonPart {
  id: string;
  es: string;
  ay: string | null;
  qu: string | null;
}

// Parte estructural: tiene región clickeable propia en el diagrama muscular.
export interface MusclePart extends CommonPart {
  kind: 'muscle';
  slugs: Slug[];
}

// Parte fina: sin región muscular, se representa con un marcador superpuesto.
// x/y son porcentajes sobre el diagrama correspondiente a su `place`.
export interface MarkerPart extends CommonPart {
  kind: 'marker';
  place: MarkerPlace;
  x: number;
  y: number;
}

export type BodyPart = MusclePart | MarkerPart;

export const bodyParts: BodyPart[] = [
  // ---- Estructurales (regiones musculares) ----
  { kind: 'muscle', id: 'cabeza', es: 'Cabeza', ay: 'P’iqi', qu: 'Uma', slugs: ['head'] },
  { kind: 'muscle', id: 'cabello', es: 'Cabello', ay: 'Ñikúta', qu: null, slugs: ['hair'] },
  { kind: 'muscle', id: 'cuello', es: 'Cuello', ay: 'Kunka', qu: 'Kunka', slugs: ['neck'] },
  { kind: 'muscle', id: 'hombro', es: 'Hombro', ay: 'Kallachi', qu: 'Rikra', slugs: ['deltoids', 'trapezius'] },
  { kind: 'muscle', id: 'brazo', es: 'Brazo', ay: 'Lunqhu ampara', qu: 'Mark’a', slugs: ['biceps', 'triceps', 'forearm'] },
  { kind: 'muscle', id: 'mano', es: 'Mano', ay: 'Ampara', qu: 'Maki', slugs: ['hands'] },
  { kind: 'muscle', id: 'pecho', es: 'Pecho', ay: 'Ñuñu', qu: 'Qhasqu', slugs: ['chest'] },
  { kind: 'muscle', id: 'abdomen', es: 'Abdomen', ay: 'Puraka', qu: 'Wiksa', slugs: ['abs', 'obliques'] },
  { kind: 'muscle', id: 'espalda', es: 'Espalda', ay: 'Jikhani', qu: 'Wasa', slugs: ['upper-back', 'lower-back'] },
  { kind: 'muscle', id: 'gluteos', es: 'Glúteos', ay: 'Ch’ina', qu: 'Siki', slugs: ['gluteal'] },
  { kind: 'muscle', id: 'muslo', es: 'Muslo', ay: 'Lankhu chara', qu: null, slugs: ['quadriceps', 'adductors'] },
  { kind: 'muscle', id: 'pierna', es: 'Pierna', ay: 'Lunqhu kayu', qu: 'Chaka', slugs: ['tibialis', 'hamstring'] },
  { kind: 'muscle', id: 'pantorrilla', es: 'Pantorrilla', ay: 'T’usu', qu: 'T’usu', slugs: ['calves'] },
  { kind: 'muscle', id: 'rodilla', es: 'Rodilla', ay: 'Qunquri', qu: 'Muqu', slugs: ['knees'] },
  { kind: 'muscle', id: 'tobillo', es: 'Tobillo', ay: 'Kayu muqu', qu: 'Pichuski', slugs: ['ankles'] },
  { kind: 'muscle', id: 'pie', es: 'Pie', ay: 'Kayu', qu: 'Chaki', slugs: ['feet'] },

  // ---- Marcadores sobre el modelo (pocos, no saturan) ----
  { kind: 'marker', id: 'ombligo', es: 'Ombligo', ay: null, qu: 'Pupu', place: 'body-front', x: 50, y: 43 },
  { kind: 'marker', id: 'codo', es: 'Codo', ay: null, qu: 'Makimuqu', place: 'body-back', x: 26, y: 43 },

  // ---- Vista de detalle: CARA (x/y = % de la imagen cara.png, 784x1168) ----
  { kind: 'marker', id: 'frente', es: 'Frente', ay: null, qu: 'Mat’i', place: 'cara', x: 50, y: 26 },
  { kind: 'marker', id: 'ojo', es: 'Ojo', ay: 'Nayra', qu: 'Ñawi', place: 'cara', x: 33, y: 44 },
  { kind: 'marker', id: 'oreja', es: 'Oreja', ay: 'Jinchu', qu: 'Ninri', place: 'cara', x: 13, y: 47 },
  { kind: 'marker', id: 'nariz', es: 'Nariz', ay: 'Nasa', qu: 'Sinqa', place: 'cara', x: 50, y: 59 },
  { kind: 'marker', id: 'boca', es: 'Boca', ay: 'Laka', qu: 'Simi', place: 'cara', x: 50, y: 70 },
  { kind: 'marker', id: 'garganta', es: 'Garganta', ay: 'Mallq’a', qu: 'Tunquri', place: 'cara', x: 50, y: 88 },

  // ---- Vista de detalle: MANO (x/y = % de la imagen mano.png, 784x1168) ----
  { kind: 'marker', id: 'dedos', es: 'Dedos de la mano', ay: 'Ampar luk’ananaka', qu: 'Ruk’ana', place: 'mano', x: 50, y: 15 },
  { kind: 'marker', id: 'una', es: 'Uña', ay: null, qu: 'Sillu', place: 'mano', x: 76, y: 37 },
  { kind: 'marker', id: 'muneca', es: 'Muñeca', ay: 'Ampar muqu', qu: 'Pichu', place: 'mano', x: 50, y: 85 },
];

export const bodyPartById = (id: string | null): BodyPart | undefined =>
  bodyParts.find((part) => part.id === id);

// Mapa slug muscular -> id de parte, para resolver el click en el diagrama.
export const slugToPartId: Partial<Record<Slug, string>> = bodyParts.reduce((acc, part) => {
  if (part.kind === 'muscle') {
    for (const slug of part.slugs) acc[slug] = part.id;
  }
  return acc;
}, {} as Partial<Record<Slug, string>>);

export const partIdBySlug = (slug: Slug | undefined): string | undefined =>
  slug ? slugToPartId[slug] : undefined;

// Marcadores de un lugar dado (modelo frente/espalda, o vista de cara/mano).
export const markersForPlace = (place: MarkerPlace): MarkerPart[] =>
  bodyParts.filter((p): p is MarkerPart => p.kind === 'marker' && p.place === place);
