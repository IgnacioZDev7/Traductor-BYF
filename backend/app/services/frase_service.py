from sqlalchemy.orm import Session
from app.repositories import frase_repository

#alternativa de acuerdo a como se resuelva el paquete
#from app.repositories.frase_repository import (
#    obtener_frases,
#    obtener_frase_por_id,
#    buscar_frases_por_texto,
#)

def obtener_frases_service(db: Session, limit: int = 50, offset: int = 0):
    """
    Obtiene todas las frases a través del repository.
    Retorna una lista de frases (vacía si no hay resultados).
    """
    return frase_repository.obtener_frases(db=db, limit=limit, offset=offset)

def obtener_frase_por_id_service(db: Session, frase_id: str):
    """
    Obtiene una frase específica por su ID a través del repository.
    Retorna la frase o None si no se encuentra.
    """
    return frase_repository.obtener_frase_por_id(db=db, frase_id=frase_id)

def buscar_frases_por_texto_service(db: Session, texto: str, limit: int = 50, offset: int = 0):
    """
    Busca frases que contengan un texto específico a través del repository.
    Retorna una lista de frases (vacía si no hay resultados).
    """
    return frase_repository.buscar_frases_por_texto(db=db, texto=texto, limit=limit, offset=offset)
