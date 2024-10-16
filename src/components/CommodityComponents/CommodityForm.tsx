import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { commodityFormSchema } from "@/utils/schema";
import { usePostCommodity } from "@/hooks/queries/use-commodity";

export default function CommodityForm() {
  const form = useForm<z.infer<typeof commodityFormSchema>>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: {
      unit: "per ton",
      quantity: 1,
      price: 1,
    },
  });

  const { mutation, isPending, isError, error, isSuccess } = usePostCommodity(); // Use the custom mutation hook

  const onSubmit = (values: z.infer<typeof commodityFormSchema>) => {
    const formattedValues = {
      ...values,
      quantity: Number(values.quantity) || 1, // Default to 0 if conversion fails
      price: Number(values.price) || 1, // Default to 0 if conversion fails
    };
    mutation.mutate(formattedValues);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 font-nunito"
        >
          <FormField
            control={form.control}
            name="commodityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commodity Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="quantity">Quantity</label>
              <Controller
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <input
                    id="quantity"
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none flex border-input bg-background px-3 py-2 border rounded-md ring-offset-background w-full h-10 text-sm placeholder:text-muted-foreground"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                  />
                )}
              />
              {form.formState.errors.quantity && (
                <p className="font-semibold text-red-500 text-sm">
                  {form.formState.errors.quantity.message}
                </p>
              )}
            </div>
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commodity Color</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Commodity Hex color code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="price">Price</label>
              <Controller
                name="price"
                control={form.control}
                render={({ field }) => (
                  <input
                    type="number"
                    id="price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none flex border-input bg-background px-3 py-2 border rounded-md ring-offset-background w-full h-10 text-sm placeholder:text-muted-foreground"
                    placeholder="Commodity price"
                  />
                )}
              />
              {form.formState.errors.price && (
                <p className="font-semibold text-red-500 text-sm">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select commodity per unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="per ton">Per Ton</SelectItem>
                      <SelectItem value="per bag">Per Bag</SelectItem>
                      <SelectItem value="per kilo">Per Kilo</SelectItem>
                      <SelectItem value="per cup">Per Cup</SelectItem>
                      <SelectItem value="per mudu">Per Mudu</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isError && (
            <p className="bg-rose-100 mt-2 px-4 py-2 rounded-lg font-semibold text-rose-400">
              {error?.message}
            </p>
          )}
          {isSuccess && (
            <p className="bg-green-100 mt-2 p-2 rounded-lg font-semibold text-green-400">
              Commodity added successfully
            </p>
          )}

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
