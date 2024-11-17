import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import { userLoginFormSchema } from "@/utils/schema";
import { useState } from "react";
import { inputClass } from "./SignUp";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof userLoginFormSchema>>({
    resolver: zodResolver(userLoginFormSchema),
  });
  async function onSubmit(values: z.infer<typeof userLoginFormSchema>) {
    const { email, password } = values;
    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      //   navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-full min-h-dvh font-nunito">
      <div className="flex flex-col h-full py-8 items-center gap-16 md:gap-20 lg:gap-28 mx-auto w-full md:w-10/12 px-5 md:px-0">
        <div className="flex self-start justify-self-start">
          <Link to="/">
            <img
              src="/assets/logoGreen.png"
              alt="PocketBook"
              className="h-8 md:h-10"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-semibold text-3xl text-gray-900">
              Welcome Back!
            </h2>
            <p className="">Manage your account, build your portfolio</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full lg:w-2/3"
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">
                {errors.email ? (
                  <span className="text-sm text-rose-400">
                    {errors.email.message}
                  </span>
                ) : (
                  <span>Email*</span>
                )}
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                )}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="password">
                {errors.password ? (
                  <span className="text-sm text-rose-400">
                    {errors.password.message}
                  </span>
                ) : (
                  <span>Password*</span>
                )}
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div style={{ position: "relative" }}>
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className={inputClass}
                    />
                    <div
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{ position: "absolute", right: 10, top: 10 }}
                    >
                      {showPassword ? (
                        <EyeOff className="text-gray-500" size={20} />
                      ) : (
                        <Eye className="text-gray-500" size={20} />
                      )}
                    </div>
                  </div>
                )}
              />
            </div>

            {error && (
              <p className="bg-rose-100 rounded-lg px-4 py-2 text-rose-400 font-semibold mt-2">
                {error}
              </p>
            )}
            {success && (
              <p className="bg-green-100 rounded-lg p-2 text-green-400 font-semibold mt-2">
                Confirmation sent to your email
              </p>
            )}

            <Button
              variant="greenBtn"
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading || isSubmitting ? (
                <div className="flex w-full justify-center items-center gap-3">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p className="">Signing In...</p>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <p className="text-sm font-medium font-nunito">
            Don{"'"}t have an account?{" "}
            <Link
              to={"/auth/register"}
              className="text-green-500 hover:underline"
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
