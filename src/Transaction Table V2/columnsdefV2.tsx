import { useState, useEffect, type ChangeEvent } from "react";
import { SquarePen, CircleX, CircleCheck, Trash } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
type Option = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

import { categories } from "@/lib/Data/Categories_Data";
const categoriesRender = categories.map((category) => {
  return {
    label: category.name,
    value: category.name,
    icon: category.icon,
  };
});

export type Transaction = {
  Amount: number;
  Name: string;
  Description: string;
  Date: Date;
  Category: string;
};
const EditCell = ({ row, table }) => {
  const meta = table.options.meta;

  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  const removeRow = () => {
    meta?.removeRow(row.index, row.id);
  };
  return meta?.editedRows[row.id] ? (
    <>
      {/* <button onClick={setEditedRows} name="cancel">
        <CircleX color="#FF0000"></CircleX>
      </button>{" "}
      <button onClick={setEditedRows} name="done">
        <CircleCheck color="#00FF00"></CircleCheck>
      </button> */}
    </>
  ) : (
    <div className="flex gap-2">
      <button onClick={removeRow} name="done">
        <Trash color="#FF0000"></Trash>
      </button>
      {/* <button onClick={setEditedRows} name="edit">
        <SquarePen />
      </button> */}
    </div>
  );
};
const columnHelper = createColumnHelper<Transaction>();

const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
};
export const column_V2: ColumnDef<Transaction>[] = [
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
  {
    accessorKey: "Amount",
    header: () => <div className="text-right">Amount</div>,
    cell: TableCell,
    meta: {
      type: "number",
    },
  },
  {
    accessorKey: "Name",
    header: () => <div className="text-right">Name</div>,
    cell: TableCell,
    meta: {
      type: "text",
    },
  },
  {
    accessorKey: "Description",
    header: () => <div className="text-right">Description</div>,
    cell: TableCell,
    meta: {
      type: "text",
    },
  },
  {
    accessorKey: "Date",
    header: () => <div className="text-right">Date</div>,
    cell: TableCell,
    meta: {
      type: "date",
    },
  },
  {
    accessorKey: "Category",
    header: () => <div className="text-right">Category</div>,
    cell: TableCell,
    meta: {
      type: "select",
      options: categoriesRender,
    },
  },
];
