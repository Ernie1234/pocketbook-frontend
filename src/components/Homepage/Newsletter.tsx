import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import Chip from "../Chip";
import { Button } from "../ui/button";
import Wrapper from "./Wrapper";

const newsLetterFormSchema = z.object({
  email: z.string().email(),
});

const Newsletter = () => {
  const form = useForm<z.infer<typeof newsLetterFormSchema>>({
    resolver: zodResolver(newsLetterFormSchema),
  });

  function onSubmit(values: z.infer<typeof newsLetterFormSchema>) {
    console.log(values);
  }

  return (
    <div className="relative bg-green overflow-hidden">
      <div className="-bottom-24 -left-24 absolute border-2 border-green-foreground/30 rounded-full w-[20rem] h-[20rem]" />
      <div className="-top-10 -right-24 absolute border-2 border-green-foreground/30 rounded-3xl w-[20rem] h-28" />
      <Wrapper className="flex flex-col justify-center items-center py-8 lg:py-16 w-full">
        <Chip
          className="flex items-center gap-2 bg-green-foreground/20 px-5 py-1 rounded-full max-w-fit font-semibold text-green-100 text-lg capitalize"
          text="Stay Connected"
        />
        <h3 className="my-4 max-w-[40rem] font-bold text-center text-green-100 text-xl md:text-3xl lg:text-5xl leading-10">
          Stay Informed, Subscribe to Our Newsletter
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-4 mt-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="E-mail Address"
                      className="p-3 rounded-full min-w-72"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-green-foreground rounded-full font-semibold text-green text-lg"
            >
              Subscribe
            </Button>
          </form>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Newsletter;
