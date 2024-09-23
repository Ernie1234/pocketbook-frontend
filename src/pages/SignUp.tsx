import { Loader } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import PasswordStrengthMeter from "@/components/AuthComponents/PasswordStrength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const navigate = useNavigate();

  const { signUp, error, isLoading } = useAuthStore();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUp(email, password, name);
      //   navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="flex bg-white w-full min-h-dvh">
      <div className="bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter rounded-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <h2 className="bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-6 font-bold text-3xl text-center text-transparent">
            Create Account
          </h2>

          <form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={handleInputChange(setName)}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
            {error && (
              <p className="mt-2 font-semibold text-red-500">{error}</p>
            )}
            <PasswordStrengthMeter password={password} />

            <Button
              className="bg-gradient-to-r from-green-500 hover:from-green-600 to-emerald-600 hover:to-emerald-700 shadow-lg mt-5 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full font-bold text-white focus:outline-none transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="mx-auto animate-spin" size={24} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </div>
        <div className="flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
