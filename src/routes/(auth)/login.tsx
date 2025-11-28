import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
  component: Home,
});

function Home() {
  return (
    <div>
      <div className="grow flex flex-col justify-center items-center">
        <h2>welcome to login</h2>
      </div>
      <div>
        <p>navegar a <Link to="/singup">crear cuenta</Link></p>
      </div>
    </div>
  );
}
