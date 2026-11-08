# Aplicación web

Directorio reservado para la aplicación React + Vite + TypeScript. El stack frontend está definido en docs/architecture/frontend.md y ADR-0002. Todavía no se ha generado código fuente.

Al preparar la aplicación:
- Utiliza módulos organizados por funcionalidad.
- Configura React Router Data Mode.
- Utiliza TanStack Query para el estado remoto.
- Utiliza React Hook Form + Zod para formularios.
- Mantén inicialmente los componentes shadcn/ui dentro de esta aplicación.
- Utiliza Zustand únicamente para estado compartido de cliente.
- Configura Vitest y pruebas de componentes.
- Añade compilación de producción y Dockerfile cuando exista la aplicación.
