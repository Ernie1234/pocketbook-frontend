import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/authStore";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function VerificationEmailSuccess() {
  const location = useLocation();
  const { resendCode, isLoading, error } = useAuthStore();

  // Function to parse query parameters
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const email = query.get("email"); // Get the name from the query string

  async function handleResend(email: string | null) {
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      await resendCode(email);
      //   navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-full min-h-dvh font-nunito">
      <div className="flex flex-col items-center gap-16 md:gap-20 lg:gap-28 mx-auto px-5 md:px-0 py-8 w-full md:w-10/12 h-full">
        <div className="flex justify-self-start self-start">
          <Link to="/">
            <img
              src="/assets/logoGreen.png"
              alt="PocketBook"
              className="h-8 md:h-10"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="self-start">
            <Button
              variant="ghost"
              onClick={() => {
                window.history.back();
              }}
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <img
              src="/assets/Orion_email-sent 1.svg"
              alt="PocketBook"
              className="h-20 md:h-28"
            />
            <h2 className="font-semibold text-3xl text-gray-900">
              Verify your email address!
            </h2>
            <p className="text-center">
              We're sent a verification mail to{" "}
              <span className="text-green-600">{email}</span>
              <br /> Check your email to verify!
            </p>
            <Separator className="max-w-xl" />
          </div>
          <p className="font-medium font-nunito text-sm">
            Don{"'"}t receive email?{" "}
            <span
              onClick={() => {
                handleResend(email);
              }}
              className="font-semibold text-green-600 hover:underline cursor-pointer"
            >
              {isLoading ? "Sending..." : "Resend"}
            </span>
          </p>
          {error && (
            <p className="bg-rose-100 mt-2 p-2 rounded-lg font-semibold text-rose-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
