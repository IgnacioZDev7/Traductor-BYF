import type { Frase } from '../types/frase';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1/frases';

/**
 * Función auxiliar para realizar peticiones y centralizar el manejo de errores básicos
 */
async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

/**
 * Obtiene la lista completa de frases con opciones de paginación
 */
export async function obtenerFrases(limit: number = 50, offset: number = 0): Promise<Frase[]> {
  const url = new URL(API_BASE_URL);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  return fetchWithErrorHandling<Frase[]>(url.toString());
}

/**
 * Busca frases filtrando por un texto específico (coincidencia parcial)
 */
export async function buscarFrases(texto: string, limit: number = 50, offset: number = 0): Promise<Frase[]> {
  const url = new URL(`${API_BASE_URL}/buscar`);
  url.searchParams.append('q', texto);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  return fetchWithErrorHandling<Frase[]>(url.toString());
}

/**
 * Obtiene las frases que pertenezcan a una categoría específica
 */
export async function obtenerFrasesPorCategoria(categoria: string, limit: number = 50, offset: number = 0): Promise<Frase[]> {
  const url = new URL(`${API_BASE_URL}/categoria/${encodeURIComponent(categoria)}`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  return fetchWithErrorHandling<Frase[]>(url.toString());
}

/**
 * Obtiene una frase específica por su ID
 */
export async function obtenerFrasePorId(id: string): Promise<Frase> {
  const url = `${API_BASE_URL}/${encodeURIComponent(id)}`;
  return fetchWithErrorHandling<Frase>(url);
}
