import { useTransactions } from "@/hooks/Querry_Data";
import { column_V2 } from "@/Transaction Table V2/columnsdefV2";
import { DataTable_V2 } from "@/Transaction Table V2/data-table_V2";
export default function FetchTransactionData() {
  const { data, isPending, error } = useTransactions();
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="container mx-auto py-10">
      <DataTable_V2 columns={column_V2} APIdata={data || []} />
    </div>
  );
}
