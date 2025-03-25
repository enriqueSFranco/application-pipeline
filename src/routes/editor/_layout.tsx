import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/editor/_layout")({
    component: EditorLayoutComponent
})
function EditorLayoutComponent() {
    return(
        <section className="grid grid-cols-2">
            <div className="grid grid-cols-1">
                <header>steps</header>
                <Outlet />
            </div>
            <div>
                <h2>preview del cv</h2>
            </div>
        </section>
    )
}