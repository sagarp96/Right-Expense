import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  Amount: number;
  Name: string;
  Description: string;
  Date: Date;
  Category: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "Amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Name",
    header: () => <div className="text-right">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("Name")}</div>
      );
    },
  },
  {
    accessorKey: "Description",
    header: () => <div className="text-right">Description</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("Description")}
        </div>
      );
    },
  },
  {
    accessorKey: "Date",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("Date")}</div>
      );
    },
  },
  {
    accessorKey: "Category",
    header: () => <div className="text-right">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("Category")}</div>
      );
    },
  },
];
