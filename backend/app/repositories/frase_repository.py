from sqlalchemy.orm import Session
from app.models.frase import Frase

def obtener_frases(db: Session, limit: int = 50, offset: int = 0):
    return db.query(Frase).offset(offset).limit(limit).all()

def obtener_frase_por_id(db: Session, frase_id: str):
    return db.query(Frase).filter(Frase.id == frase_id).first()

def obtener_frases_por_categoria(db: Session, categoria: str, limit: int = 50, offset: int = 0):
    return db.query(Frase).filter(Frase.categoria == categoria).offset(offset).limit(limit).all()

def buscar_frases_por_texto(db: Session, texto: str, limit: int = 50, offset: int = 0):
    search_pattern = f"%{texto}%"
    return db.query(Frase).filter(Frase.texto_es.ilike(search_pattern)).offset(offset).limit(limit).all()
