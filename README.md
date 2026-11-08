# 1. El principio fundamental: no necesitas un LLM mejor, necesitas un mejor sistema alrededor del LLM

Estoy bastante de acuerdo con tu planteamiento. De hecho, hay una distinción que considero fundamental:

La calidad del software generado no depende exclusivamente de la inteligencia del modelo. Depende de la calidad del sistema que convierte una intención en un cambio verificable del software.

Podemos representarlo así:

Especificación del producto

Qué debe hacer el software y qué restricciones tiene

Sistema de ingeniería

Arquitectura · reglas · skills · límites · contratos

Agentes especializados

Planifican · implementan · revisan · documentan

Sistema de validación

Tests · TypeScript · lint · contratos · CI

Software verificable y mantenible

El LLM es una pieza intercambiable de esta arquitectura. El resto debería pertenecer al proyecto y permanecer bajo tu control.

Hay una investigación especialmente relevante para este enfoque: AI Harness Engineering: A Runtime Substrate for Foundation-Model Software Agents, publicada en mayo de 2026. Su tesis es que la capacidad de ingeniería emerge del conjunto modelo + harness + entorno, y no únicamente del modelo. Propone once responsabilidades para el sistema: especificación, selección de contexto, herramientas, memoria, estado, observabilidad, verificación, permisos y otras.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://arxiv.org\&sz=32)

arXiv



Esto coincide mucho con lo que estás planteando.

# 2. Entender cómo funciona realmente el contexto de un LLM

Esta es la parte más importante para diseñar tu sistema.

Un LLM no tiene una memoria de proyecto comparable a la memoria de un programador. En cada llamada recibe una secuencia de tokens:

- Instrucciones del sistema.
- Instrucciones del proyecto.
- Historial de conversación.
- Archivos y fragmentos de código.
- Respuestas de herramientas.
- La petición actual.

A partir de esa secuencia genera una respuesta o una acción.

Aunque los modelos actuales dispongan de ventanas de contexto enormes, eso no significa que debamos llenarlas.

## 2.1. Context window: más contexto no siempre significa más inteligencia

Imagina un agente con una ventana de 200.000 tokens.

Podrías proporcionarle:

- 15.000 tokens de arquitectura.
- 20.000 de reglas.
- 40.000 de requisitos.
- 80.000 de código fuente.
- 20.000 de historial.

Técnicamente puede caber. Pero no necesariamente lo aprovechará bien.

El estudio de Stanford y otras universidades Lost in the Middle demuestra que los modelos pueden perder capacidad de recuperación de información relevante cuando esta se encuentra en medio de contextos extensos. La posición de la información afecta a su utilización.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://aclanthology.org\&sz=32)

aclanthology.org



Esto tiene una consecuencia directa:

No debemos diseñar un repositorio para que el LLM lea todo. Debemos diseñarlo para que encuentre exactamente lo que necesita en cada tarea.

Yo establecería tres niveles:

Nivel 1 · Siempre presente

Contexto esencial

Máximo control sobre lo que se incorpora automáticamente: propósito del proyecto, comandos, mapa arquitectónico, convenciones críticas y forma de validar.

Nivel 2 · Contexto bajo demanda

Documentación especializada

Requisitos concretos, decisiones arquitectónicas, reglas de un módulo, contratos API y skills de cada procedimiento.

Nivel 3 · Contexto recuperado dinámicamente

Información de trabajo

Código relacionado, dependencias, resultados de tests, referencias técnicas, logs y cambios anteriores.

La regla sería sencilla: el agente nunca debería recibir por defecto más información de la necesaria.

## 3. La caché: uno de los conceptos más importantes para ahorrar dinero

Quiero separar dos cosas que suelen confundirse:

- Contexto: la información que el modelo necesita procesar para realizar una tarea.
- Prompt caching: un mecanismo que permite reutilizar parte del cálculo realizado sobre un contexto anterior.

La caché no es memoria de proyecto. Tampoco hace que un modelo recuerde información que no está en su contexto.

### 3.1. Cómo funciona la caché realmente

Cuando un modelo procesa una secuencia de tokens, calcula unas representaciones internas llamadas Key-Value states (KV).

Los proveedores pueden guardar esas representaciones y reutilizarlas cuando reciben una solicitud posterior con el mismo prefijo.

Ejemplo:

Primera llamada

PREFIJO COMÚN

Instrucciones globales + arquitectura + herramientas + reglas

CONTEXTO NUEVO

Implementar autenticación

El proveedor procesa y puede almacenar en caché el prefijo elegible.

Segunda llamada

CACHE HIT

Instrucciones globales + arquitectura + herramientas + reglas

