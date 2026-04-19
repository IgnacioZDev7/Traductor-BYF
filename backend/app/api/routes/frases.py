from typing import List
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.frase_schema import FraseResponse
from app.services import frase_service

router = APIRouter()

@router.get("/", response_model=List[FraseResponse])
def obtener_frases(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    return frase_service.obtener_frases_service(db=db, limit=limit, offset=offset)

@router.get("/buscar", response_model=List[FraseResponse])
def buscar_frases(q: str = Query(..., description="Texto a buscar"), limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    return frase_service.buscar_frases_por_texto_service(db=db, texto=q, limit=limit, offset=offset)

@router.get("/categoria/{categoria}", response_model=List[FraseResponse])
def obtener_frases_por_categoria(categoria: str, limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    return frase_service.obtener_frases_por_categoria_service(db=db, categoria=categoria, limit=limit, offset=offset)

@router.get("/{frase_id}", response_model=FraseResponse)
def obtener_frase(frase_id: str, db: Session = Depends(get_db)):
    frase = frase_service.obtener_frase_por_id_service(db=db, frase_id=frase_id)
    if not frase:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Frase no encontrada")
    return frase
