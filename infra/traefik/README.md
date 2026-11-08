# Traefik

Traefik is the public reverse proxy and ingress entry point.

For each app document hostname/router rule, upstream service and internal port, TLS resolver, middleware/security headers, health checks, Cloudflare proxy status and logging policy.

Expose only intended HTTP/HTTPS ingress ports. Do not expose Docker API or dashboard publicly. If using the Docker provider, protect access to the Docker socket with a restricted mechanism.

TLS mode and certificate issuance remain open until the first deployment ADR is approved.
