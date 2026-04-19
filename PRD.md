# PRD Técnico — Traductor Médico Intercultural (Traductor-BYF)

---

## 1. Nombre del proyecto

**Traductor-BYF**

---

## 2. Propósito

Sistema web distribuido para facilitar la comunicación clínica entre personal de salud y pacientes hablantes de aymara y quechua mediante un catálogo de frases médicas predefinidas.

---

## 3. Naturaleza del sistema

Este sistema NO es un traductor automático.

Reglas:

- No genera traducciones nuevas
- No usa IA generativa para traducir
- Solo consulta frases existentes en base de datos
- Funciona como un **intérprete controlado**

---

## 4. Arquitectura general

Sistema distribuido:

```
Frontend (React)
        ↓
API REST (FastAPI)
        ↓
Servicios (lógica)
        ↓
Repositorio (acceso a datos)
        ↓
PostgreSQL
```

---

## 5. Estructura global del proyecto

```
Traductor-BYF/
│
├── backend/
│   ├── app/
│   ├── tests/
│   ├── .env
│   ├── requirements.txt
│   ├── alembic/ (opcional futuro)
│   └── AGENTS.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── AGENTS.md
│
├── docs/
│   ├── PRD.md
│   ├── arquitectura.md (opcional)
│   └── decisiones_tecnicas.md
│
└── README.md
```

---

## 6. Modelo de datos

Tabla principal: `frases`

Campos:

- id
- categoria
- subcategoria
- tipo
- texto_es
- texto_ay
- texto_qu
- seccion
- requiere_revision
- candidato_audio
- estado

---

## 7. Fases del proyecto

### Fase 1 — Backend funcional

- API REST operativa
- conexión a PostgreSQL
- endpoints básicos

### Fase 2 — Frontend MVP

- búsqueda
- visualización de frases
- filtros básicos

### Fase 3 — Mejora de búsqueda

- búsqueda parcial
- normalización de texto

### Fase 4 — Audio

- integración progresiva

### Fase 5 — Refinamiento

- optimización
- validaciones
- limpieza

---

## 8. Reglas técnicas globales

- Separación estricta frontend/backend
- Arquitectura por capas en backend
- Tipado estricto en frontend (TypeScript)
- No sobreingeniería
- No microservicios
- No autenticación en MVP

---

## 9. Criterios de éxito

- Búsqueda rápida (<500ms)
- Resultados correctos
- UI clara
- API estable
