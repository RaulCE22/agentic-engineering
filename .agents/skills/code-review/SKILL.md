---
name: code-review
description: Revisa de forma independiente un cambio frente a requisitos, arquitectura, seguridad, mantenibilidad y evidencias de verificación, sin modificar archivos.
---

# Revisión de código

## Entradas
Requisito, plan aprobado, diff o commit e informe de verificación.

## Orden de revisión
1. Comprende el comportamiento esperado y el alcance.
2. Inspecciona el diff completo.
3. Comprueba cada criterio de aceptación frente a la implementación y las pruebas.
4. Revisa los límites entre módulos y la dirección de dependencias.
5. Busca problemas de seguridad, validación, autorización y exposición de secretos.
6. Comprueba el tratamiento de errores, integridad de datos, migraciones y compatibilidad.
7. Evalúa la calidad de las pruebas y lo que realmente verifican sus aserciones.
8. Identifica complejidad innecesaria, duplicación y cambios ajenos al alcance.

## Hallazgos
Informa de problemas accionables con severidad, archivo/ubicación, impacto y recomendación. Separa los bloqueos de las sugerencias.

## Restricciones
Solo lectura: no edites archivos ni apliques correcciones automáticamente. No marques preferencias personales de estilo como defectos. Indica las limitaciones cuando no dispongas del diff o de las evidencias de pruebas.
