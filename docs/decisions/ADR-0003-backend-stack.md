# ADR-0003: Stack tecnológico de backend

- Estado: Propuesto
- Fecha: 2026-11-08
- Responsable de la decisión: Propietario del proyecto

## Contexto
El backend deseado debe estar basado en TypeScript, ser ligero e integrarse con React y PostgreSQL.

## Decisión propuesta
Evaluar Node.js 26 LTS, Hono con @hono/node-server, PostgreSQL, Drizzle ORM/Drizzle Kit, Better Auth, Zod y @hono/zod-validator.

## Justificación
Hono funciona en Node.js mediante su adaptador. Better Auth documenta una integración con Hono y un adaptador Drizzle compatible con PostgreSQL. Drizzle soporta los drivers node-postgres y postgres.js.

## Prueba de concepto requerida
1. Ejecutar un servidor Hono mínimo sobre Node LTS.
2. Conectar Drizzle a PostgreSQL local.
3. Generar y aplicar una migración con Drizzle Kit.
4. Montar Better Auth y generar su esquema.
5. Verificar cookies de sesión, trusted origins, CORS y cierre de sesión.
6. Validar una petición y una respuesta mediante Zod.
7. Comparar pg y postgres.js en pooling, despliegue y compatibilidad con el adaptador de autenticación.

## Decisiones abiertas
Driver PostgreSQL; REST/OpenAPI frente a Hono RPC o una combinación; formato de errores y paginación; ubicación de contratos compartidos; proveedor de correo; estrategia de cookies y sesiones; limitación de peticiones y auditoría.

## Consecuencias
No se generará una API de producción hasta revisar la prueba de concepto y cerrar las decisiones pendientes.
