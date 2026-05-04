# Brasaland — Contexto de negocio (CONTEXT)

Documento de contexto para el proyecto transversal. **Todos los nombres de entidades, campos, tipos literales y reglas de validación deben coincidir exactamente** con lo definido aquí al implementar TypeScript (`src/types/models.ts`, `src/utils/validations.ts` y demás).

## Sobre la empresa

**Brasaland** es un restaurante de cocina brasileña que combina servicio en sala, reservas y pedidos a domicilio integrados con plataformas de delivery. Los departamentos prioritarios son **logística** (compras a proveedores, facturación y encargos) y **marketing / carta** (menú digital, alérgenos, visibilidad en agregadores).

## Entidades principales (cuatro)

### 1. `EncargoProveedor`

Representa un encargo de compra a un proveedor (materias primas, bebidas, etc.).

| Campo | Tipo | Obligatorio | Descripción |
| ----- | ---- | ----------- | ----------- |
| `id` | `string` | Sí | Identificador único del encargo. |
| `idProveedor` | `string` | Sí | Identificador del proveedor en nuestro sistema. |
| `fechaPrevistaEntrega` | `string` | Sí | Fecha prevista de entrega en formato **ISO 8601** (solo fecha: `YYYY-MM-DD`). |
| `estado` | literal | Sí | Uno de: `borrador`, `enviado`, `recibido`, `facturado`. |
| `importeTotal` | `number` | Sí | Importe total estimado en EUR, **≥ 0**. |
| `numeroLineas` | `number` | Sí | Número de líneas del pedido al proveedor, **entero ≥ 1**. |

**Reglas de validación**

- `id`, `idProveedor`: no vacíos (tras `trim`).
- `fechaPrevistaEntrega`: fecha ISO válida.
- `importeTotal`: número finito y ≥ 0.
- `numeroLineas`: entero ≥ 1.
- `estado`: solo valores permitidos arriba.

**Reportes esperados**

- Conteo de encargos por `estado`.
- Por cada `estado`: **suma** de `importeTotal` y **promedio** de `importeTotal`.

---

### 2. `PlatoCarta`

Plato o bebida publicada en la carta (menú).

| Campo | Tipo | Obligatorio | Descripción |
| ----- | ---- | ----------- | ----------- |
| `id` | `string` | Sí | Identificador del plato. |
| `nombre` | `string` | Sí | Nombre visible en carta. |
| `categoria` | `string` | Sí | Una de: `entrada`, `principal`, `postre`, `bebida`. |
| `precio` | `number` | Sí | Precio en EUR, **> 0** y **≤ 500**. |
| `alergenos` | `string[]` | Sí | Lista de alérgenos (puede ser array vacío). Cada entrada no debe ser string vacío si el array tiene elementos. |
| `activoEnCarta` | `boolean` | Sí | Si el plato se muestra actualmente al cliente. |

**Reglas de validación**

- `nombre`: no vacío (tras `trim`).
- `precio`: número finito, mayor que 0 y no mayor que 500.
- `categoria`: solo valores permitidos.
- `alergenos`: si hay elementos, ninguno puede ser `""` tras `trim`.

**Reportes esperados**

- Conteo de platos **activos** por `categoria`.
- Por `categoria` (solo activos): **suma**, **promedio**, **mínimo** y **máximo** de `precio`.

---

### 3. `ReservaMesa`

Reserva de mesa en el restaurante.

| Campo | Tipo | Obligatorio | Descripción |
| ----- | ---- | ----------- | ----------- |
| `id` | `string` | Sí | Identificador de la reserva. |
| `nombreCliente` | `string` | Sí | Nombre para la reserva. |
| `numeroComensales` | `number` | Sí | Comensales, **entero entre 1 y 40** inclusive. |
| `fechaHora` | `string` | Sí | Inicio de la reserva en **ISO 8601** con zona o `Z` (ej. `2026-05-10T20:00:00Z`). |
| `idMesa` | `string` | Sí | Identificador de mesa asignada. |
| `estado` | `string` | Sí | Uno de: `pendiente`, `confirmada`, `cancelada`, `completada`. |

**Reglas de validación**

- `id`, `nombreCliente`, `idMesa`: no vacíos (tras `trim`).
- `numeroComensales`: entero en [1, 40].
- `fechaHora`: fecha/hora ISO válida.
- `estado`: solo valores permitidos.

**Reportes esperados**

- Conteo de reservas por `estado`.
- **Suma** de `numeroComensales` solo para reservas en estado `confirmada`.

---

### 4. `PedidoDomicilio`

Pedido de comida a domicilio (canal propio o agregador).

| Campo | Tipo | Obligatorio | Descripción |
| ----- | ---- | ----------- | ----------- |
| `id` | `string` | Sí | Identificador del pedido. |
| `direccionEntrega` | `string` | Sí | Dirección completa; longitud **≥ 5** caracteres tras `trim`. |
| `importeTotal` | `number` | Sí | Total cobrado en EUR, **≥ 0**. |
| `plataforma` | `string` | Sí | Una de: `uber`, `just_eat`, `web_propia`. |
| `estado` | `string` | Sí | Uno de: `recibido`, `en_preparacion`, `en_reparto`, `entregado`, `cancelado`. |
| `fechaPedido` | `string` | Sí | Momento del pedido en **ISO 8601**. |

**Reglas de validación**

- `id`: no vacío (tras `trim`).
- `direccionEntrega`: longitud ≥ 5 tras `trim`.
- `importeTotal`: número finito y ≥ 0.
- `fechaPedido`: ISO válido.
- `plataforma` y `estado`: solo valores permitidos.

**Reportes esperados**

- Conteo de pedidos por `plataforma`.
- Por `plataforma`: **suma** de `importeTotal` para pedidos cuyo `estado` **no** sea `cancelado`.

---

## Notas para implementación

- Las funciones de **búsqueda binaria** deben usarse solo sobre arrays **ordenados** por la clave indicada; si no hay orden previo, usar **búsqueda lineal** o ordenar antes con criterio estable.
- Los reportes de agregación deben tratar **arrays vacíos** sin lanzar errores (promedios razonables, máximos/mínimos ausentes como convención del código).
