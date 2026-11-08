# ADR-0004: Plataforma de alojamiento e infraestructura

- Estado: Aceptado (plataforma de alto nivel)
- Fecha: 2026-11-08
- Responsable de la decisión: Propietario del proyecto

## Contexto
Las aplicaciones personales se ejecutarán en un servidor Hetzner existente, con despliegue basado en Docker y gestión de dominios y seguridad mediante Cloudflare.

## Decisión
Utilizar Hetzner, Docker y Docker Compose, Dockge para gestionar stacks, Traefik como proxy inverso y punto de entrada, y Cloudflare para DNS y controles perimetrales.

## Consecuencias
- Cada aplicación desplegable tendrá una compilación Docker reproducible.
- La configuración de stacks estará versionada en infra/.
- Los secretos de ejecución permanecerán en el servidor y nunca se incluirán en Git.
- Los puntos de entrada públicos y los servicios internos de datos tendrán límites de red separados.

## Decisiones no cubiertas
La estrategia TLS, el modo proxy de Cloudflare, el firewall, las redes privadas, las copias de seguridad, la monitorización y el almacenamiento de secretos deberán documentarse antes del primer despliegue productivo.
