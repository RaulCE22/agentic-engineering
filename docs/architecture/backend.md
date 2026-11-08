# Arquitectura backend

Estado: propuesta; todavía no está ratificada por completo.

El stack candidato encaja con el monorepo TypeScript, pero siguen pendientes el driver PostgreSQL, la estrategia de contratos API, las convenciones de error y los detalles de despliegue de autenticación. Los agentes no deben tratar estas decisiones como cerradas.

## Tecnologías candidatas
- Node.js 26 LTS.
- Hono con @hono/node-server.
- PostgreSQL.
- Drizzle ORM y Drizzle Kit.
- Better Auth.
- Zod y @hono/zod-validator.

Better Auth documenta una integración directa con Hono mediante las API Web Request/Response y ofrece un adaptador Drizzle compatible con PostgreSQL. No reimplementes la gestión de contraseñas ni sesiones.

## Estilo propuesto: monolito modular

```text
apps/api/src/
  app/                  # composición de Hono y middleware
  config/               # configuración de entorno validada
  modules/
    auth/
    <domain>/
      routes/
      schemas/
      services/
      repositories/
      types/
  db/
    client.ts
    schema/
    migrations/
  shared/
    errors/
    middleware/
```

Esta estructura es un punto de partida, no una obligación de crear capas vacías. La primera funcionalidad de dominio debe ayudar a validar la organización.

## Reglas de dependencias
- Las rutas traducen HTTP y llaman a servicios de aplicación.
- Los servicios o casos de uso implementan los flujos de la aplicación.
- Las reglas de dominio no dependen del contexto Hono ni de objetos HTTP.
- Los repositorios son propietarios del acceso a la base de datos.
- El esquema Drizzle y sus tipos de consulta permanecen en el backend.
- Valida con Zod los datos no confiables en los límites del sistema.
- La autenticación establece la identidad; la autorización se aplica en la operación del servidor correspondiente.
- Devuelve un formato de error coherente; no expongas stack traces ni detalles internos de la base de datos.

## Base de datos y migraciones
- PostgreSQL es la fuente de verdad de los datos.
- El esquema y las migraciones pertenecen a apps/api.
- Genera migraciones SQL con Drizzle Kit y revísalas.
- Aplica migraciones versionadas en los despliegues. No utilices schema push como proceso de migración en producción.
- Separa credenciales y bases de datos por entorno.
- Define copias de seguridad, restauración y retención antes de almacenar datos de producción.

## Decisiones pendientes
1. Driver node-postgres (pg) o postgres.js.
2. Contratos REST + OpenAPI, Hono RPC o una combinación documentada.
3. Formato de errores y convenciones de paginación.
4. Qué esquemas Zod compartidos pertenecen a packages/contracts.
5. Proveedor de correo para verificación y recuperación de contraseña.
6. Dominio de cookies, trusted origins, CORS y comportamiento del proxy en cada despliegue.
7. Limitación de peticiones, eventos de auditoría y política de recuperación de cuentas.

Consulta architecture/pending-decisions.md y ADR-0003.
