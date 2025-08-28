# 🎨 Application Pipeline - Frontend (React + TanStack Router)

Este proyecto es el **frontend** de un sistema de gestión de postulaciones laborales, tipo **Job Board estilo Trello**, desarrollado en **React + TypeScript**.
Se conecta con el backend desarrollado en **Spring Boot**.

---

## 🚀 Tecnologías principales
- ⚛️ [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- 🧭 [TanStack Router](https://tanstack.com/router) (routing file-based)  
- ⚡ [Jotai](https://jotai.org/) (state management)  
- 🎨 [Tailwind CSS](https://tailwindcss.com/) (UI rápida y consistente)  
- 🔧 [Vite](https://vitejs.dev/) (build tool ultrarápido)  

---

## 📂 Estructura del proyecto

```bash
src/
│── lib/                # Lógica de negocio y dominio por feature
│   ├─ Job/
│   │   ├─ domain/      # Entidades y tipos del dominio (Job, Status, etc.)
│   │   ├─ application/ # Casos de uso (services, repos)
│   │   └─ infra/       # Repositorios (APIs, localStorage)
│
│── sections/           # Feature UI (atomic design aplicado por feature)
│   └─ job/
│       ├─ ui/          # Componentes UI (JobCard, JobBoard, JobList)
│       ├─ config/      # Configuración (columns, views)
│       ├─ dnd/         # Drag & Drop con dnd-kit
│       └─ state/       # Átomos Jotai para este feature
│
│── shared/             # Componentes UI reutilizables
│   ├─ ui/              # Ej: Button, ModalRoot, Header
│   └─ hooks/           # Hooks compartidos
│
│── routes/             # Rutas con TanStack Router
│── main.tsx            # Entry point

