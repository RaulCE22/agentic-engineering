# Visión general de la arquitectura

## Estructura del sistema
Monorepo pnpm con aplicaciones desplegables de forma independiente, paquetes compartidos deliberadamente pequeños, documentación de producto y arquitectura, skills independientes del proveedor, scripts de ingeniería y recursos de despliegue.

## Topología inicial

```text
Navegador
   |
 HTTPS
   v
Cloudflare (DNS / controles perimetrales)
   |
Servidor Hetzner
   |
Proxy inverso Traefik
   +---- Contenedor web (apps/web)
   +---- Contenedor API (apps/api)
                  |
              PostgreSQL
```

Dockge gestiona los stacks de Docker Compose en el servidor. PostgreSQL debe permanecer en una red Docker privada y no publicarse directamente en Internet. Esta es una topología lógica, no una configuración de producción lista para desplegar.

## Arquitectura de aplicaciones
- Frontend: SPA React compilada con Vite.
- Backend: API Node.js propuesta con Hono.
- Persistencia: PostgreSQL propuesto con Drizzle ORM y Drizzle Kit.
- Autenticación: Better Auth propuesto.
- Límite compartido: contratos de transporte Zod en packages/contracts cuando estén justificados.
- Estilo del backend: empezar como monolito modular; extraer servicios únicamente cuando se justifique un despliegue independiente.

## Dirección de dependencias
- Las aplicaciones pueden depender de paquetes compartidos; los paquetes compartidos nunca dependen de aplicaciones.
- El frontend nunca importa implementación del backend, esquema de base de datos ni secretos.
- El backend es propietario de la persistencia y de la implementación de autenticación.
- Los contratos compartidos contienen esquemas de transporte y tipos, no entidades de base de datos ni lógica de negocio.
- La infraestructura no debe filtrarse a la lógica del dominio.

## Cambios de arquitectura
Un cambio en un límite arquitectónico aceptado requiere un ADR. Un cambio funcional dentro de los límites existentes suele necesitar un requisito y un plan de implementación.
