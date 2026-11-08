# Traefik

Traefik es el proxy inverso público y punto de entrada de las aplicaciones.

Para cada aplicación documenta:
- Hostname y regla del router.
- Servicio de destino y puerto interno.
- Resolver TLS y certificados.
- Middleware y cabeceras de seguridad.
- Comprobaciones de salud.
- Estado del proxy de Cloudflare.
- Política de logs de acceso y errores.

Expón únicamente los puertos HTTP/HTTPS necesarios. No publiques la API Docker ni el dashboard. Si utilizas el proveedor Docker, protege el acceso al socket mediante un mecanismo restringido apropiado.

El modo TLS y la emisión de certificados siguen pendientes hasta aprobar el ADR del primer despliegue.
