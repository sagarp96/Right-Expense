import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import MonthsDropdown from "@/components/ui/MonthDropdown";
import LogoutBTN from "@/components/ui/Logout";
import { NewTransactionForm } from "@/components/ui/New_TransactionFRM";
export const Route = createFileRoute("/BudgetDashboard")({
  component: BudgetDashboard,
});

export default function BudgetDashboard() {
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
        Budget Overview
      </div>
      <NewTransactionForm />
      {/* <MonthsDropdown /> */}
    </>
  );
}
