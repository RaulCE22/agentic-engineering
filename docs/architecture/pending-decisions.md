# Decisiones de arquitectura pendientes

Estas cuestiones están abiertas deliberadamente. Los agentes no deben adivinarlas ni establecer convenciones permanentes por su cuenta.

| ID | Tema | Posición actual | Resolver antes de |
|---|---|---|---|
| BE-01 | Driver PostgreSQL | Comparar node-postgres (pg) y postgres.js con Drizzle + Better Auth | Primera base de API |
| BE-02 | Contratos API | REST + OpenAPI frente a Hono RPC | Primera funcionalidad compartida frontend/API |
| BE-03 | Errores y paginación | Definir un formato de respuesta estándar | Primer endpoint API |
| BE-04 | Contratos compartidos | packages/contracts es una posibilidad | Primer contrato compartido |
| BE-05 | Better Auth | Confirmar dominio de cookies, trusted origins, CORS y sesiones | Implementación de autenticación |
| BE-06 | Proveedor de correo | Todavía no seleccionado | Verificación y recuperación |
| DB-01 | Operaciones de base de datos | Definir backup, restauración, retención y migraciones | Datos de producción |
| INF-01 | Topología TLS | Confirmar Traefik ACME o certificado de origen Cloudflare y modo proxy | Primer despliegue público |
| INF-02 | Gestión de secretos | Elegir almacenamiento y rotación en el servidor | Primer despliegue productivo |
| QA-01 | Herramienta E2E | Vitest está adoptado para unitarias/componentes; E2E pendiente | Primer recorrido crítico |

Para resolver una cuestión:
1. Investiga las opciones soportadas.
2. Construye una prueba de concepto pequeña si existe riesgo de integración.
3. Registra la elección en un ADR.
4. Actualiza este registro y los documentos de arquitectura relacionados.
