from typing import Optional
from pydantic import BaseModel, ConfigDict

class FraseBase(BaseModel):
    id: str
    categoria: Optional[str] = None
    subcategoria: Optional[str] = None
    tipo: Optional[str] = None
    texto_es: Optional[str] = None
    texto_ay: Optional[str] = None
    texto_qu: Optional[str] = None
    seccion: Optional[str] = None
    candidato_audio: Optional[bool] = None

class FraseResponse(FraseBase):
    model_config = ConfigDict(from_attributes=True)
