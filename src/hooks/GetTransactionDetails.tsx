import { useState, useEffect } from "react"; // Uncomment this
import { supabase } from "@/lib/superbase";
import { useAuth } from "@/hooks/useAuth";

export function useTransactiondata() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState(null); // Add this state
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const GetTransactionData = async () => {
    setIsLoading(true); // Set loading to true
    setError(null); // Clear previous errors

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      setError(error.message); // Update error state
      setTransactions(null);
    } else {
      setTransactions(data); // Update transactions state
      console.log(data);
    }

    setIsLoading(false); // Set loading to false
    return data;
  };

  return {
    GetTransactionData,
    transactions,
    isLoading,
    error,
  }; // Return all state values
}
