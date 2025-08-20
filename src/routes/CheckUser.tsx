import { createFileRoute } from "@tanstack/react-router";
import { CheckNewUser } from "@/hooks/Querry_Data";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/CheckUser")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RedirectTopages />;
}
export function RedirectTopages() {
  const { data: CheckNewuser, isLoading } = CheckNewUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading || typeof CheckNewuser === "undefined") return;
    const userCount = CheckNewuser?.length ?? 0;
    console.log(
      "CheckNewuser:",
      CheckNewuser,
      "userCount:",
      userCount,
      "isLoading:",
      isLoading
    );
    if (userCount === 0) {
      console.log("user is new");
      navigate({ to: "/NewUserpage" });
    } else {
      console.log("user is old");
      navigate({ to: "/BudgetDashboard" });
    }
  }, [CheckNewuser, isLoading, navigate]);

  if (isLoading) {
    return <div>Redirecting</div>;
  }
}
