# Aplicaciones

Cada directorio de apps/ representa una aplicación desplegable de forma independiente, con su propio package.json, compilación, pruebas, configuración de ejecución y Dockerfile.

Aplicaciones iniciales:
- web/: aplicación de navegador React + Vite.
- api/: API Node.js + Hono (stack backend propuesto).

Las futuras aplicaciones pueden incluir workers, herramientas administrativas o clientes móviles. Añade una nueva aplicación cuando tenga un runtime o ciclo de despliegue independiente; en caso contrario, mantenla como módulo de una aplicación existente.
