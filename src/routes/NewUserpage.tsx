import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
// import toast from "react-hot-toast";
import { NewBudgetForm } from "@/components/NewbudgetForm";
import LogoutBTN from "@/components/ui/Logout";
export const Route = createFileRoute("/NewUserpage")({
  component: WelcomePage,
});

export default function WelcomePage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    // Redirect to login if not authenticated
    navigate({ to: "/" });
    return null;
  }

  return (
    <>
      <LogoutBTN />
      <div className="h-screen flex  items-center justify-center flex-col flex-wrap gap-10">
        Start Your Budget
        <Button size="lg" className="rounded-full">
          Start Now
        </Button>
      </div>
      <div className="outline-2 outline-offset-0 ... flex items-center justify-center gap-5 flex-col flex-wrap">
        <div className="flex  items-center justify-center flex-col flex-wrap gap-10">
          Plan Your Budget
        </div>
        <NewBudgetForm />
      </div>
    </>
  );
}
