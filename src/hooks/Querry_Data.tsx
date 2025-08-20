import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/superbase";
import { useAuth } from "@/hooks/useAuth";

export function useTransactions() {
  const { user, loading: authLoading } = useAuth();

  async function getTransactions() {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("transactions")
      .select("id, Amount, Name, Description, Date, Category")
      .eq("user_id", user.id);
    if (error) {
      console.log(error.message);
    }
    return data;
  }
  return useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: getTransactions,
    enabled: !!user?.id && !authLoading,
  });
}
export function GetUserBudget() {
  const { user, loading: authLoading } = useAuth();

  async function getUserBudget() {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("user_budgets")
      .select("budget_amount")
      .eq("user_id", user.id);
    if (error) {
      console.log(error.message);
    }
    return data;
  }
  return useQuery({
    queryKey: ["user_budgets", user?.id],
    queryFn: getUserBudget,
    enabled: !!user?.id && !authLoading,
  });
}
export function GetTotalSpent() {
  const { user, loading: authLoading } = useAuth();

  async function getUserBudget() {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("transactions")
      .select("Amount")
      .eq("user_id", user.id);
    const sum = data?.reduce((acc, curr) => acc + (curr.Amount ?? 0), 0) ?? 0;

    if (error) {
      console.log(error.message);
    }

    return sum;
  }
  return useQuery({
    queryKey: ["TotalSpentAamount", user?.id],
    queryFn: getUserBudget,
    enabled: !!user?.id && !authLoading,
  });
}
export function CheckNewUser() {
  const { user, loading: authLoading } = useAuth();

  async function getUserBudget() {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("user_budgets")
      .select("user_id")
      .eq("user_id", user.id);
    if (error) {
      console.log(error.message);
    }
    return data;
  }
  return useQuery({
    queryKey: ["user_budgets", user?.id],
    queryFn: getUserBudget,
    enabled: !!user?.id && !authLoading,
  });
}

