import { Button } from "@/components/ui/button";
import { GrUpdate } from "react-icons/gr";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { z } from "zod";

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
const formSchema = z.object({
  UpdateAmount: z.coerce.number("Budget Should be in number"),
});
export function UpdateBudget({ HandleupdateBudget }) {
  function onSubmit(values: z.infer<typeof formSchema>) {
    HandleupdateBudget(values.UpdateAmount);
    form.reset();
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
            className="rounded-full bg-green-400 text-black"
            variant="outline"
            size="sm"
          >
            <GrUpdate /> Update Budget
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Your Budget</DialogTitle>
            <DialogDescription>Enter New Budget Amount</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="UpdateAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Input</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Budget Amount" {...field} />
                  </FormControl>
                  <FormDescription>Update Budget Amount</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
