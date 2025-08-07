import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export const Route = createFileRoute("/NewUserpage")({
  component: WelcomePage,
});

export default function WelcomePage() {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out!");
      navigate({ to: "/loginform" });
    } catch (error) {
      toast.error("Error logging out");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    // Redirect to login if not authenticated
    navigate({ to: "/loginform" });
    return null;
  }

  return (
    <>
      <h1 className="font-heading text-foreground text-4xl">
        Start your Budget
      </h1>
      <div className="flex flex-wrap items-center gap-2 md:flex-row ">
        <Button className="font-body text-xl" onClick={handleLogout}>
          Logout
        </Button>
      </div>{" "}
    </>
  );
}
