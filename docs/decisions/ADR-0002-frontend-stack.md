# ADR-0002: Stack tecnológico de frontend

- Estado: Aceptado
- Fecha: 2026-11-08
- Responsable de la decisión: Propietario del proyecto

## Contexto
Utilizar un stack frontend TypeScript familiar y homogéneo en las aplicaciones personales.

## Decisión
Adoptar React, Vite y TypeScript con React Router Data Mode, TanStack Query, React Hook Form, Zod, shadcn/ui, Tailwind CSS, Zustand (solo para estado de cliente) y Vitest.

## Consecuencias
- Se pueden reutilizar skills y patrones frontend.
- Los componentes shadcn/ui se mantienen como código local del proyecto.
- Deben quedar claros los límites entre el cliente API y los contratos compartidos.
- Las versiones exactas se seleccionarán al crear la primera aplicación y quedarán registradas en el lockfile.

## Restricciones
No dupliques en Zustand el estado de TanStack Query. Prioriza el estado URL para filtros y navegación compartibles. Mantén el código específico de cada funcionalidad en su módulo.
