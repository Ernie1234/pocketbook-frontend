"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editCommodityFormSchema } from "@/utils/schema";
import { useTransition } from "react";

interface Props {
  role: string | undefined;
  name: string | undefined;
  price: number | null | undefined;
}
export default function EditCommodityForm({ name, price }: Props) {
  const [isPending] = useTransition();

  const checkedPrice = price?.toString();
  // const position = role as string;

  const form = useForm<z.infer<typeof editCommodityFormSchema>>({
    resolver: zodResolver(editCommodityFormSchema),
    defaultValues: {
      name: name,
      price: checkedPrice,
    },
  });

  function onSubmit(values: z.infer<typeof editCommodityFormSchema>) {
    // startTransition(() => {
    //   updateCommodity(values, position).then((data) => {
    //     if (data?.error) {
    //       toast({
    //         description: data.error,
    //         variant: "destructive",
    //       });
    //     } else {
    //       toast({
    //         description: data.success,
    //         variant: "default",
    //       });
    //     }
    //   });
    // });

    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commodity Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" disabled {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center gap-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Cost Price in naira"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="bg-green-500 hover:bg-green-700 hover:text-green-50"
            type="submit"
          >
            {isPending ? "Saving" : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
