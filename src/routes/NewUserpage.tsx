import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { CiLogout } from "react-icons/ci";
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
      navigate({ to: "/" });
    } catch (error) {
      toast.error("Error logging out");
    }
  };
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
      <div className="sticky flex place-content-end">
        <Button size="sm" onClick={handleLogout} className="rounded-full">
          <CiLogout /> Logout
        </Button>
      </div>

      <div className="h-screen flex  items-center justify-center flex-col flex-wrap gap-10">
        Start Your Budget
        <Button size="lg" className="rounded-full">
          Start Now
        </Button>
      </div>

      {/* <div className="h-screen flex items-center justify-center">
        Centered Content
      </div> */}
    </>
  );
}
