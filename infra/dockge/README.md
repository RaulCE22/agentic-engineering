# Dockge

Dockge gestiona los stacks Docker Compose en el servidor Hetzner.

- Mantén las definiciones de los stacks versionadas en el repositorio o en un checkout de despliegue controlado.
- Restringe Dockge a acceso privado y autenticado.
- Utiliza un stack por aplicación o por unidad de despliegue claramente delimitada.
- Mantén los valores de entorno en archivos protegidos del servidor o en un gestor de secretos.
- Documenta nombre del stack, redes, volúmenes, etiquetas de imagen, health checks y rollback.
- No conviertas Dockge en la única copia de una definición Compose.
