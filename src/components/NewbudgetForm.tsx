import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, type Control } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/superbase";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

const budgetFormSchema = z.object({
  BudgetInput: z.coerce.number("Budget Should be in number"),
  BudgetStartDate: z.date("Budget Start Date is Required"),
});

type BudgetFormData = z.infer<typeof budgetFormSchema>;

export function NewBudgetForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const onSubmit: SubmitHandler<BudgetFormData> = async (values) => {
    const { error } = await supabase.from("user_budgets").insert({
      user_id: user.id,
      budget_amount: values.BudgetInput,
      budget_start_date: values.BudgetStartDate,
    });

    if (error) {
      console.log(error.message);
    } else {
      navigate({ to: "/BudgetDashboard" });
      toast.success("Welcome to your Budget Dashboard");
      console.log(values, "Submitted to Table");
    }
  };
  const form = useForm<z.infer<typeof budgetFormSchema>>({
    defaultValues: {
      BudgetInput: 0,
      BudgetStartDate: new Date(),
    },
    resolver: zodResolver(budgetFormSchema),
  });
  return (
    <Form {...form}>
      <div>
        <Toaster />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Start My Budget</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Your Budget</DialogTitle>
            <DialogDescription>Enter New Budget Amount</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="BudgetStartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Budgate Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="BudgetInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Budget Amount" {...field} />
                  </FormControl>
                  {/* <FormDescription>Start you Budget</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Start My Budget</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
