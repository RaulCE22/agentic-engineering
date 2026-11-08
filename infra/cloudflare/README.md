# Cloudflare

Cloudflare se utiliza para DNS, gestión de dominios y controles perimetrales y de seguridad.

Para cada zona o aplicación documenta:
- Registros DNS y destino.
- Estado del proxy.
- Modo TLS.
- Restricciones de acceso al origen.
- Políticas WAF y de limitación de peticiones, cuando proceda.
- Permisos necesarios de los tokens API.

Utiliza tokens API limitados, no claves API globales. Mantén sus valores fuera de Git. El proxy de Cloudflare por sí solo no protege el origen; restringe el acceso directo al servidor mediante el firewall cuando sea posible.
