---
name: feature-discovery
description: Investiga una solicitud funcional, localiza requisitos y arquitectura relacionados e informa del alcance, dependencias, riesgos y dudas sin modificar código fuente.
---

# Análisis previo de funcionalidades

## Procedimiento
1. Localiza el requisito y sus criterios de aceptación. Si no existe, identifica las decisiones de producto que faltan; no las inventes.
2. Lee las páginas de arquitectura y los ADR aceptados que sean relevantes.
3. Inspecciona la implementación, las pruebas, los scripts del paquete y los contratos relacionados.
4. Identifica los módulos afectados y la dirección de sus dependencias.
5. Detecta patrones existentes que convenga reutilizar.
6. Identifica riesgos de seguridad, datos, compatibilidad y aspectos desconocidos.
7. Distingue los hechos observados de las suposiciones, y los bloqueos de las preguntas no bloqueantes.

## Resultado
Incluye referencias al requisito y a los documentos fuente, comportamiento actual, archivos/módulos inspeccionados, alcance, riesgos, preguntas pendientes y siguiente acción recomendada.

## Restricciones
Solo lectura: no modifiques código fuente ni documentación. No inspecciones indiscriminadamente todo el repositorio. Prioriza un cambio localizado frente a una reescritura.