CONTEXTO NUEVO

Implementar gestión de usuarios

Se reutilizan los cálculos del prefijo coincidente. El modelo todavía tiene que procesar la nueva petición y generar una respuesta.

Por tanto, si tu agente necesita consultar las mismas instrucciones durante muchas operaciones, una caché bien aprovechada puede reducir costes y latencia.

Pero hay una condición: el prefijo debe coincidir. Cambiar una instrucción, insertar un timestamp en medio o modificar las definiciones de herramientas puede provocar que se pierda parte de la caché.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI API+1



### 3.2. Diferencias entre proveedores

He contrastado la documentación actual de sus APIs.

| Proveedor     | Funcionamiento                                                            | Beneficio                                                      |
| ------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Anthropic     | Caché explícita con TTL y puntos de ruptura                               | Lecturas habitualmente a 0,1 veces el precio de entrada        |
| OpenAI        | Caché automática y puntos de ruptura configurables en modelos compatibles | Descuento de entrada en caché de hasta el 95%                  |
| Google Gemini | Caché implícita y explícita                                               | Reutilización automática o almacenamiento de contextos grandes |

Algunos detalles interesantes:

Anthropic

La documentación publica dos ventanas de caché:

- 5 minutos: escritura a 1,25 veces el precio normal de entrada.
- 1 hora: escritura a 2 veces el precio normal.
- Lectura: normalmente 0,1 veces el precio de entrada, con tarifas mejores para algunos modelos recientes.

