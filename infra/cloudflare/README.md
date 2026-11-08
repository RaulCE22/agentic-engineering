# Cloudflare

Cloudflare is used for DNS, domain management and edge/security controls.

For each zone/app document DNS records, proxy status, TLS mode, origin restrictions, WAF/rate-limiting policy and token permissions.

Use scoped API tokens, not global API keys. Keep token values outside Git. Cloudflare proxying alone does not secure the origin; restrict direct origin access at the firewall where practical.
