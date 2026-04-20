from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Inicializar FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# Permisos CORS para conectar validamente el frontend con el backend en entorno local
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
