# CONTEXT — Brasaland · Hito 3: Talent Pipeline Tracker

> Ruta en el repositorio: `03-talent-pipeline-tracker/CONTEXT-brasaland.md`

## Contexto de la empresa

Formas parte de **Brasaland Digital**, la unidad de tecnología interna de **Brasaland**, cadena de restaurantes grill con 14 locales en Colombia y Florida. Construyes herramientas para los equipos operativos de la compañía.

## El encargo

**Ashley Turner (People Manager)** escribe a **Nicolás Park (CTO)**:

El proceso de selección de **Asistente de Dirección** se gestiona hoy en una hoja de Google Sheets. Con más de 100 candidaturas, varias personas editando a la vez y pérdida de datos, el sistema ya no aguanta. El **backend está terminado**; hay que construir el **frontend esta semana**.

La herramienta debe permitir:

1. Ver todas las candidaturas de un vistazo (nombre, puesto, estado, etapa).
2. Filtrar por estado y etapa, y buscar por nombre o email **sin recargar la página**.
3. Entrar al detalle de un candidato y cambiar estado o etapa desde ahí.
4. Añadir notas internas tras llamadas o entrevistas, y borrarlas si dejan de ser útiles.
5. Registrar candidatos que llegan por otros canales y corregir datos mal introducidos.

## Proceso de selección (este reto)

| Campo | Valor |
| ----- | ----- |
| **Puesto** | Asistente de Dirección |
| **Empresa** | Brasaland |
| **Ubicación** | Sede corporativa, Medellín |
| **Perfil buscado** | Experiencia en asistencia ejecutiva, gestión de agenda y viajes corporativos, e inglés profesional |

## API y datos

Se usa una API mock centralizada. Los campos, valores y estructura están fijados por la especificación técnica del backend; **no deben modificarse**.

Base URL (desarrollo): `https://playground.4geeks.com/tracker/api/v1`

Documentación: `https://playground.4geeks.com/tracker/api/v1/docs`

## Etiquetas de la UI (obligatorio)

Los valores crudos de la API (`in_progress`, `personal_interview`, etc.) **no deben aparecer nunca en la interfaz**. Usa siempre las etiquetas de estas tablas.

### Estado (`status`)

| Valor API | Etiqueta en la UI |
| --------- | ----------------- |
| `received` | Recibida |
| `in_progress` | En proceso |
| `selected` | Seleccionada |
| `discarded` | Descartada |

### Etapa (`stage`)

| Valor API | Etiqueta en la UI |
| --------- | ----------------- |
| `pending` | Pendiente de revisión |
| `review` | En revisión |
| `personal_interview` | Entrevista personal |
| `technical_interview` | Entrevista técnica |
| `offer_presented` | Oferta presentada |

## Criterios de aceptación específicos

1. Los estados y etapas muestran **etiquetas legibles**, nunca valores de API.
2. Las **notas internas** son visibles únicamente en el detalle del candidato.
3. El **formulario de registro** incluye todos los campos requeridos por la API.

---

_4Geeks Academy · AI Engineering Track_
