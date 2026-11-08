# Arquitectura frontend

Estado: stack adoptado.

## Tecnologías
- React + Vite + TypeScript.
- React Router en Data Mode.
- TanStack Query (@tanstack/react-query) para estado remoto o del servidor.
- React Hook Form para el estado de interacción de formularios.
- Zod para validación en runtime, conectado mediante @hookform/resolvers.
- Componentes shadcn/ui con Tailwind CSS.
- Zustand para pequeñas partes del estado de cliente, solo cuando React state o URL state no sean suficientes.
- Vitest para pruebas unitarias y de componentes.

## Responsabilidades
- Las rutas componen páginas y módulos funcionales.
- Cada módulo funcional es propietario de su interfaz, hooks y comportamiento.
- Los componentes UI compartidos se incorporan solo cuando exista reutilización real.
- El acceso a la API se centraliza en un cliente tipado.
- Zod valida los datos externos en runtime.
- TanStack Query gestiona estado del servidor, caché, invalidación y mutaciones.
- Zustand gestiona únicamente estado de cliente o de interfaz compartido entre rutas.
- React Hook Form gestiona la interacción del formulario; Zod define sus reglas de validación.

## Reglas
- Nunca dupliques en Zustand los datos gestionados por TanStack Query.
- Prioriza parámetros URL para filtros, paginación y estado de navegación que deba poder compartirse.
- Mantén las reglas de negocio fuera de los componentes de presentación.
- Evita stores globales y providers grandes sin una necesidad clara.
- Mantén accesibles y semánticamente correctos los componentes shadcn/ui.
- Separa DTO de API y modelos de vista cuando sus ciclos de vida sean diferentes.
- No mantengas dos cachés de datos remotos que compitan entre sí.

## Estructura funcional propuesta

```text
apps/web/src/
  app/                  # router, providers, arranque
  features/<feature>/
    api/
    components/
    hooks/
    schemas/
    routes/
    types/
  components/ui/        # componentes shadcn/ui locales
  lib/                  # cliente API y utilidades de aplicación
  styles/
```

## Pruebas
Utiliza Vitest. Añade Testing Library, user-event y jsdom cuando se preparen las primeras pruebas de componentes. Prueba el comportamiento visible para el usuario, la validación y las transiciones de estado. Elige una herramienta E2E cuando se implemente el primer recorrido crítico completo.

Las versiones exactas de los paquetes se seleccionarán al crear la primera aplicación y quedarán registradas en el lockfile.
