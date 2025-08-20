import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import LogoutBTN from "@/components/ui/Logout";
import { AddNewTransaction } from "@/components/ui/NewTransactionBTN";
import FetchTransactionData from "@/components/Transactions_Table";
import TransactionChart from "@/components/Transaction_Chart";
import { UpdateBudget } from "@/components/ui/UpdateBudgetFRM";
import { GetUserBudget, GetTotalSpent } from "@/hooks/Querry_Data";
import { UpdateBudgetDB } from "@/hooks/Mutate_Data";
import { ChartRadialText } from "@/components/Budgetoverview";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/BudgetDashboard")({
  component: BudgetDashboard,
});
export default function BudgetDashboard() {
  const { user, loading } = useAuth();
  const UpdateBudgetCall = UpdateBudgetDB();
  const { data: TotalSpentValue } = GetTotalSpent();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["user_budgets", user?.id],
  });
  const RenderBugetbar = () => {
    const {
      data: BudgetAmount,
      isPending: BudgetAmountPending,
      error: BudgetamountError,
    } = GetUserBudget();
    if (BudgetAmountPending) {
      return <div>Loading</div>;
    }

    if (BudgetamountError) {
      console.log(BudgetamountError, "Error in total budget Fetching");
    }
    const budgetValue = BudgetAmount?.[0]?.budget_amount ?? 0;

    const spentValue = TotalSpentValue ?? 0;

    return (
      <ChartRadialText
        TotalBudget={budgetValue}
        TotalSpent={spentValue}
      ></ChartRadialText>
    );
  };

  function UpdateBudgetClick(UpdateAmount: number) {
    UpdateBudgetCall.mutate(
      { newBudget: UpdateAmount },
      {
        onSuccess: () => {
          toast.success("Budget Updated Successfully");
        },
      }
    );
  }
  const navigate = useNavigate();
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
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Budget Overview
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto p-4 m-2">
        {!loading && user && <RenderBugetbar />} <TransactionChart />
      </div>
      <div className="flex justify-center gap-1">
        <UpdateBudget HandleupdateBudget={UpdateBudgetClick}></UpdateBudget>
        <AddNewTransaction />
      </div>
      <FetchTransactionData />
    </>
  );
}
