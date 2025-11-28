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

