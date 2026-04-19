from sqlalchemy import Column, String, Text, Boolean
from app.core.database import Base

class Frase(Base):
    __tablename__ = "frases"

    id = Column(String, primary_key=True, index=True)
    categoria = Column(String)
    subcategoria = Column(String)
    tipo = Column(String)
    texto_es = Column(Text)
    texto_ay = Column(Text)
    texto_qu = Column(Text)
    seccion = Column(String)
    requiere_revision = Column(Boolean)
    candidato_audio = Column(Boolean)
    estado = Column(String)
