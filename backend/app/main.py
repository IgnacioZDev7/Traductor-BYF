from fastapi import FastAPI, APIRouter
from app.core.config import settings

# Inicializar FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

from app.api.routes import frases

# Configurar enrutadores
app.include_router(frases.router, prefix="/api/v1/frases", tags=["frases"])

# Router base para el home
api_router = APIRouter()

@api_router.get("/")
def read_root():
    return {"status": "ok", "message": "Server running"}

# Incluir router base
app.include_router(api_router)

# Si se ejecuta este archivo directamente
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
