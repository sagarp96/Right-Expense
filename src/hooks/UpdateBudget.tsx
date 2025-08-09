import { supabase } from "@/lib/superbase";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function useUpdateBudget() {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [UpdateError, setError] = useState<string | null>(null);

  const updateBudget = async (newBudget: number, budgetDate: Date) => {
    // ... implementation
    const { error } = await supabase
      .from("user_budgets")
      .update({ budget_amount: newBudget, budget_start_date: budgetDate })
      .eq("user_id", user.id);

    if (error) {
      setError(error.message);
    }
  };

  return { updateBudget, isUpdating, UpdateError };
}
