# sp-aie-theazec34-project — Hito 2 (Brasaland)

## Contexto

El documento de negocio y reglas está en **[Brasaland.md](./Brasaland.md)** (sustituye al `CONTEXT.md` genérico). La motivación inicial del alumno está en [Brasaland_Eleccion.md](./Brasaland_Eleccion.md).

## Estructura Hito 2

```text
src/
├── types/models.ts
├── utils/collections.ts
├── utils/search.ts
├── utils/transformations.ts
├── utils/validations.ts
├── utils/reportesBrasaland.ts
├── datosEjemploBrasaland.ts
├── demo.ts
├── demo-browser.ts
└── index.html          # Prueba manual (Tailwind CDN)
```

## Comandos

| Comando | Descripción |
| -------- | ----------- |
| `npm install` | Instala dependencias |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run demo` | Compila y ejecuta la demo por consola |
| `npm run build:web` | Genera `dist-web/app.js` para el navegador |
| `npm run serve` | Sirve el repo: abre `http://localhost:3000/src/index.html` |

## Rama Git

Entregar en **`hito-2-fundamentos-programacion`**. La rama `integrar-nested-files` debe eliminarse en el remoto cuando ya no haga falta:

```bash
git push origin --delete integrar-nested-files
```

## Plantilla 4Geeks

El resto de carpetas del proyecto transversal (`apps/`, `data/`, `agents/`, etc.) puedes mantenerlas desde la plantilla original; este trabajo añade la capa TypeScript del Hito 2 en `src/`.
