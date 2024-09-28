import { useAuthStore } from "@/store/authStore";
import {
  useEffect,
  useRef,
  useState,
  FormEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const EmailVerificationPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const verificationCodeFromUrl = query.get("code");

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get error and loading state from auth store
  const { error, isLoading, verifyEmail } = useAuthStore();

  useEffect(() => {
    if (verificationCodeFromUrl) {
      const codeArray = verificationCodeFromUrl.split("").slice(0, 6);
      setCode(codeArray);
    } else {
      setCode(["", "", "", "", "", ""]); // Reset if no code is present
    }
  }, [verificationCodeFromUrl]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const focusIndex = Math.min(pastedCode.length, 5);
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const verificationCode = code.join("");
      try {
        await verifyEmail(verificationCode);
        navigate("/auth/login");
        toast({
          title: "Successful!",
          description: "Email verified successfully",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error!",
          description: "Email verification failed. Please try again.",
        });
      }
    },
    [code, navigate, toast, verifyEmail]
  );

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit") as unknown as FormEvent);
    }
  }, [code, handleSubmit]);

  return (
    <div className="bg-white w-full min-h-screen font-nunito">
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
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-semibold text-3xl text-gray-900">
              Welcome Back!
            </h2>
            <p>Manage your account, build your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="border-gray-400 focus:border-green-500 bg-gray-50 border rounded-lg w-12 h-12 font-bold text-2xl text-center text-gray-500 focus:outline-none"
                />
              ))}
            </div>
            {error && (
              <p className="mt-2 font-semibold text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className="bg-gradient-to-r from-green-500 hover:from-green-600 to-emerald-600 hover:to-emerald-700 focus:ring-opacity-50 disabled:opacity-50 shadow-lg px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 w-full font-bold text-white focus:outline-none"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
