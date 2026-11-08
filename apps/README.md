# Applications

Each directory under apps/ is an independently deployable application with its own package.json, build, tests, runtime configuration and Dockerfile.

Initial applications:
- web/: React + Vite browser application.
- api/: Node.js + Hono API (backend stack proposed).

Add future apps only when they have a separate runtime or deployment lifecycle; otherwise keep them as modules of an existing app.
