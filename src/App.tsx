import { useEffect } from "react";
import SignUpPage from "./pages/SignUp";
import { useAuthStore } from "./store/authStore";
import { Route, Routes } from "react-router-dom";
import {
  ProtectedRoute,
  RedirectAuthenticatedUser,
} from "./components/AuthComponents/RedirectAuthenticatedUser";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <p>Loading</p>;

  return (
    <Routes>
      <Route
        path="/auth/register"
        element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomePage />} />
      {/* catch all routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
