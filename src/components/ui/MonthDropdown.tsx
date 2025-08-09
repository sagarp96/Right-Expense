import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { MouseEvent } from "react";
import { CalendarDays } from "lucide-react";
import { Banknote } from "lucide-react";
const months = [
  { value: 0, label: "January", short: "Jan" },
  { value: 1, label: "February", short: "Feb" },
  { value: 2, label: "March", short: "Mar" },
  { value: 3, label: "April", short: "Apr" },
  { value: 4, label: "May", short: "May" },
  { value: 5, label: "June", short: "Jun" },
  { value: 6, label: "July", short: "Jul" },
  { value: 7, label: "August", short: "Aug" },
  { value: 8, label: "September", short: "Sep" },
  { value: 9, label: "October", short: "Oct" },
  { value: 10, label: "November", short: "Nov" },
  { value: 11, label: "December", short: "Dec" },
];

export default function MonthPopup() {
  const handleMonthClick = (
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return console.log((event.target as HTMLButtonElement).value);
  };
  const monthRender = months.map((month) => {
    return (
      <Button
        value={month.label}
        variant="ghost"
        onClick={(e) => handleMonthClick(e)}
      >
        {month.short}
      </Button>
    );
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="rounded-full">
          <CalendarDays /> Select Month
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-3 gap-4">
        {monthRender}
        <Button className="rounded-full col-span-3">
          <Banknote /> See my Budget
        </Button>
      </PopoverContent>
    </Popover>
  );
}
