import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export const Route = createFileRoute("/NewUserpage")({
  component: LogoutButton,
});

export default function LogoutButton() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out!");
      navigate({ to: "/" });
    } catch (error) {
      toast.error("Error logging out");
    }
  };
  return (
    <div className="sticky flex place-content-end">
      <Button size="sm" onClick={handleLogout} className="rounded-full">
        <CiLogout /> Logout
      </Button>
    </div>
  );
}
