# 1) Visión y objetivo

Una app para que candidatos lleven el control de todas sus postulaciones: empresa, puesto, estado, fechas, notas y recordatorios. Objetivo: minimizar el “desorden” y asegurar seguimiento (follow-ups) —todo en un solo lugar— con alertas y métricas (p. ej. tasa de respuesta, tiempo medio de proceso).

# 2) Público objetivo

* Personas en búsqueda activa de trabajo (junior / mid).
* Reclutadores que gestionan pocas vacantes (uso personal).
* Estudiantes y freelances.

# 3) MVP — features esenciales (prioridad)

1. Crear/editar/eliminar una postulación (job application).
2. Estados estándar + custom (Applied, Phone screen, Interview, Offer, Rejected, Archived).
3. Notas por postulación (texto + etiquetas).
4. Fechas: aplicado, entrevista, recordatorios.
5. Vista de lista filtrable/ordenable y vista detalle.
6. Recordatorios push locales (follow-up).
7. Sincronización básica y persistencia local (MMKV/SQLite).
8. Exportar/importar CSV (para backup/uso en portfolio).
9. Dashboard simple con métricas (aplicaciones por semana, % respuesta).

# 4) Extensiones útiles (post-MVP)

* Adjuntar archivos (CV versión, emails).
* Integración con Gmail/Outlook para guardar emails (OAuth).
* Integración con LinkedIn (guardar oferta).
* Compartir progreso con mentor.
* Templates de mensajes de follow-up.
* Multiplataforma web (React) y autenticación (Google/Apple).

# 5) Modelo de datos (conceptual) — compacto y práctico

Entidades principales:

* `User`

  * id, name, email, preferences (timezone, notifications)
* `Application`

  * id
  * userId
  * companyName
  * roleTitle
  * location (optional)
  * source (LinkedIn, Indeed, Referral, etc.)
  * url (link to job posting)
  * salaryRange (optional)
  * appliedDate
  * status (enum)
  * lastUpdatedAt
  * archived (bool)
* `Note`

  * id
  * applicationId
  * content
  * createdAt
  * pinned (bool)
  * tags: string[]
* `Event` (entrevistas, deadlines)

  * id
  * applicationId
  * title
  * description
  * dateTime
  * reminderOffset (mins/hours/days)
  * location (remote / in-person)
* `Tag` (global list for suggestions)

  * id, name, color
* `ActivityLog` (audit / timeline)

  * id, applicationId, action, timestamp, meta

Ejemplo GraphQL types (simplificado)

```graphql
type Application {
  id: ID!
  companyName: String!
  roleTitle: String!
  appliedDate: Date
  status: ApplicationStatus!
  url: String
  notes: [Note!]!
  events: [Event!]!
  lastUpdatedAt: Date!
  archived: Boolean!
}

enum ApplicationStatus {
  APPLIED
  PHONE_SCREEN
  TECH_INTERVIEW
  ONSITE
  OFFER
  REJECTED
  ARCHIVED
}

type Note { id: ID!, content: String!, createdAt: Date!, pinned: Boolean }
type Event { id: ID!, title: String!, dateTime: Date!, reminderOffset: Int }
```

# 6) Flujos / UX (alto nivel)

* Onboarding: solicitar permisos de notificaciones, preguntar zona horaria y pregunta opcional: “¿Buscas activamente?”.
* Home (Lista): tarjetas compactas con company + role + status pill + last updated. Filtros rápidos: status, fecha, etiquetas.
* Create Application: formulario rápido (company, role, url, source, appliedDate, status).
* Detail Screen: header con company/role/status; pestañas: Timeline / Notes / Events / Files.
* Quick actions desde lista: cambiar status, añadir nota rápida, archivar.
* Dashboard: KPI cards (applied this month, interviews scheduled, avg time to response).
* Settings: export CSV, manage tags, notifications.

# 7) Estados y reglas de negocio (ejemplos)

* Cambio de `status` actualiza `lastUpdatedAt` y crea `ActivityLog`.
* Cuando `status` pase a `OFFER` o `REJECTED` -> enviar notificación push y opción para marcar respuesta final.
* Recordatorio automático: si `appliedDate` + 7 días y no hay cambio -> sugerir “Enviar follow-up”.
* Si `archived=true` => ocultar de feeds y métricas por defecto.
* Notas: cada nota se puede “pinned” para destacarla en la vista detalle.

# 8) Arquitectura recomendada (mobile)

* Patrón: Hexagonal / Clean Architecture (como pediste previamente)

  * Presentation (React Native screens + atoms)
  * State (Jotai atoms for ephemeral UI + derived atoms for selectors)
  * Domain (entities, use-cases / interactors)
  * Data (repositories — interface) -> Implementations: Local( MMKV / SQLite ) + Remote (GraphQL)
  * Adapters: push notifications, calendar, file storage
* Razonamiento: permite testeo unitario del domain y swap de infra (p. ej. empezar local-only, luego añadir sync server).

