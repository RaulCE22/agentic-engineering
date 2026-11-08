# Infrastructure architecture

Status: Existing hosting baseline; deployment decisions remain application-specific.

## Current platform
- Hetzner server.
- Docker and Docker Compose.
- Dockge for Compose stack management.
- Traefik as reverse proxy and TLS entry point.
- Cloudflare for DNS, domain management and edge/security controls.

## Logical request path
Cloudflare DNS/edge -> Hetzner public ingress -> Traefik -> application container.

PostgreSQL and internal services should be reachable only over private Docker networks. Dockge administration must have a private, authenticated access path.

## Repository responsibilities
- Application Dockerfiles live with their app, normally apps/<app>/Dockerfile.
- Stack/deployment configuration lives under infra/.
- Keep local development Compose separate from production stacks.
- Commit only .env.example files with safe placeholders.
- Use deliberate image tags or commit SHAs in production; avoid latest.
- Add health checks and restart policies deliberately.
- Run containers as non-root where practical.
- Expose only ports required by Traefik. Do not publish PostgreSQL publicly.

## Cloudflare and Traefik
For each deployment document TLS termination, certificate issuance, Cloudflare proxy mode and origin restrictions. Keep scoped Cloudflare API tokens server-side.

## Production readiness
DNS and proxy mode reviewed; TLS issuance tested; firewall restricted; Dockge protected; database private; backup/restore tested; health checks/logs available; secrets external to Git; rollback procedure documented.
