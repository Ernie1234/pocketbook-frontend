import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import { userRegisterFormSchema } from "@/utils/schema";

const inputClass = `flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm border-gray-700 text-gray-700 placeholder-gray-400 transition duration-200`;

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, isLoading } = useAuthStore();
  const {
    control,
    // watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof userRegisterFormSchema>>({
    resolver: zodResolver(userRegisterFormSchema),
  });

  // const pass = watch("password");

  async function onSubmit(values: z.infer<typeof userRegisterFormSchema>) {
    const { firstName, lastName, email, password, confirmPassword } = values;
    try {
      await signUp(firstName, lastName, email, password, confirmPassword);
      //   navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-full min-h-dvh font-nunito">
      <div className="flex  flex-col h-full justify-center items-center gap-8 mx-auto w-full md:w-10/12">
        <div className="flex self-start">
          <Link to="/">
            <img
              src="/assets/logoGreen.png"
              alt="PocketBook"
              className="h-10"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-3xl text-gray-900">
            Create Account
          </h2>
          <p className="">Start trading with PocketBook</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-3 w-full">
            <div className="flex flex-col space-y-1">
              <label htmlFor="firstName">
                {errors.firstName ? (
                  <span className="text-sm text-rose-400">
                    {errors.firstName.message}
                  </span>
                ) : (
                  <span>First Name*</span>
                )}
              </label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="firstName"
                    placeholder="Enter your first name"
                    className={inputClass}
                  />
                )}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="lastName">
                {errors.lastName ? (
                  <span className="text-sm text-rose-400">
                    {errors.lastName.message}
                  </span>
                ) : (
                  <span>Last Name*</span>
                )}
              </label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="lastName"
                    placeholder="Enter your last name"
                    className={inputClass}
                  />
                )}
              />
            </div>
          </div>
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
          <div className="flex flex-col space-y-1">
            <label htmlFor="confirmPassword">
              {errors.confirmPassword ? (
                <span className="text-sm text-rose-400">
                  {errors.confirmPassword.message}
                </span>
              ) : (
                <span>Confirm Password*</span>
              )}
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className={inputClass}
                  />
                  <div
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="text-gray-500" size={20} />
                    ) : (
                      <Eye className="text-gray-500" size={20} />
                    )}
                  </div>
                </div>
              )}
            />
          </div>
          <Button
            variant="greenBtn"
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading || isSubmitting ? (
              <div className="flex w-full justify-center items-center gap-3">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p className="">Signing Up...</p>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <p className="text-sm font-medium font-nunito">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