# 9) Stack técnico sugerido

* Frontend (Mobile): React Native (expo si quieres iterar rápido, o bare RN si necesitas native modules).
* Estado: Jotai (simple y eficaz) + persist atoms to MMKV via `@react-native-async-storage/async-storage` or `react-native-mmkv`.
* Persistence: MMKV para key-value rápido + WatermelonDB or SQLite (drizzle?) para consultas avanzadas. Si quieres offline robusto, SQLite + sync logic.
* Networking / API: GraphQL (Apollo or Relay) — si quieres typed schemas y facilidad de agregación. Alternativa: REST.
* Auth (opcional): Google/Apple Sign-In.
* Notifications: react-native-push-notification / notifee + platform adapters.
* Analytics: events to Amplitude / Firebase (opcional).
* Tests: Jest + React Native Testing Library; unit tests for use-cases; E2E with Detox or Playwright.

# 10) Sincronización & offline básico

* Modo inicial: app 100% local (persist MMKV/SQLite). Permite al usuario usar sin cuenta.
* Modo con cuenta: sincronización eventual con backend (GraphQL mutations + change log).
* Conflict strategy: last-write-wins (simple) o merge por campo (mejor).
* Que guardar offline: applications, notes, events; colas de mutations para enviar cuando vuelve conexión.

# 11) Notificaciones / Calendar

* Notificaciones locales para recordatorios (schedule local push).
* Integración opcional con Calendar (crear un evento en calendario del usuario para entrevistas).
* Reminders inteligentes: “Follow-up suggestion” si no hay actividad 7 días.

# 12) Seguridad y privacidad

* Datos sensibles: no almacenar archivos con info privada sin cifrado.
* MMKV en mobile es cifrado-friendly; para nivel sensible, cifrar contenido importante.
* Permisos: solicitar notificaciones y acceso a calendario solo si se usan.

# 13) Métricas y dashboard

* Metrics para mostrar (en app):

  * Total aplicaciones
  * Aplicaciones este mes
  * Entrevistas próximas
  * % respuestas
  * Tiempo medio desde aplicado → respuesta
* Visual: KPI cards + timeline gráfico (sparkline).

# 14) Wireframes rápidos (text)

Home (Lista) → Detail → Notes / Timeline → Edit

* Lista: Search bar, filter chips (All, Applied, Interview, Offer), FAB para “Nueva postulación”
* Detail: header company + role, status pill, buttons [Add Note] [Add Event] [Change Status]

# 15) Ejemplo de atom / persistencia con Jotai + MMKV (esqueleto)

(Te doy el snippet conceptual, lo adaptarás)

```ts
import { atom } from 'jotai';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'app_storage' });

const applicationsAtom = atom(
  JSON.parse(storage.getString('applications') || '[]')
);

applicationsAtom.onMount = (set) => {
  const unsub = subscribeToStorage('applications', (val) => set(JSON.parse(val || '[]')));
  return unsub;
};

// write-back: when atom changes, persist to MMKV (via atom write or middleware)
```

(Nota: esto es conceptual; recomiendo un wrapper que haga persistencia + versioning.)

# 16) Roadmap 7 días (rápido)

* Día 1: Esqueleto de app + navegación + pantalla lista + crear aplicación local.
* Día 2: Persistencia local (MMKV/SQLite) + Jotai atoms.
* Día 3: Detalle de aplicación + notas + eventos (sincronía local).
* Día 4: Recordatorios locales + notificaciones + calendario integration (opcional).
* Día 5: Dashboard simple + export CSV.
* Día 6: Tests unitarios para use-cases + polishing UI.
* Día 7: Preparar README y demo para portafolio (gif/video, screenshots).

# 17) UX copy y microinteracciones

* Usa microcopy útil: “¿Quieres crear un recordatorio para seguimiento?”; botones claros: “Marcar como contactado”.
* Animaciones suaves en cambios de status; confirmaciones no intrusivas (snackbar).

# 18) Entregables para tu portafolio

* App funcionando (APK/IPA or Expo link).
* README con arquitectura (hexagonal diagram), decisiones técnicas y cómo correr.
* GIFs de la app en acción (lista → detalle → recordatorio).
* Un endpoint GraphQL demo (si agregas backend) y screenshots de queries.

---
🔍 FLUJO EN LA APP
“El usuario crea una nueva postulación con empresa, puesto, notas y primer recordatorio.”

UI (NewApplicationScreen)
      ↓
Use case: CreateJobApplication
      ↓
Port: IApplicationRepository
      ↓
Adapter: ApplicationGraphqlAdapter
      ↓
GraphQL mutation → servidor
      ↓
Respuesta convertida a modelo de dominio (JobApplication)
      ↓
Use case crea recordatorio por dominio (ReminderPolicy)
      ↓
Recordatorio persiste vía IReminderRepository
      ↓
UI recibe un ViewModel listo

