# 🧵 ThreadTalk

**ThreadTalk** es una aplicación web centrada exclusivamente en un sistema de **comentarios anidados**, al estilo de Reddit. Permite crear conversaciones en forma de hilos, fomentando discusiones ordenadas y jerárquicas.

> 🚧 **Este proyecto está en desarrollo.** Algunas funcionalidades pueden no estar disponibles aún.

---

## 🛠️ Tecnologías y Herramientas

### Frontend:
- ⚛️ React + TypeScript
- 💨 Tailwind CSS
- 🧠 Redux Toolkit
- ✅ Yup + React Hook Form
- 🔁 Axios o Fetch API

### Backend:
- 🧩 Node.js + Express (con TypeScript)
- 🐘 PostgreSQL
- ✅ Yup (validaciones del lado del servidor)
- 🔐 JWT (para autenticación, opcional)
- 🔌 REST API

---

## 📁 Estructura del Proyecto (Sugerida)

### Frontend
/client
  /src
    /components 
      /features
        /comments 
    /hooks 
    /pages 
    /types 
    /utils 
    App.tsx 
    main.tsx 
    tailwind.config.js


### Backend
/server 
  /src 
    /controllers 
    /routes 
    /services 
    /repository
    /middlewares
    /database
    /domain
    /validators 
    index.ts

## ✨ Características (planificadas)
- 💬 Sistema de comentarios anidados
- ➕ Crear, responder y visualizar comentarios
- 🧩 Gestión de estado global con Redux Toolkit
- 🧪 Validación con Yup
- 💻 Interfaz responsiva y moderna con Tailwind CSS
- 🔐 Autenticación de usuarios (opcional)
- 🔒 Seguridad en backend (JWT, CORS, Helmet)

## 🧪 Futuras mejoras
- Autenticación completa con registro e inicio de sesión
- Likes o votos en comentarios
- Sistema de notificaciones
- Tema claro/oscuro
- Carga infinita o paginación para hilos extensos
    
