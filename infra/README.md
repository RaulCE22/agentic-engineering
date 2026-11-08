# Infrastructure

Contains deployment documentation and versioned infrastructure configuration. Application Dockerfiles belong with their apps; stack-level configuration belongs here.

- hetzner/: server baseline and operations.
- docker/: Dockerfile and Compose conventions.
- dockge/: stack management.
- traefik/: ingress and TLS configuration.
- cloudflare/: DNS, proxy and security configuration.

Never commit real environment files, tokens, private keys, credentials or production data.
