import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/routes/loginform";

import "../index.css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
