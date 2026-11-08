# Controles de calidad

La calidad se demuestra mediante comprobaciones ejecutables y criterios de aceptación trazables, no porque un agente afirme que el código parece correcto.

## Repositorio base
Ejecuta:

```bash
pnpm run verify
```

Este comando valida la documentación, los enlaces Markdown locales, los metadatos de las skills, la estructura del workspace y los requisitos del entorno.

## Controles de las aplicaciones
Configura cuando se creen las aplicaciones, según corresponda:
- format:check
- lint
- typecheck
- test:unit
- test:integration
- test:architecture
- build

No añadas scripts ficticios que siempre devuelvan éxito.

## Frontend
- Comprobaciones estrictas de TypeScript.
- ESLint y formato.
- Pruebas unitarias y de componentes con Vitest.
- Pruebas de accesibilidad y validación para interacciones críticas.
- Compilación de producción de Vite.

## Backend
- Comprobaciones estrictas de TypeScript, lint y formato.
- Pruebas unitarias de lógica de dominio y aplicación.
- Pruebas de integración contra PostgreSQL.
- Pruebas de contratos de petición y respuesta.
- Revisión de migraciones y del proceso de despliegue.
- Compilación de producción y health check.

## Controles transversales
- Comprobaciones de límites arquitectónicos.
- Análisis de dependencias y secretos en CI.
- Sin cambios de dependencias inesperados.
- Flujos críticos vinculados a pruebas automatizadas.

Para cada comando informa del comando, resultado (correcto, fallido, no ejecutado o bloqueado) y resumen del error relevante.
