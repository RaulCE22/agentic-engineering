# Visión del producto y de ingeniería

## Propósito
Crear una base reutilizable para aplicaciones web personales. Los proyectos compartirán principios de ingeniería, estructura de repositorio, flujo de desarrollo y controles de calidad.

## Principios de producto
- Resolver el problema del producto sin maximizar la complejidad del framework.
- Construir aplicaciones modulares con límites explícitos.
- Mantener frontend y backend desplegables de forma independiente.
- Utilizar un monorepo para coordinar aplicaciones y contratos compartidos.
- Preferir bibliotecas mantenidas y decisiones operativas sencillas.
- Expresar los requisitos y criterios de aceptación de forma explícita.
- Mantener intercambiables los proveedores de modelos.
- Hacer que las comprobaciones de calidad sean ejecutables y repetibles.

## Principios de ingeniería
- Una única fuente de verdad para cada regla, requisito y decisión.
- Carga progresiva: consultar los detalles solo cuando la tarea los necesite.
- Las skills describen procedimientos; los scripts imponen comprobaciones deterministas.
- Los agentes tienen responsabilidades y permisos delimitados.
- Los planes describen el trabajo previsto; los registros de progreso reflejan el trabajo realizado.
- La validación automatizada es obligatoria; la autoevaluación del LLM no constituye una prueba.

## Fuera de alcance
- No es un framework de aplicaciones ni un sustituto de las bibliotecas elegidas.
- No implementa un runtime de agentes propio.
- No prescribe una arquitectura de microservicios.
- No genera aplicaciones, esquemas ni despliegues antes de que un producto los necesite.
- No depende de un proveedor concreto de LLM ni de una suscripción de pago.
