import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type Transaction } from "./columnsdefV2";

interface DataTableProps<TData extends Transaction, TValue> {
  columns: ColumnDef<TData, TValue>[];
  APIdata: TData[];
}
import { DeleteTransaction } from "@/hooks/Mutate_Data";
import { UpdateTransactionDB } from "@/hooks/Mutate_Data";
export function DataTable_V2<TData extends Transaction, TValue>({
  columns,
  APIdata,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(() => APIdata);
  const [editedRows, setEditedRows] = useState({});
  const [originalData, setOriginalData] = useState(() => APIdata);
  useEffect(() => {
    setData(APIdata);
    setOriginalData(APIdata);
  }, [APIdata]);

  const deleteTransaction = DeleteTransaction();
  const updateTransaction = UpdateTransactionDB();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      removeRow: (rowIndex: number) => {
        setData((old) => old.filter((_, index) => index !== rowIndex));
        setOriginalData((old) => old.filter((_, index) => index !== rowIndex));
        const rowID = data[rowIndex].id;
        deleteTransaction.mutate(rowID);
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        const rowID = data[rowIndex].id;
        
        // First update the local state
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: columnId === 'Amount' ? Number(value) : value,
              };
            }
            return row;
          })
        );
        
        // Get current values and update the specific column that changed
        let rowAmount = data[rowIndex].Amount;
        let rowName = data[rowIndex].Name;
        let rowNotes = data[rowIndex].Description;
        let rowCategory = data[rowIndex].Category;
        
        // Update the specific field that was edited
        // if (columnId === 'Amount') rowAmount = Number(value);
        // if (columnId === 'Name') rowName = value;
        // if (columnId === 'Description') rowNotes = value;
        // if (columnId === 'Category') rowCategory = value;
        updateTransaction.mutate( {
          id: String(rowID),
          amount: rowAmount,
          name: rowName,
          notes: rowNotes,
          category: rowCategory,
        });
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
