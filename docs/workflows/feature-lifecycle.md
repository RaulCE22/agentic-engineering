# Ciclo de desarrollo de una funcionalidad

Utiliza el flujo más ligero que controle adecuadamente el riesgo. Un cambio de texto no necesita un proceso con varios agentes; los cambios de autenticación, persistencia y contratos públicos sí requieren más control.

## 1. Análisis previo
- Identifica el requisito, su alcance y sus criterios de aceptación.
- Lee la arquitectura y los ADR relevantes.
- Inspecciona la implementación, pruebas y contratos existentes.
- Identifica módulos afectados, dependencias y riesgos.
- No modifiques código de aplicación durante esta fase.
- Expón como preguntas los comportamientos que falten; no los inventes.

Resultado: resumen conciso con referencias a documentos y archivos consultados.

## 2. Planificación
Es obligatoria para cambios entre módulos, esquemas de datos, contratos públicos, autenticación/seguridad e infraestructura.

El plan debe incluir objetivo, alcance y exclusiones, módulos responsables, áreas que se modificarán, fases ordenadas, relación entre criterios de aceptación y pruebas, riesgos, migraciones, rollback y puntos de aprobación.

Resultado: plans/active/<slug>/plan.md.

## 3. Aprobación
Se requiere aprobación humana para comportamientos de producto no resueltos, cambios de arquitectura aceptada, tareas sensibles de seguridad, operaciones destructivas de base de datos y cambios de infraestructura de producción.

## 4. Implementación
Trabaja únicamente dentro del alcance aprobado. Reutiliza patrones de los módulos, mantén los cambios cohesionados, añade pruebas, evita refactorizaciones ajenas y registra los descubrimientos relevantes en progress.md.

## 5. Verificación
Ejecuta comprobaciones específicas durante la implementación y todas las aplicables antes de entregar. Inspecciona el diff final. Informa de los comandos exactos y sus resultados; indica explícitamente las comprobaciones omitidas.

## 6. Revisión independiente
Revisa el diff frente a requisitos, arquitectura, seguridad y evidencias de pruebas. Informa de hallazgos accionables con severidad y referencias a archivos. El revisor no modifica la implementación.

## 7. Entrega
Resume criterios completados, pruebas, limitaciones y trabajo pendiente. Actualiza la documentación pertinente. Mueve el plan a completed únicamente cuando el trabajo esté aceptado.
