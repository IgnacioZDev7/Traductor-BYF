# Backend — Guía Profesional de Implementación

---

## 1. Stack

- FastAPI
- SQLAlchemy
- psycopg2-binary
- python-dotenv

---

## 2. Estructura obligatoria

```
backend/
│
├── app/
│   │
│   ├── main.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   │
│   ├── models/
│   │   └── frase.py
│   │
│   ├── schemas/
│   │   └── frase_schema.py
│   │
│   ├── repositories/
│   │   └── frase_repository.py
│   │
│   ├── services/
│   │   └── frase_service.py
│   │
│   ├── api/
│   │   └── routes/
│   │       └── frases.py
│   │
│   └── utils/
│       └── normalizer.py
│
├── tests/
│   └── test_frases.py
│
├── .env
├── requirements.txt
└── AGENTS.md
```

---

## 3. Responsabilidad por capa

### Routes

- reciben requests
- devuelven responses
- NO lógica

### Services

- lógica de negocio
- validaciones
- filtros

### Repositories

- consultas SQL
- acceso a BD

### Models

- mapeo ORM

### Schemas

- validación de datos (Pydantic)

---

## 4. Reglas obligatorias

- NO mezclar capas
- NO consultas SQL en routes
- NO lógica en repositories
- SIEMPRE usar services

---

## 5. Endpoints mínimos

- GET /frases
- GET /frases/{id}
- GET /frases/categoria/{categoria}
- GET /frases/buscar?q=

---

## 6. Lógica de búsqueda

- usar ILIKE en `texto_es`
- excluir estado = 'descartado'
- limitar resultados

---

## 7. Buenas prácticas

- manejo de sesiones
- cierre de conexiones
- respuestas tipadas
- control de errores

---

## 8. Prohibiciones

- autenticación
- microservicios
- GraphQL
- lógica en rutas

---

## 9. Objetivo

Backend limpio, desacoplado y escalable.