[image](https://www.google.com/s2/favicons?domain=https://platform.claude.com\&sz=32)

Claude Platform Docs+1

OpenAI

La caché está habilitada automáticamente en modelos compatibles. En la documentación actual se explica que se pueden reutilizar prefijos de instrucciones, herramientas, documentos e historial de conversación.

En los modelos recientes hay un mínimo de 1.024 tokens visibles para que un prefijo pueda almacenarse, y los precios dependen del modelo.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI API+1



Google

Gemini tiene caché implícita desde Gemini 2.5.

La documentación actual indica umbrales mínimos de 2.048 tokens para Gemini 2.5 y 4.096 tokens para determinados modelos Gemini 3.x.

Google recomienda colocar el contenido común al principio y realizar solicitudes con prefijos similares en periodos próximos.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://ai.google.dev\&sz=32)

Google AI for Developers+1



### 3.3. Cómo aprovechar esto en tu sistema

Yo establecería una estructura de contexto estable:

```
1. Instrucciones base del proveedor
2. Herramientas y definiciones estables
3. AGENTS.md / instrucciones del proyecto
4. Skills y recursos aplicables
5. Documentación seleccionada
6. Historial de trabajo
7. Petición actual y datos variables
```

No todos los productos montan los mensajes exactamente así. Es una organización lógica para la integración y el consumo de contexto, no una garantía sobre el orden interno de cada CLI.

Las reglas prácticas serían:

1. Las instrucciones comunes no deben cambiar en cada petición.
2. Las definiciones de herramientas deben permanecer estables cuando sea posible.
3. La información variable de la tarea debe introducirse al final.
4. Evitar introducir información dinámica innecesaria en los documentos globales.
5. No reconstruir artificialmente todo el prompt en cada llamada.

Un matiz fundamental: no diseñaría los documentos para conseguir un cache hit a cualquier precio. No tiene sentido añadir 4.000 tokens de instrucciones innecesarias solo para alcanzar el umbral de Gemini. La optimización más importante es minimizar el contexto útil y mantener estable aquello que realmente se reutiliza.

También hay que recordar que la caché no amplía la ventana de contexto y no evita necesariamente los límites de tokens por minuto. En OpenAI, por ejemplo, los tokens leídos desde caché siguen contando para esos límites.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI API



Y cuando utilices Cursor, Claude Code o Gemini CLI mediante suscripciones, no debes asumir que las tarifas y la instrumentación de sus APIs se aplican exactamente igual: el propio producto controla cómo contabiliza el consumo.

## 4. Cómo separar las responsabilidades del sistema

Aquí creo que podemos conseguir un cambio enorme.

Uno de los errores más frecuentes al construir sistemas de programación agéntica es intentar solucionar cualquier problema añadiendo más instrucciones al archivo raíz.

Terminas con:

- 500 líneas de reglas globales.
- 20 skills que se solapan.
- 15 agentes que tienen responsabilidades parecidas.
- Documentos que repiten las mismas convenciones.
- Instrucciones contradictorias.
- Un modelo que empieza cada tarea cargando una cantidad considerable de información irrelevante.

Hay que asignar una responsabilidad única a cada componente.

| Componente  | Responsabilidad                                   | ¿Cuándo carga información? |
| ----------- | ------------------------------------------------- | -------------------------- |
| `AGENTS.md` | Orientar y definir invariantes globales           | Inicio de sesión           |
| Rules       | Restricciones de áreas concretas                  | Según alcance              |
| Skills      | Procedimientos de trabajo                         | Bajo demanda               |
| Agents      | Especialistas con herramientas y contexto propios | Cuando se delega           |
| Hooks       | Acciones automáticas y controles                  | En eventos                 |
| Scripts     | Ejecución determinista                            | Cuando se invocan          |
| Docs        | Conocimiento del proyecto                         | Cuando se necesita         |
| Tests       | Comprobar que el resultado es correcto            | Durante la validación      |

Voy a desarrollar las decisiones que considero más importantes.

### 4.1. AGENTS.md: el índice de entrada, no el manual de programación

Yo intentaría que tuviera entre 50 y 100 líneas en un proyecto normal.

Su misión sería explicar:

- Qué es el proyecto.
- Cuáles son sus principales límites arquitectónicos.
- Cuáles son los comandos de desarrollo y validación.
- Dónde se encuentran los documentos relevantes.
- Cómo debe trabajar el agente.
- Qué cosas no puede hacer sin autorización.

Ejemplo:

```
# Project Engineering Instructions

## Project
Aplicación web de gestión de usuarios.

## Architecture
- Frontend: React + Vite.
- Backend: Node.js API.
- Database: PostgreSQL.
- Modular architecture.
- Dependencies must respect module boundaries.

## Instructions
- Read only documentation relevant to the task.
- Follow existing architectural patterns.
- Never invent requirements.
- Do not introduce dependencies without justification.
- Keep changes scoped to the approved task.
- Do not bypass existing validation.

## Documentation
- Requirements: docs/requirements/
- Architecture: docs/architecture/
- Decisions: docs/decisions/
- API contracts: docs/contracts/

## Verification
Run:
- pnpm typecheck
- pnpm lint
- pnpm test

For architectural changes:
- pnpm test:architecture

## Workflow
Use the appropriate engineering skill:
- Feature planning
- Feature implementation
- Verification
- Code review
```

No pondría todas las reglas de React, Node, SQL, seguridad y pruebas dentro de este documento.

El agente debe saber dónde están. No necesita tenerlas todas en su contexto permanentemente.

### 4.2. Rules: restricciones específicas

Las reglas deben describir restricciones concretas, preferiblemente verificables.

Por ejemplo:

Frontend

```
- Components cannot access database repositories.
- Business logic must remain outside presentation components.
- API communication must use the shared API client.
- Avoid duplicated state derived from server responses.
```

Backend

```
- Controllers cannot contain business logic.
- All external inputs must be validated.
- Database access must go through repositories.
- Services cannot depend on HTTP framework objects.
```

Database

```
- Migrations are append-only.
- Every new relationship must define its deletion strategy.
- Never modify production data from development scripts.
```

No todas estas instrucciones necesitan estar presentes siempre.

En Claude Code puedes utilizar reglas con alcance por rutas; en Cursor también existen reglas con patrones de archivos. Los `AGENTS.md` anidados permiten compartir este concepto entre varios entornos.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://claude.com\&sz=32)

Claude by Anthropic+1



Mi propuesta sería colocar `AGENTS.md` específicos junto a los módulos importantes:

```
src/
├── frontend/
│   └── AGENTS.md
├── backend/
│   └── AGENTS.md
└── database/
    └── AGENTS.md
```

Así, un cambio exclusivamente visual no necesita cargar las restricciones detalladas de persistencia.

### 4.3. Skills: convertir procedimientos en herramientas reutilizables

Esta es una de las partes en las que invertiría más esfuerzo.

Una skill no debería ser un documento que explica cómo programar.

Debe ser un procedimiento que indique al agente cómo ejecutar una tarea específica y cómo comprobar que la ha completado.

Por ejemplo:

```
.agents/skills/
│
├── feature-discovery/
│   └── SKILL.md
│
├── feature-planning/
│   └── SKILL.md
│
├── feature-implementation/
│   └── SKILL.md
│
├── code-review/
│   └── SKILL.md
│
├── architecture-audit/
│   └── SKILL.md
│
└── test-and-verify/
    └── SKILL.md
```

Una skill de implementación podría tener esta estructura:

```
feature-implementation/
│
├── SKILL.md
│
├── references/
│   ├── implementation-checklist.md
│   ├── component-patterns.md
│   └── error-handling.md
│
├── scripts/
│   ├── validate-scope.sh
│   └── verify-changes.sh
│
└── assets/
    └── implementation-template.md
```

El contenido de `SKILL.md` debe ser un índice y un procedimiento:

1. Comprueba el requisito aprobado.
2. Lee el plan de implementación.
3. Consulta las referencias necesarias.
4. Identifica los archivos afectados.
5. Implementa únicamente el alcance autorizado.
6. Ejecuta las comprobaciones correspondientes.
7. Registra los resultados.

El resto se carga solo cuando es necesario.

OpenAI publicó en septiembre de 2026 una recomendación explícita sobre esto: las descripciones de skills deben ser cortas, específicas y no solaparse. También recomienda que el documento principal de una skill sea un pequeño enrutador hacia referencias y scripts especializados.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI Developers+1



Google recomienda exactamente el mismo principio de carga progresiva en su implementación del estándar Agent Skills.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://geminicli.com\&sz=32)

Gemini CLI+1



Decisión importante

Yo utilizaría el estándar abierto Agent Skills y guardaría las skills compartidas en `.agents/skills/`.

Cursor, Codex, OpenCode y Gemini CLI reconocen esta ubicación. Claude Code documenta `.claude/skills/` como ubicación de proyecto y soporta carpetas enlazadas simbólicamente. Por tanto, puedes crear un enlace `.claude/skills` hacia `.agents/skills`, o generar una copia sincronizada mediante un script si necesitas compatibilidad con entornos que no gestionen bien los enlaces.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://cursor.com\&sz=32)

Cursor Docs+3



### 4.4. Agents: separación de poderes de verdad

No construiría 20 agentes diferentes.

Empezaría con cuatro responsabilidades:

| Agente    | Función                                        | Permisos                           |
| --------- | ---------------------------------------------- | ---------------------------------- |
| Architect | Analizar requisitos y decisiones estructurales | Lectura y planificación            |
| Developer | Implementar la funcionalidad                   | Lectura y escritura limitada       |
| QA        | Ejecutar pruebas y detectar regresiones        | Principalmente lectura y ejecución |
| Reviewer  | Revisar el código y comprobar requisitos       | Lectura, sin escritura             |

¿Por qué separar los contextos?

Imagina que el agente principal realiza 40 llamadas a herramientas para investigar el funcionamiento de un módulo. No necesitamos que todos esos resultados se mantengan en el contexto principal.

El agente especialista puede investigar, leer archivos, ejecutar comandos y entregar un resumen estructurado.

Gemini CLI, por ejemplo, documenta subagentes con ventanas de contexto independientes y devolución de resultados resumidos. Anthropic describe el mismo principio para Claude Code.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.googleblog.com\&sz=32)

