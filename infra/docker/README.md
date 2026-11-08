# Docker conventions

Application Dockerfiles belong in apps/<app>/Dockerfile. Compose stacks and deployment overlays belong under infra/.

- Use multi-stage builds and deliberate supported base-image versions/digests.
- Install dependencies from the committed lockfile.
- Copy only runtime artifacts into the final image.
- Run as non-root where practical and handle termination signals.
- Add health checks.
- Never bake secrets into build arguments or image layers.
- Do not publish database or management ports publicly.
- Separate local development from production Compose configuration.

Do not create a generic Dockerfile before the app build and runtime contract are known.
