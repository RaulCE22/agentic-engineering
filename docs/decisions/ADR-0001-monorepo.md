# ADR-0001: Estrategia de monorepo y workspaces

- Estado: Aceptado
- Fecha: 2026-11-08
- Responsable de la decisión: Propietario del proyecto

## Contexto
Las aplicaciones comparten estándares de ingeniería, documentación, scripts y posiblemente contratos, pero necesitan ciclos de compilación y despliegue independientes.

## Decisión
Utilizar un único repositorio Git con pnpm workspaces. Las unidades desplegables viven en apps/; el código realmente compartido vive en packages/. Mantener mínima la orquestación del workspace y no introducir inicialmente un ejecutor de tareas.

## Consecuencias
- Un único lockfile y gestión coherente de dependencias.
- Las aplicaciones se compilan y despliegan de forma independiente.
- Los límites de los paquetes compartidos deben ser explícitos.
- CI podrá utilizar filtros del workspace.
- Se podrá incorporar un ejecutor de tareas si el crecimiento lo justifica.

## Restricciones
No se permiten dependencias circulares entre workspaces. Una aplicación no importa código interno de otra aplicación. No se crean paquetes compartidos sin consumidores reales múltiples.
