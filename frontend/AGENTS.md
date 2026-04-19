# Frontend — Guía Profesional de Implementación

---

## 1. Stack

- React
- TypeScript
- Vite

---

## 2. Estructura obligatoria

```
frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   └── frases.ts
│   │
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── PhraseCard.tsx
│   │   └── ResultList.tsx
│   │
│   ├── pages/
│   │   └── Home.tsx
│   │
│   ├── hooks/
│   │   └── useFrases.ts
│   │
│   ├── types/
│   │   └── frase.ts
│   │
│   ├── utils/
│   │   └── formatters.ts
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── AGENTS.md
```

---

## 3. Responsabilidades

### API layer

- llamadas HTTP

### Hooks

- lógica de estado

### Components

- UI reutilizable

### Pages

- composición de vistas

---

## 4. Funcionalidades MVP

- búsqueda por texto
- listado de resultados
- filtro por categoría
- visualización de idiomas

---

## 5. Reglas de UI

- simple
- clara
- funcional
- sin sobre diseño

---

## 6. Manejo de estado

- useState
- useEffect
- custom hooks

(NO Redux)

---

## 7. Prohibiciones

- librerías innecesarias
- estado global complejo
- audio en esta fase

---

## 8. Objetivo

Interfaz rápida, clara y centrada en funcionalidad.
