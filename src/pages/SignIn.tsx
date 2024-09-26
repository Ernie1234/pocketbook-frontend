import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userLoginFormSchema } from "@/utils/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SignInPage = () => {
  const { login, isLoading } = useAuthStore();
  const form = useForm<z.infer<typeof userLoginFormSchema>>({
    resolver: zodResolver(userLoginFormSchema),
  });
  async function onSubmit(values: z.infer<typeof userLoginFormSchema>) {
    const { email, password } = values;
    try {
      await login(email, password);
      //   navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center bg-white w-full min-h-dvh">
      <div className="bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter rounded-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <h2 className="bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-6 font-bold text-3xl text-center text-transparent">
            Welcome back
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-gradient-to-r from-green-500 hover:from-green-600 to-emerald-600 hover:to-emerald-700 shadow-lg mt-5 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full font-bold text-white focus:outline-none transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="mx-auto animate-spin" size={24} />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4">
          <p className="text-gray-400 text-sm">
            Don{"'"}t have an account?{" "}
            <Link
              to={"/auth/register"}
              className="text-green-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
