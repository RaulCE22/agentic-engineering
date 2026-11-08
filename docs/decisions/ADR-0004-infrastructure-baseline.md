# ADR-0004: Hosting and infrastructure baseline

- Status: Accepted (high-level platform)
- Date: 2026-11-08
- Decision owner: Project owner

## Context
Personal applications will run on an existing Hetzner server with Docker and Cloudflare domain/security management.

## Decision
Use Hetzner, Docker/Compose, Dockge for stack management, Traefik as reverse proxy/ingress and Cloudflare for DNS/edge controls.

## Consequences
Each deployable app has a reproducible Docker build. Stack configuration is versioned under infra/. Runtime secrets remain on the server and never enter Git. Public ingress and internal data services have separate network boundaries.

## Not decided
TLS strategy, Cloudflare proxy mode, firewall, private networks, backups, monitoring and secret storage must be documented before production.