Google Developers Blog+1



Eso reduce la contaminación del contexto principal.

Pero hay algo que debes tener presente: los subagentes no hacen desaparecer el coste de sus llamadas. Cada uno consume recursos propios. Su ventaja principal es la separación de responsabilidades y de contexto, no necesariamente el ahorro de tokens.

Tampoco ejecutaría todo en paralelo. Dos agentes modificando los mismos ficheros pueden crear conflictos de integración y decisiones incompatibles.

Mi regla sería: delegar tareas independientes, con límites de archivos y contratos de salida definidos.

### 4.5. Hooks y scripts: no le pidas al LLM que haga lo que puede hacer un programa

Esta es probablemente la separación más importante de toda la arquitectura.

Supongamos que quieres asegurar que ningún agente escriba código que incumpla una regla de dependencias.

Tienes dos opciones:

Opción A: regla en Markdown

```
No permitas que los componentes frontend
accedan directamente al repositorio de datos.
```

Opción B: restricción automatizada

```
pnpm test:architecture
```

La primera depende de la interpretación del LLM. La segunda puede fallar siempre que se incumpla una condición definida.

Para tu sistema, priorizaría:

- Hooks para eventos del agente.
- Linters para convenciones.
- Tests estructurales para arquitectura.
- Validadores para contratos.
- TypeScript para tipos.
- Scripts para operaciones repetitivas.

Anthropic y Gemini documentan hooks para interceptar acciones, añadir contexto, validar argumentos y bloquear determinadas operaciones.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://claude.com\&sz=32)

Claude by Anthropic+1



# 5. El verdadero sistema de memoria: el repositorio

Aquí creo que podemos dar un salto cualitativo.

No me gustaría que dependieras de la memoria automática de Claude, Cursor, Gemini o Codex.

Cada uno tiene sus propios mecanismos y el día que cambies de herramienta no deberías perder el conocimiento acumulado del proyecto.

