# 🏥 Traductor-BYF

**Sistema de Comunicación Clínica Intercultural (Castellano ↔ Aymara / Quechua)**

---

## ESTADO ACTUAL A 19-04-26

El sistema funciona correctamente, se puede buscar por texto y por categoría, se puede ver el resultado en una lista y se puede ver el detalle de cada frase. Se puede ejecutar el backend con `uvicorn app.main:app --reload` y el frontend con `npm run dev`. Se ha implementado un sistema de permisos CORS para conectar validamente el frontend con el backend en entorno local.

## 📌 Descripción

**Traductor-BYF** es un sistema web distribuido diseñado para facilitar la comunicación entre personal de salud y pacientes hablantes de **aymara y quechua**, mediante el uso de un catálogo estructurado de frases médicas previamente validadas.

A diferencia de herramientas como Google Translate, este sistema:

- ❌ No genera traducciones automáticamente
- ❌ No utiliza IA generativa para traducir
- ✅ Solo utiliza frases médicas predefinidas
- ✅ Funciona como un **intérprete controlado y confiable**

---

## 🎯 Objetivo

Reducir errores de comunicación en contextos clínicos mediante un sistema confiable que permita:

- Formular preguntas médicas
- Dar instrucciones claras
- Interpretar síntomas
- Comunicar tratamientos

---

## 👥 Usuarios objetivo

- Médicos
- Enfermeras
- Personal administrativo de hospitales

---

## 🧠 Enfoque del sistema

Este proyecto se basa en un principio clave:

> **"La precisión es más importante que la flexibilidad"**

Por eso, el sistema:

- trabaja con datos estructurados
- evita ambigüedades lingüísticas
- prioriza la confiabilidad clínica

---

## 🏗️ Arquitectura del sistema

Sistema distribuido basado en API REST:

```text
Frontend (React)
        ↓
Backend (FastAPI)
        ↓
Servicios (lógica)
        ↓
Repositorio (acceso a datos)
        ↓
PostgreSQL
```

---

## 📁 Estructura del proyecto

```text
Traductor-BYF/
│
├── backend/
│   ├── app/
│   ├── tests/
│   ├── .env
│   ├── requirements.txt
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
│   ├── arquitectura.md
│   └── decisiones_tecnicas.md
│
└── README.md
```

---

## ⚙️ Stack tecnológico

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

### Frontend

- React
- TypeScript
- Vite

---

## 🗄️ Modelo de datos

Tabla principal: `frases`

Campos:

- `id`
- `categoria`
- `subcategoria`
- `tipo`
- `texto_es`
- `texto_ay`
- `texto_qu`
- `seccion`
- `requiere_revision`
- `candidato_audio`
- `estado`

---

## 🚀 Estado del proyecto

### ✔ Fase actual

- Modelado de datos completado
- Base de datos PostgreSQL cargada
- Estructura de arquitectura definida

### 🔄 En desarrollo

- Backend (FastAPI)
- API REST

### ⏳ Pendiente

- Frontend (React)
- Integración de audio
- Mejoras de búsqueda

---

## 📌 Fases del proyecto

1. **Backend base**
2. **Frontend MVP**
3. **Mejoras de búsqueda**
4. **Integración de audio**
5. **Optimización y despliegue**

---

## ⚠️ Restricciones del sistema

- No se permite traducción automática
- No uso de IA generativa para traducción
- No autenticación en el MVP
- No sobreingeniería (microservicios, etc.)

---

## 🧪 Ejemplo de uso

Entrada:

```text
"¿Te duele la cabeza?"
```

Salida:

```json
{
  "texto_es": "¿Te duele la cabeza?",
  "texto_ay": "...",
  "texto_qu": "...",
  "categoria": "sintomas"
}
```

---

## 🧩 Próximos pasos

- Implementación de endpoints en FastAPI
- Desarrollo de interfaz en React
- Integración de búsqueda avanzada
- Evaluación de audio (TTS / grabaciones reales)

---

## 📄 Documentación adicional

- 📘 `docs/PRD.md` → Documento de requisitos técnicos
- 🧠 `backend/AGENTS.md` → Guía de backend
- 🎨 `frontend/AGENTS.md` → Guía de frontend

---

## 🧠 Filosofía del proyecto

Este sistema prioriza:

- ✔ Precisión sobre flexibilidad
- ✔ Control sobre automatización
- ✔ Claridad sobre complejidad

---

## 👨‍💻 Autor

Proyecto desarrollado como parte de formación en Ingeniería de Sistemas.

---

## 📌 Nota final

Este proyecto no busca reemplazar la comunicación humana, sino **reducir la barrera lingüística en contextos críticos donde un error puede tener consecuencias reales**.
