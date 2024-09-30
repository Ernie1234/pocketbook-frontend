import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const RedirectAuthenticatedUser = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/auth/email-verification" replace />;
  }

  return children;
};