El conocimiento del proyecto debe estar versionado dentro de Git.

OpenAI describió en febrero de 2026 cómo utilizaba el repositorio como sistema de registro del conocimiento: planes, decisiones, contexto de ejecución y deuda técnica versionados y organizados para que los agentes pudiesen retomar el trabajo sin depender de conversaciones anteriores.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://openai.com\&sz=32)

OpenAI+1



Yo separaría cuatro tipos de información.

## 5.1. Conocimiento del producto

Lo que el software debe hacer.

```
docs/
└── requirements/
    ├── README.md
    ├── REQ-001-authentication.md
    ├── REQ-002-user-management.md
    ├── REQ-003-permissions.md
    └── REQ-004-dashboard.md
```

Cada requisito debería tener:

```
# REQ-002: Gestión de usuarios

## Purpose
Permitir administrar usuarios de la aplicación.

## Scope
- Crear usuarios.
- Consultar usuarios.
- Editar usuarios.
- Desactivar usuarios.

## Business Rules
- Un usuario desactivado no puede iniciar sesión.
- El email debe ser único.

## Acceptance Criteria

### REQ-002-AC-01
Given: un administrador autenticado.
When: crea un usuario con datos válidos.
Then: el usuario queda registrado.

### REQ-002-AC-02
Given: un email ya registrado.
When: se intenta crear otro usuario con el mismo email.
Then: la API devuelve un error de conflicto.

## Non-goals
- No incluye recuperación de contraseña.
```

La ventaja de utilizar identificadores estables (`REQ-002`, `AC-01`) es que puedes relacionar el requisito con tests, commits, planes y revisiones.

No necesitas entregar el documento entero al agente. Le entregas el requisito concreto y sus dependencias.

## 5.2. Conocimiento arquitectónico

```
docs/
└── architecture/
    ├── overview.md
    ├── system-context.md
    ├── frontend.md
    ├── backend.md
    ├── data-model.md
    └── modules/
        ├── authentication.md
        └── users.md
```

Aquí describiría las responsabilidades de cada módulo, dependencias permitidas, contratos y límites.

No documentaría cada función. Eso sería duplicar el código fuente.

## 5.3. Decisiones arquitectónicas

```
docs/
└── decisions/
    ├── ADR-001-modular-architecture.md
    ├── ADR-002-authentication.md
    └── ADR-003-api-error-format.md
```

Una decisión arquitectónica debe explicar:

- El problema.
- Las alternativas consideradas.
- La decisión adoptada.
- Las consecuencias.
- Las restricciones que implica.

Esto es especialmente importante para que el agente no vuelva a cuestionar constantemente una decisión ya tomada y aprobada.

## 5.4. Estado de los trabajos

Esta parte evita que una conversación interminable se convierta en la única memoria de una tarea.

```
plans/
├── active/
│   └── REQ-002-user-management/
│       ├── plan.md
│       └── progress.md
│
└── completed/
```

`plan.md` contiene lo que se pretende hacer.

`progress.md` contiene lo que realmente se ha hecho, los descubrimientos importantes, las decisiones nuevas y las comprobaciones ejecutadas.

No debemos confundir una tarea planificada con una tarea terminada.

La guía de desarrollo de Codex publicada en agosto de 2026 utiliza precisamente planes por fases, criterios de aceptación observables y registros de verificación para mantener el trabajo trazable.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI Developers+2



# 6. Arquitectura completa que construiría

Juntando todas las piezas, este es el sistema que te recomendaría desarrollar como estándar para todos tus futuros proyectos.

No es una estructura particular de Claude, Cursor o Codex. Es una estructura de ingeniería agéntica independiente del proveedor.

## Agentic Engineering System

01\. Product knowledge

Requisitos, objetivos, funcionalidades y criterios de aceptación

02\. Architecture knowledge

Módulos, dependencias, contratos, ADR y restricciones

03\. Agent framework

AGENTS, skills, subagentes, hooks y permisos

04\. Execution engine

Planificación, implementación, coordinación y recuperación de estado

05\. Quality engine

Tests, reglas arquitectónicas, análisis estático y validación

06\. Model provider

Gemini, OpenAI, Anthropic, DeepSeek, modelos locales...

La estructura física inicial sería esta:

