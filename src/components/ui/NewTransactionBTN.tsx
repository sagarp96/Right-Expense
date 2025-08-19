import { Button } from "@/components/ui/button";
import { TicketPlus } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { categories } from "@/lib/Data/Categories_Data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddTransaction } from "@/hooks/Mutate_Data";
const categoriesRender = categories.map((category) => {
  return (
    <SelectItem value={category.name} className={`text-${category.color}`}>
      <category.icon />
      {category.name}
    </SelectItem>
  );
});
const formSchema = z.object({
  TransactionAmount: z.coerce.number("Budget Should be in number"),
  TransactionName: z.string("Budget Name should be in alphabets"),
  Notes: z.string("Notes should be in alphabets"),
  categories: z.string("Atleast one category is required"),
});

export function AddNewTransaction() {
  const AddnewTranactionDB = AddTransaction();

  // const { user } = useAuth();
  function onSubmit(values: z.infer<typeof formSchema>) {
    AddnewTranactionDB.mutate(values);
    toast.success("Transaction Added");
  }
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });
  return (
    <Form {...form}>
      <div>
        <Toaster />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-green-600 text-black"
          >
            <TicketPlus />
            Add New Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Your Budget</DialogTitle>
            <DialogDescription>Enter New Budget Amount</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="TransactionAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Input</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Budget Amount" {...field} />
                  </FormControl>
                  <FormDescription>Transaction Amount</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TransactionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Transaction Name" {...field} />
                  </FormControl>
                  <FormDescription>Transaction Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>

                  <FormControl>
                    <Input placeholder="Notes" {...field} />
                  </FormControl>
                  <FormDescription>Notes</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{categoriesRender}</SelectContent>
                  </Select>
                  <FormDescription>Categories</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit">Add Transaction</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
