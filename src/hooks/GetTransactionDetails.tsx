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
      .select("Amount, Name, Description, Date, Category")
      .eq("user_id", user.id);
    if (error) {
      console.log(error.message);
    }
    console.log(data);
    return data;
  }
  return useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: getTransactions,
    enabled: !!user?.id && !authLoading,
  });
}