```
my-application/
│
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
│
├── docs/
│   ├── INDEX.md
│   │
│   ├── product/
│   │   ├── vision.md
│   │   └── roadmap.md
│   │
│   ├── requirements/
│   │   ├── README.md
│   │   └── REQ-XXX.md
│   │
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── system-context.md
│   │   └── modules/
│   │
│   ├── decisions/
│   │   └── ADR-XXX.md
│   │
│   ├── contracts/
│   │   ├── api/
│   │   └── schemas/
│   │
│   └── quality/
│       ├── architecture-rules.md
│       └── testing-strategy.md
│
├── plans/
│   ├── active/
│   └── completed/
│
├── .agents/
│   └── skills/
│       ├── feature-discovery/
│       ├── feature-planning/
│       ├── feature-implementation/
│       ├── test-and-verify/
│       ├── code-review/
│       └── architecture-audit/
│
├── .claude/
│   ├── agents/
│   ├── rules/
│   ├── settings.json
│   └── skills -> ../.agents/skills
│
├── scripts/
│   └── engineering/
│       ├── verify.sh
│       ├── check-architecture.sh
│       └── check-docs.sh
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── architecture/
│
└── src/
```

Los archivos raíz de cada proveedor funcionarían como adaptadores:

`CLAUDE.md`:

```
@AGENTS.md

## Claude Code

Use the repository skills for engineering workflows.
Respect the approved implementation plan.
```

`GEMINI.md`:

```
@./AGENTS.md
```

Gemini permite importar otros Markdown mediante `@archivo.md`, mientras que Claude Code también soporta importar contenido en sus archivos de memoria.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+1



Codex, Cursor y OpenCode pueden trabajar directamente con `AGENTS.md`.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI Developers+2



De esta forma no mantienes cuatro sistemas de instrucciones independientes.

Las configuraciones específicas de subagentes, permisos y hooks sí pueden necesitar adaptadores propios para cada herramienta.

# 7. El ciclo de vida de una funcionalidad

Esta es la parte que convierte los documentos en un sistema de producción de software.

Yo no permitiría que el agente recibiese una petición y comenzase a modificar archivos inmediatamente en todos los casos.

Establecería un ciclo de trabajo.

## Feature Development Lifecycle

1. Discovery

   El agente analiza el requisito, el código existente, los módulos involucrados y las decisiones arquitectónicas.

   Solo lectura
2. Planning

   Crea un plan con alcance, archivos afectados, dependencias, criterios de aceptación y pruebas.

   Planificación
3. Approval

   Se revisa el plan cuando el cambio es relevante o de riesgo elevado.

   Control humano selectivo
4. Implementation

   El agente desarrolla una parte acotada, respetando los contratos y convenciones.

   Edición controlada
5. Verification

   Ejecuta tests, lint, TypeScript, controles arquitectónicos y comprobaciones funcionales.

   Validación automática
6. Independent review

   Un segundo agente inspecciona los cambios sin modificarlos y busca errores, incumplimientos y regresiones.

   Revisión independiente
7. Documentation and handoff

   Actualiza los documentos que corresponda, registra evidencias y deja constancia de lo pendiente.

   Ciclo terminado

No todas las tareas necesitan todos los pasos. Una corrección de una etiqueta no necesita un plan arquitectónico. Una migración de autenticación sí.

La clave es clasificar las tareas por riesgo y complejidad.

## Ejemplo práctico

Imagina que solicitas:

«Añade un sistema de recuperación de contraseña».

El agente no debería empezar creando componentes React.

Primero debería:

1. Leer `REQ-XXX` y comprobar que el requisito existe.
2. Investigar cómo funciona actualmente la autenticación.
3. Consultar el ADR correspondiente.
4. Identificar cambios en frontend, backend y base de datos.
5. Presentar un plan dividido en fases.
6. Determinar qué pruebas deben demostrar el comportamiento.
7. Implementar y validar cada fase.

Y aquí viene algo importante: el agente no debe inventar una política de expiración de tokens, una estrategia de seguridad o un comportamiento funcional que no esté especificado. Debe identificar las decisiones pendientes.

# 8. Cómo garantizar que la arquitectura no se degrade

Para mí, esta es la verdadera inversión.

Los modelos aprenden patrones observando el código existente. Si empiezas a aceptar código mediocre, con el tiempo tendrás más código mediocre.

La documentación por sí sola no va a evitarlo.

OpenAI publicó un caso muy interesante en febrero de 2026 sobre la construcción de software con Codex. La empresa explica cómo impuso límites arquitectónicos, direcciones de dependencia y reglas estructurales mediante linters y tests propios, en lugar de limitarse a pedir al agente que respetase la arquitectura.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://openai.com\&sz=32)

OpenAI+1



Yo introduciría cuatro controles.

## 8.1. Architecture tests

Ejemplo de arquitectura por capas:

1

Types

Tipos y contratos

2

Domain

Entidades y reglas de negocio

3

Services

Casos de uso

4

Repositories

Persistencia

