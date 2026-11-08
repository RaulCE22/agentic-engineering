---
name: test-and-verify
description: Selecciona y ejecuta comprobaciones deterministas, relaciona los resultados con los criterios de aceptación e informa de los fallos sin ocultarlos ni debilitarlos.
---

# Pruebas y verificación

## Procedimiento
1. Lee el plan y los criterios de aceptación.
2. Identifica las comprobaciones específicas más pequeñas que cubran los módulos modificados.
3. Inspecciona los scripts disponibles antes de ejecutarlos.
4. Ejecuta pruebas específicas y comprobaciones estáticas.
5. Ejecuta todas las verificaciones aplicables antes de la entrega.
6. Para cada fallo, registra el comando, un resumen del error y el archivo o criterio afectado.
7. Distingue entre defecto de producto, defecto de prueba, problema de entorno y prueba inexistente.
8. Registra las evidencias en progress.md.

## Restricciones
No debilites ni elimines pruebas fallidas para conseguir un resultado correcto. No modifiques datos de producción ni fabriques resultados. La revisión de un LLM complementa las pruebas ejecutables, no las sustituye. Marca explícitamente las comprobaciones bloqueadas u omitidas.
