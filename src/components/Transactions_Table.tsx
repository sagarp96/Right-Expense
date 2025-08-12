import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { columns } from "@/Transactions Table/columns";
import { DataTable } from "@/Transactions Table/data-table";
import { useTransactions } from "@/hooks/GetTransactionDetails";

const queryClient = new QueryClient();
export default function FetchTransactionData() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionData />
    </QueryClientProvider>
  );
}

export function TransactionData() {
  const { data, isPending, error } = useTransactions();
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
