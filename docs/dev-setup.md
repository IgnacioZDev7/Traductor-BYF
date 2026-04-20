# Configuración local de desarrollo

## Backend

Ejecutar:
uvicorn app.main:app --host 0.0.0.0 --port 8000

## Frontend

Ejecutar:
npm run dev -- --host

## Variable de entorno frontend

### Para uso en la misma laptop

VITE_API_URL=http://localhost:8000/api/v1/frases

### Para pruebas desde celular en la misma red WiFi

VITE_API_URL=http://<IP_LOCAL_PC>:8000/api/v1/frases

Ejemplo:
VITE_API_URL=http://192.168.0.10:8000/api/v1/frases

## Nota

Si cambias de red (casa, oficina, universidad), la IP local de tu equipo puede cambiar. En ese caso debes actualizar `frontend/.env` y reiniciar Vite.
