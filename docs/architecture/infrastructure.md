# Arquitectura de infraestructura

Estado: plataforma de alojamiento existente; los detalles de despliegue se definen para cada aplicación.

## Plataforma actual
- Servidor Hetzner.
- Docker y Docker Compose.
- Dockge para gestionar stacks Compose.
- Traefik como proxy inverso y punto de entrada TLS.
- Cloudflare para DNS, gestión de dominios y controles perimetrales.

## Ruta lógica de las peticiones
Cloudflare DNS/perímetro -> entrada pública de Hetzner -> Traefik -> contenedor de aplicación.

PostgreSQL y los servicios internos deben ser accesibles únicamente mediante redes Docker privadas. La administración de Dockge debe tener una vía de acceso privada y autenticada.

## Responsabilidades del repositorio
- Los Dockerfiles de aplicación viven junto a cada aplicación, normalmente en apps/<app>/Dockerfile.
- La configuración de stacks y despliegue vive en infra/.
- Mantén separadas la configuración Compose local y la de producción.
- Versiona únicamente archivos .env.example con valores ficticios seguros.
- Utiliza etiquetas de imagen deliberadas o SHA de commit en producción; evita latest.
- Añade health checks y políticas de reinicio de forma consciente.
- Ejecuta los contenedores como usuario no privilegiado cuando sea viable.
- Expón únicamente los puertos que necesite Traefik. No publiques PostgreSQL.

## Cloudflare y Traefik
Para cada despliegue documenta dónde termina TLS, cómo se emiten los certificados, si está activo el proxy de Cloudflare y cómo se restringe el origen. Si Traefik utiliza el desafío DNS de Cloudflare, guarda el token API limitado en el servidor.

## Preparación para producción
- DNS y modo proxy revisados.
- Emisión y renovación TLS probadas.
- Firewall limitado a los puertos necesarios.
- Dockge protegido.
- Base de datos sin puertos públicos.
- Copia de seguridad y restauración probadas.
- Comprobaciones de salud y logs disponibles.
- Secretos almacenados fuera de Git.
- Procedimiento de rollback documentado.
