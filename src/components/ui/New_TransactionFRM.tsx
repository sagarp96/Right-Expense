import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/superbase";
// import { useTransactiondata } from "@/hooks/GetTransactionDetails";
// import { useEffect } from "react"; // Uncomment this
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

const formSchema = z.object({
  TransactionAmount: z.coerce.number("Budget Should be in number"),
  TransactionName: z.string("Nameshould be in Strings"),
  Notes: z.string(),
  categories: z.string(),
});

const categoriesRender = categories.map((category) => {
  return (
    <SelectItem
      value={category.name}
      className={`${category.color} bg-amber-100 opacity-80`}
    >
      <category.icon />
      {category.name}
    </SelectItem>
  );
});

export function NewTransactionForm() {
  const { user } = useAuth();
  // const { GetTransactionData } = useTransactiondata();

  //   useEffect(() => {
  //     if (user?.id && !loading) {
  //       GetTransactionData();
  //       //   console.log("User us authenticated");
  //     }
  //   }, [user?.id, loading]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await supabase.from("transactions").insert({
      user_id: user.id,
      Amount: values.TransactionAmount,
      Name: values.TransactionName,
      Description: values.Notes,
      Category: values.categories,
    });
    if (error) {
      console.log(error.message);
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });
  return (
    <Form {...form}>
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
                <Input placeholder="Enter Budget Amount" {...field} />
              </FormControl>
              <FormDescription>Transaction Amount</FormDescription>
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
                <Input placeholder="Enter Budget Amount" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit">Add New Transaction</Button>
      </form>
    </Form>
  );
}
