---
name: feature-planning
description: Convierte un requisito analizado en un plan de implementación acotado, con responsabilidades por módulo, fases, pruebas de aceptación, riesgos y puntos de aprobación.
---

# Planificación de funcionalidades

## Procedimiento
1. Confirma que el requisito está suficientemente definido y que respeta los ADR aceptados.
2. Define el alcance y lo que queda expresamente excluido.
3. Asigna el trabajo a módulos existentes y respeta la dirección de dependencias.
4. Enumera los archivos o áreas que previsiblemente cambiarán, sin fingir certeza si el análisis está incompleto.
5. Divide el trabajo en fases pequeñas y ordenadas.
6. Relaciona cada criterio de aceptación con un método de verificación.
7. Identifica migraciones, implicaciones de seguridad, impacto en despliegue y estrategia de reversión.
8. Señala las decisiones que requieren aprobación humana.
9. Guarda plans/active/<slug>/plan.md y crea o actualiza progress.md.

## Resultado
Un plan que otro agente pueda implementar sin reinterpretar la intención del producto.

## Restricciones
Solo planificación: no implementes código fuente, no inventes reglas de negocio ni añadas abstracciones sin necesidad demostrada. Solicita aprobación para cambios de alto riesgo, contratos públicos, autenticación/seguridad u operaciones destructivas.
