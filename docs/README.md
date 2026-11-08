# Índice de documentación

Empieza por este índice y abre únicamente los documentos necesarios para la tarea.

| Área | Documento de entrada | Propósito |
|---|---|---|
| Producto | product/vision.md | Visión del producto y principios de ingeniería |
| Arquitectura | architecture/overview.md | Límites y mapa del sistema |
| Entorno | architecture/runtime.md | Versiones de Node.js y compatibilidad |
| Monorepo | architecture/monorepo.md | Espacios de trabajo y límites de paquetes |
| Frontend | architecture/frontend.md | Convenciones adoptadas de frontend |
| Backend | architecture/backend.md | Arquitectura propuesta del backend |
| Infraestructura | architecture/infrastructure.md | Hetzner, Docker, Dockge, Traefik y Cloudflare |
| Decisiones pendientes | architecture/pending-decisions.md | Preguntas que no deben resolverse por suposición |
| Flujo de trabajo | workflows/feature-lifecycle.md | Ciclo de entrega de funcionalidades |
| Contexto | workflows/context-management.md | Carga progresiva de contexto |
| Calidad | quality/quality-gates.md | Criterios de verificación |
| Seguridad | quality/security-baseline.md | Controles de seguridad básicos |
| ADR | decisions/README.md | Registro de decisiones |
| Plantillas | templates/ | Requisitos, ADR, planes y revisiones |

## Jerarquía documental
1. Los requisitos definen el comportamiento deseado del producto.
2. Los ADR aceptados definen decisiones arquitectónicas duraderas.
3. Los documentos de arquitectura explican límites y convenciones estables.
4. Los planes definen el alcance aprobado de un cambio concreto.
5. Los registros de progreso reflejan lo que realmente ha ocurrido.
6. El código fuente y las pruebas automatizadas definen el comportamiento implementado.

Si dos documentos entran en conflicto, no elijas uno silenciosamente. Expón la contradicción y resuelve cuál es la fuente de verdad antes de implementar.
