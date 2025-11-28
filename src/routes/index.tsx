import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 w-full bg-gray-100">
        <nav className="h-full flex items-center w-full px-8">
          <ul className="w-full flex items-center justify-between">
            <li>
              <Link to="/">logo</Link>
            </li>
            <li>
              <Link to="/login">iniciar sessión</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="grow flex flex-col justify-center items-center">
        <h2>welcome to my app</h2>
      </div>
      <footer className="bg-gray-900 text-white p-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} **JobFlow Tracker**. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
