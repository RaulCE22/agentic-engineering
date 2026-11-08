# Runtime y herramientas

## Versión de Node.js

- Runtime del proyecto: Node.js 26 LTS.
- Versión inicial fijada: 26.13.0.
- Node 26 entró en Active LTS el 28-10-2026. Su fin de vida programado es el 30-04-2029; el calendario puede cambiar.
- Node.js se fija mediante .nvmrc, .node-version y engines en package.json.

Referencias oficiales:
- https://nodejs.org/en/about/previous-releases
- https://github.com/nodejs/Release
- https://github.com/nodejs/node/blob/main/BUILDING.md

## Compatibilidad con macOS

Los binarios oficiales de Node.js 24 y 26 para macOS requieren macOS 13.5 o posterior. Un Mac con macOS 12 Monterey no puede ejecutar estos binarios oficiales.

Node.js 22 es compatible con versiones anteriores de macOS, incluida macOS 11, pero su fin de vida está programado para el 30-04-2027. No se selecciona como runtime estándar de esta nueva base reutilizable porque está demasiado cerca del fin de soporte.

Solución preferida: actualizar el Mac de desarrollo a macOS 13.5 o posterior, idealmente a una versión de macOS que siga teniendo soporte. Si no es posible, utiliza un entorno de desarrollo remoto Linux soportado en lugar de cambiar silenciosamente la versión estándar de Node del repositorio.

El runtime Node 26 sobre Linux utilizado en CI y despliegue no está afectado por el requisito de los binarios de macOS.

## pnpm

- Versión inicial del gestor de paquetes: pnpm 12.18.0.
- package.json declara packageManager y la versión principal compatible de pnpm.
- Node.js 25 y posteriores no incluyen Corepack. Instala la versión fijada de pnpm directamente:

```bash
npm install --global pnpm@12.18.0
```

También se puede instalar por separado una versión compatible de Corepack. No presupongas que Corepack viene incluido con Node 26.

Referencias oficiales:
- https://pnpm.io/
- https://pnpm.io/blog/releases/12.18.0
- https://github.com/nodejs/node/blob/main/doc/contributing/distribution.md

## Actualización del runtime

Cuando se adopte una nueva versión de Node, actualiza conjuntamente .nvmrc, .node-version y la versión documentada. Mantén package.json engines alineado con la versión principal soportada. Revisa dependencias nativas y CI antes de cambiar de versión principal.