5

Runtime

Integraciones y ejecución

6

Presentation

API y componentes visuales

Esquema ilustrativo: las dependencias permitidas deben definirse explícitamente en el sentido que decidas para cada arquitectura.

Podrías tener una prueba que impida:

- Que un componente acceda directamente a PostgreSQL.
- Que un controlador contenga lógica de negocio.
- Que un módulo importe internamente componentes privados de otro módulo.
- Que existan dependencias circulares.
- Que se dupliquen contratos y validaciones.

## 8.2. Calidad automatizada

Para un proyecto TypeScript utilizaría una cadena similar a esta:

```
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm test:architecture
pnpm build
```

No siempre necesitas ejecutar todo después de cada modificación. Puedes disponer de una comprobación rápida para los archivos afectados y una completa antes de integrar.

## 8.3. Errores útiles para los agentes

Una regla que considero muy importante:

Los scripts deben devolver errores que el LLM pueda entender y corregir fácilmente.

Ejemplo:

```
ARCHITECTURE_ERROR: A-001

File:
src/frontend/users/user.service.ts

Problem:
Frontend cannot import backend repositories.

Expected:
Use the shared API client.

Suggested action:
Replace direct repository access with UserApiClient.
```

Esto es mucho mejor que devolver 2.000 líneas de logs.

## 8.4. Limpieza continua

Introduciría una skill llamada `architecture-audit` que periódicamente:

- Busque dependencias no permitidas.
- Localice código duplicado.
- Detecte módulos demasiado grandes.
- Compruebe si existen documentos obsoletos.
- Identifique reglas que se contradigan.
- Sugiera pequeñas refactorizaciones.

El objetivo es que la arquitectura no sea algo que diseñamos al principio y abandonamos después.

# 9. Qué modelo utilizaría para cada responsabilidad

Aquí aterrizamos la idea económica.

No necesitas un modelo caro para todos los agentes. Pero tampoco intentaría resolver todo mediante un modelo económico si la tarea requiere un razonamiento profundo.

Yo utilizaría tres niveles.

| Nivel | Tipo de modelo       | Responsabilidad                                                          |
| ----- | -------------------- | ------------------------------------------------------------------------ |
| T1    | Económico y rápido   | Documentación, pequeñas implementaciones, componentes repetitivos, tests |
| T2    | Capacidad media-alta | Funcionalidades completas, depuración, integración entre módulos         |
| T3    | Máxima capacidad     | Arquitectura, seguridad, migraciones complejas, decisiones ambiguas      |

Ejemplo:

Selección dinámica del modelo

Cambio sencillo

Un nuevo campo en un formulario.



T1

&#x20;Modelo económico.



Funcionalidad completa

CRUD con API, validaciones y pruebas.



T2

&#x20;Modelo intermedio.



Cambio arquitectónico

Migración de autenticación entre aplicaciones y dominios.



T3

&#x20;Modelo avanzado.



La asignación debe depender de criterios objetivos, no solamente de lo que el agente considere conveniente.

Por ejemplo, escalar a T3 cuando:

- Hay cambios de autenticación o autorización.
- Se modifican contratos públicos.
- Se altera el modelo de datos.
- Se afectan más de tres módulos.
- Existen decisiones arquitectónicas sin resolver.
- El agente ha fallado reiteradamente al intentar validar su implementación.

También permitiría que un T1 implemente una tarea compleja cuando ya existe un plan técnico exhaustivo, interfaces definidas y pruebas que delimitan el comportamiento.

Esta es una de las mejores formas de amortizar el trabajo arquitectónico.

# 10. Cómo sabremos si funciona: evaluación de agentes

No elegiría Gemini, DeepSeek o Codex simplemente porque un benchmark diga que es mejor programando.

Crearía un pequeño benchmark propio.

Cada vez que incorpores un modelo nuevo, debe resolver las mismas tareas utilizando el mismo repositorio y los mismos documentos.

Mediría:

| Indicador                 | Qué mide                                |
| ------------------------- | --------------------------------------- |
| Requirement compliance    | Requisitos implementados correctamente  |
| Architecture compliance   | Cumplimiento de límites arquitectónicos |
| Test success              | Pruebas superadas                       |
| First-pass success        | Tareas terminadas sin correcciones      |
| Human intervention        | Tiempo de intervención humana           |
| Context consumption       | Tokens utilizados                       |
| Cache hit ratio           | Reutilización de contexto               |
| Retry count               | Intentos fallidos                       |
| Cost per accepted feature | Coste de cada funcionalidad aceptada    |

La métrica más interesante para mí sería:

# Coste por funcionalidad aceptada

