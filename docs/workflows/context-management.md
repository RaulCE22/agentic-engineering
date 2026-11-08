# Gestión del contexto de los agentes

## Objetivo
Proporcionar contexto suficiente para trabajar correctamente sin cargar instrucciones extensas, repetitivas u obsoletas. El contexto se selecciona deliberadamente; no es necesario leer todo el repositorio.

## Niveles de contexto
- Nivel 1: instrucciones del proveedor, AGENTS.md, adaptador breve, reglas permanentes relevantes y definiciones estables de herramientas.
- Nivel 2: requisitos pertinentes, páginas de arquitectura, ADR aceptados, skills y referencias aplicables, y plan actual.
- Nivel 3: archivos fuente, pruebas, manifiestos, configuración, salidas de herramientas, errores, logs y diferencias de código.

## Carga progresiva
1. Empieza por docs/README.md y sigue solo los enlaces relevantes.
2. Lee un requisito y sus dependencias, no todo el directorio.
3. Carga una skill cuando su procedimiento sea necesario.
4. Lee las referencias de una skill únicamente cuando esta lo indique.
5. Delega investigaciones acotadas cuando un resumen breve pueda sustituir un historial extenso de herramientas.
6. Mantén los resúmenes concisos, objetivos y enlazados con los archivos fuente.
7. No pegues archivos fuente completos en planes ni registros de progreso.
8. Antes de cambiar de sesión, resume el trabajo en plan.md y progress.md.

## Buenas prácticas para la caché de prompts
- Mantén estables las instrucciones y definiciones de herramientas entre llamadas similares cuando sea práctico.
- Coloca los datos específicos y cambiantes de la tarea después del contexto estable cuando el proveedor permita controlar el orden.
- Evita fechas, identificadores aleatorios y estados dinámicos en archivos de instrucciones cargados permanentemente.
- No añadas tokens irrelevantes solo para alcanzar un umbral de caché.
- La caché de prompts es una optimización del proveedor, no la memoria del proyecto ni un mecanismo de corrección.
- El consumo de una suscripción CLI puede no seguir las tarifas de caché de la API directa.

## Traspaso entre sesiones
Actualiza progress.md con los cambios, resultados reales de verificación, decisiones o dudas abiertas y un siguiente paso concreto. No dependas del historial del chat como única memoria del proyecto.
