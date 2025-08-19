import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/superbase";
import { useAuth } from "@/hooks/useAuth";

export const DeleteTransaction = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);
      if (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch the the transaction
      queryClient.invalidateQueries({
        queryKey: ["transactions", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["TotalSpentAamount", user?.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["user_budgets", user?.id],
      });
    },
  });
};
export const AddTransaction = () => {
  interface TransactionInput {
    TransactionAmount: number;
    TransactionName: string;
    Notes: string;
    categories: string;
  }
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<void, Error, TransactionInput>({
    mutationFn: async (values) => {
      const { error } = await supabase.from("transactions").insert({
        user_id: user.id,
        Amount: values.TransactionAmount,
        Name: values.TransactionName,
        Description: values.Notes,
        Category: values.categories,
      });
      if (error) {
        console.log(error.message, "Error in Ading Transaction");
      }
    },
    onSuccess: () => {
      // Invalidate and refetch the the transaction
      queryClient.invalidateQueries({
        queryKey: ["transactions", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["TotalSpentAamount", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_budgets", user?.id],
      });
    },
  });
};

export const UpdateBudgetDB = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ newBudget }: { newBudget: number }) => {
      const { error } = await supabase
        .from("user_budgets")
        .update({ budget_amount: newBudget })
        .eq("user_id", user.id);

      if (error) {
        console.log(error, "Error in Updating Budget");
      }
    },
    onSuccess: () => {
      // Invalidate and refetch the budget query
      queryClient.invalidateQueries({
        queryKey: ["user_budgets", user?.id],
      });
    },
  });
};
