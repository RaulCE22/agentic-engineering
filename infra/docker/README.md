# Convenciones Docker

Los Dockerfiles de aplicación pertenecen a apps/<app>/Dockerfile. Los stacks Compose y sus configuraciones de despliegue pertenecen a infra/.

- Utiliza compilaciones multi-stage y versiones o digest deliberados de imágenes base.
- Instala dependencias utilizando el lockfile versionado.
- Copia únicamente los artefactos necesarios al contenedor final.
- Ejecuta como usuario no privilegiado cuando sea viable y gestiona las señales de terminación.
- Añade health checks.
- Nunca incluyas secretos en argumentos de compilación ni en capas de imagen.
- No publiques puertos de base de datos ni de herramientas de administración.
- Separa la configuración local de la de producción.

No crees un Dockerfile genérico antes de conocer la compilación y el runtime reales de la aplicación.
