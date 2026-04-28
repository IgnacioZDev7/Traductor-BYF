from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
    
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        # ⬇️ ATENCIÓN: Si cambias de red WiFi mañana, actualiza estas IPs con tu nueva dirección IPv4
        #"http://192.168.0.10:5173",
        #"http://192.168.0.9:5173",
        #"http://192.168.56.1:5173",
        #"http://10.0.1.223:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.routes import frases

app.include_router(frases.router, prefix="/api/v1/frases", tags=["frases"])

api_router = APIRouter()

@api_router.get("/")
def read_root():
    return {"status": "ok", "message": "Server running"}

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
