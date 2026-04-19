from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from app.core.config import settings

# Crear motor de SQLAlchemy
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)

# Crear clase SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear clase Base
Base = declarative_base()
