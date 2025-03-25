import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/resumes")({
    component: Resumes
})

const cvs = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "Desarrollador especializado en la implementación de interfaces de usuario usando HTML, CSS y JavaScript. Responsable de crear experiencias interactivas y visualmente atractivas en sitios web y aplicaciones.",
      createAt: new Date().toLocaleString()
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Encargado de la lógica del servidor, bases de datos y la integración con los sistemas de frontend. Utiliza lenguajes como Node.js, Python, Ruby o Java para crear aplicaciones escalables y eficientes.",
      createAt: new Date().toLocaleString()
    },
    {
      id: 3,
      title: "Full Stack Developer",
      description: "Desarrollador que tiene la capacidad de trabajar tanto en el frontend como en el backend. Combina habilidades en diseño y desarrollo de aplicaciones para crear soluciones completas y funcionales.",
      createAt: new Date().toLocaleString()
    },
    {
      id: 4,
      title: "UI/UX Designer",
      description: "Diseñador encargado de mejorar la interacción del usuario con el producto, creando interfaces limpias, intuitivas y atractivas. El foco está en la experiencia del usuario, con un enfoque en la usabilidad y el diseño visual.",
      createAt: new Date().toLocaleString()
    },
    {
      id: 5,
      title: "DevOps Engineer",
      description: "Profesional encargado de integrar y automatizar los procesos entre el desarrollo de software y las operaciones de infraestructura. Se asegura de que las aplicaciones sean rápidas, seguras y escalables, optimizando el flujo de trabajo mediante herramientas de integración continua.",
      createAt: new Date().toLocaleString()
    }
  ];
    
function Resumes() {
    return (
        <section className="h-screen w-full overflow-y-auto">
            <ul className="w-full grid grid-flow-row grid-cols-5 gap-4">
                <li>
                    <Link to="/editor" className="dark:bg-white/10 dark:hover:bg-white/15 transition-colors duration-300 ease-in-out h-full dark:text-white rounded-lg grid place-content-center">Crear mi cv</Link>
                </li>
                {cvs.map(cv => (
                    <li key={`cvId-${cv.id}`}>
                        <article className="dark:bg-white/10 dark:hover:bg-white/15 dark:outline-1 dark:outline-white/15 h-full">
                            <p>{cv.title}</p>
                            <h2>{cv.description}</h2>
                            <span>{cv.createAt}</span>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}