\\[ C_f = \frac{C\_{\text{IA}} + C\_{\text{infra}}}{N\_{\text{aceptadas}}} \\]

Coste de IA e infraestructura dividido entre funcionalidades que superan los criterios de aceptación.

No te interesa que Gemini cueste un 80% menos por millón de tokens si necesita cinco veces más intentos que otro modelo para terminar una funcionalidad.

Te interesa que te cueste menos conseguir software correcto.

# 11. Mi hoja de ruta para construir este sistema

No empezaría desarrollando un framework de agentes propio. Sería un error invertir demasiado tiempo creando infraestructura antes de demostrar que mejora los resultados.

Lo haría en cuatro etapas.

Fase 1

Crear el estándar de ingeniería

Definir `AGENTS.md`, estructura documental, requisitos con IDs, ADR, reglas arquitectónicas y contratos.

Objetivo: que cualquier agente entienda el proyecto sin depender de conversaciones previas.

Fase 2

Crear las primeras skills

Implementar discovery, planning, implementation, verification y code review.

Objetivo: repetir siempre el mismo procedimiento de ingeniería.

Fase 3

Construir los controles automáticos

Tests arquitectónicos, scripts de validación, hooks, gestión de permisos y trazabilidad.

Objetivo: dejar de depender de instrucciones que el modelo puede ignorar.

Fase 4

Convertirlo en una plantilla universal

Extraer el sistema común y crear perfiles tecnológicos reutilizables.

Objetivo: generar nuevos repositorios preparados para programación agéntica.

### Cómo lo haría reutilizable

Creo que aquí puedes recuperar una idea que encaja muy bien con tu proyecto de herramientas para descargar skills y reglas.

Tendría un repositorio independiente:

```
agentic-engineering-system/
│
├── core/
│   ├── instructions/
│   ├── skills/
│   ├── agents/
│   └── scripts/
│
├── profiles/
│   ├── react-vite/
│   ├── nextjs/
│   ├── node-api/
│   ├── symfony/
│   └── angular/
│
├── providers/
│   ├── claude/
│   ├── codex/
│   ├── gemini/
│   ├── cursor/
│   └── opencode/
│
├── templates/
│   ├── requirements/
│   ├── architecture/
│   ├── adr/
│   └── execution-plans/
│
└── cli/
    └── init-project/
```

Y una interfaz futura como:

```
npx agentic-engineering init
```

Que permita:

```
? Project type:
  > Web application

? Frontend:
  > React + Vite

? Backend:
  > Node.js

? Database:
  > PostgreSQL

? Agent providers:
  > OpenCode
  > Codex
  > Gemini CLI

? Include architecture tests:
  > Yes

? Include documentation templates:
  > Yes
```

El resultado sería un repositorio con una base de ingeniería consistente y las adaptaciones necesarias para cada herramienta.

Para comenzar utilizaría React + Vite + TypeScript + TailwindCSS + pnpm como perfil piloto, que es una combinación que ya utilizas habitualmente.&#x20;

# 12. Mi conclusión: dónde invertiría realmente el dinero

Creo que has identificado correctamente el cambio de paradigma.

En lugar de pagar mucho dinero por un LLM que intente compensar la falta de estructura, invertiría en un sistema que reduzca la cantidad de razonamiento que necesita cada tarea.

Mi distribución de inversión sería:

| Elemento                  | Inversión                 |
| ------------------------- | ------------------------- |
| Sistema documental        | Tiempo de diseño          |
| Arquitectura modular      | Tiempo de diseño          |
| Skills reutilizables      | Tiempo inicial            |
| Scripts y validadores     | Tiempo inicial            |
| Repositorio de plantillas | Tiempo incremental        |
| Modelos económicos        | 0–15 $/mes inicialmente   |
| Modelo avanzado           | Solo cuando sea necesario |

Hay una frase que resume mi propuesta:

No debemos enseñar al LLM a programar mejor cada vez que iniciamos una conversación. Debemos construir un entorno en el que sea difícil programar mal.

Y quiero añadir un último matiz: no intentaría eliminar completamente la intervención humana. La trasladaría.

Antes dedicabas buena parte del tiempo a revisar código línea por línea. En un sistema maduro, tu papel sería aprobar requisitos, diseñar límites, validar decisiones importantes, revisar evidencias y controlar la calidad del producto.

Ese es el paso de programador a arquitecto de sistemas de software agénticos.

Mi recomendación es construir primero el Agentic Engineering System Core, probarlo en un proyecto real y medirlo con Gemini, Codex y un modelo económico de API. Solo después convertiría todo en una herramienta de generación de proyectos.
