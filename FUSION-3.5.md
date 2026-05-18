# Rama `3.5` — Fusión Hito 1 + 2 + 3

Esta rama integra **todos los entregables** del proyecto Brasaland sin alterar las ramas de evaluación.

## Qué incluye cada hito

| Hito | Rama de referencia | Contenido en `3.5` |
| ---- | ------------------ | ------------------ |
| **1 — Web** | `main` (commits web Brasaland) | `index.html`, `application.html`, `menu.json` |
| **2 — Programación** | `main` / `hito-2-fundamentos-programacion` | `src/`, `Brasaland.md`, `npm run demo` |
| **3 — Talent Tracker** | `hito-3-talent-pipeline-tracker` | `apps/talent-pipeline-tracker/`, `03-talent-pipeline-tracker/CONTEXT-brasaland.md` |

## Historial Git

```
main (Hito 1 + 2)
  └── merge ── hito-3-talent-pipeline-tracker (Hito 3)
        └── portal + scripts (acceso integrado)
```

## Cómo probar la fusión

```bash
git checkout 3.5
npm install
npm run portal          # http://127.0.0.1:8080 → portal.html
npm run dev:tracker     # http://localhost:3001 → Talent Tracker
npm run demo            # Hito 2 en consola
```

## Ramas que no se modifican

- `main` — Hito 1 + 2
- `hito-2-fundamentos-programacion` — referencia Hito 2
- `hito-3-talent-pipeline-tracker` — referencia Hito 3
