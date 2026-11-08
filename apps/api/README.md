# Aplicación API

Directorio reservado para el backend Node.js. Stack candidato: Hono, PostgreSQL, Drizzle ORM/Drizzle Kit, Better Auth y Zod.

La decisión del backend sigue propuesta en ADR-0003. Antes de generar la aplicación, cierra las decisiones de driver, contratos API, formato de errores, proveedor de correo y cookies de autenticación que aparecen en docs/architecture/pending-decisions.md.

Principios:
- Empezar como monolito modular.
- Mantener ligeros los manejadores de rutas.
- Mantener la lógica de dominio y aplicación independiente de Hono.
- Mantener el esquema Drizzle y las migraciones dentro de esta aplicación.
- Validar las entradas externas con Zod.
- Aplicar autorización en el servidor.
- Añadir comprobaciones de salud, cierre ordenado, logs estructurados y configuración de producción.
