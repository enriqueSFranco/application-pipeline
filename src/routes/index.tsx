import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Home
})

function Home() {
    return(
        <div className="flex flex-col min-h-screen w-screen">
            <meta name="keywords" content="AI CV, Generador de CV, React, Typescript"></meta>
            <meta name="description" content="Crea tu currículum vitae profesional con la ayuda de inteligiencia artificial."></meta>
            <meta name="author" content="enriqueSF"></meta>
            <main className="grow flex flex-col justify-center items-center gap-8">
                <h1 className="text-3xl font-bold text-balance text-white">Tu CV, potenciado por inteligencia artificial.</h1>
                <Link to="/resumes" className="dark:bg-white/10 dark:hover:bg-white/15 dark:outline-1 dark:outline-white/15 text-balance transition-colors duration-300 ease-in-out px-8 py-4 rounded-lg">Crear CV</Link>
            </main>
            <footer className="bg-white/5 grid place-content-center py-4">
                <p className="text-md">Creado con 💙 por @enriqueSF</p>
            </footer>
        </div>
    )
}