import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { Play } from "lucide-react";
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
      <div>
        <Toaster />
      </div>
      <div className=" h-screen flex  items-center justify-center flex-wrap gap-5 flex-col ">
        <div className="flex  items-center justify-center flex-wrap gap-5 flex-row ">
          <Play />
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Start you Budget
          </h1>
        </div>
        <div>
          <NewBudgetForm />
        </div>
      </div>
    </>
  );
}
