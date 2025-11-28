import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/singup")({
  component: Home,
});

function Home() {
  return (
    <div>
      <div className="grow flex flex-col justify-center items-center">
        <h2>welcome to signup</h2>
      </div>
    </div>
  );
}
