import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const RedirectAuthenticatedUser = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};
