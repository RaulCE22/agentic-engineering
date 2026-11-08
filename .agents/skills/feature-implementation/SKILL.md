---
name: feature-implementation
description: Implementa un plan funcional aprobado dentro de su alcance, sigue los patrones de los módulos existentes, actualiza las pruebas y registra el progreso real.
---

# Implementación de funcionalidades

## Procedimiento
1. Confirma el estado del plan y las aprobaciones necesarias.
2. Lee únicamente los archivos fuente y referencias que necesites para la fase actual.
3. Comprueba el estado del árbol de trabajo; nunca sobrescribas cambios ajenos a la tarea.
4. Implementa una fase cohesionada cada vez.
5. Mantén la lógica de negocio en el módulo responsable y respeta la dirección de dependencias.
6. Valida las entradas externas mediante los esquemas establecidos.
7. Añade o actualiza pruebas junto con los cambios de comportamiento.
8. Ejecuta comprobaciones específicas después de cada fase significativa.
9. Inspecciona el diff para detectar cambios ajenos, secretos, archivos generados y modificaciones accidentales de API.
10. Actualiza progress.md con archivos modificados, decisiones, comandos ejecutados y resultados reales.

## Restricciones
No amplíes el alcance sin actualizar el plan. No añadas dependencias sin justificación y aprobación. No cambies ADR aceptados silenciosamente. No modifiques datos ni infraestructura de producción. Nunca afirmes que las pruebas han pasado si no se han ejecutado correctamente.
