import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import { userRegisterFormSchema } from "@/utils/schema";
import PasswordStrengthMeter from "@/components/AuthComponents/PasswordStrength";

export const inputClass = `flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm border-gray-700 text-gray-700 placeholder-gray-400 transition duration-200`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, isLoading, error } = useAuthStore();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof userRegisterFormSchema>>({
    resolver: zodResolver(userRegisterFormSchema),
    defaultValues: { password: "", email: "" },
  });

  const pass = watch("password");

  async function onSubmit(values: z.infer<typeof userRegisterFormSchema>) {
    const { firstName, lastName, email, password, confirmPassword } = values;
    try {
      await signUp(firstName, lastName, email, password, confirmPassword);
      navigate(
        `/auth/verification-email-success?email=${encodeURIComponent(email)}`
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-full min-h-dvh h-full font-nunito">
      <div className="flex flex-col h-full justify-center items-center gap-4 mx-auto w-full md:w-10/12 px-5 md:px-0">
        <div className="flex self-start">
          <Link to="/">
            <img
              src="/assets/logoGreen.png"
              alt="PocketBook"
              className="h-6 md:h-8"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-2xl text-gray-900">
            Create Account
          </h2>
          <p className="text-sm">Start trading with PocketBook</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex gap-3 w-full">
            <div className="flex flex-col space-y-1">
              <label htmlFor="firstName">
                {errors.firstName ? (
                  <span className="text-sm text-rose-400">
                    {errors.firstName.message}
                  </span>
                ) : (
                  <span className="text-sm">First Name*</span>
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
                  <span className="text-sm">Last Name*</span>
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
                <span className="text-sm">Email*</span>
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
                <span className="text-sm">Password*</span>
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
                <span className="text-sm">Confirm Password*</span>
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
          {error && (
            <p className="bg-rose-100 rounded-lg p-2 text-rose-400 font-semibold mt-2">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-100 rounded-lg p-2 text-green-400 font-semibold mt-2">
              Confirmation sent to your email
            </p>
          )}
          <PasswordStrengthMeter password={pass} />
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
