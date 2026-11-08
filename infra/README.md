# Infraestructura

Este directorio contiene documentación de despliegue y configuración de infraestructura versionada. Los Dockerfiles de aplicación pertenecen a cada aplicación; la configuración de stacks vive aquí.

- hetzner/: base del servidor y operaciones.
- docker/: convenciones y plantillas Dockerfile/Compose.
- dockge/: gestión de stacks.
- traefik/: entrada, proxy inverso y TLS.
- cloudflare/: DNS, proxy y seguridad.

Nunca incluyas archivos de entorno reales, tokens, claves privadas, credenciales ni datos de producción.
