import { useEffect } from "react";
import SignUpPage from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import {
  ProtectedRoute,
  RedirectAuthenticatedUser,
} from "./components/AuthComponents/RedirectAuthenticatedUser";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import AuthWrapper from "./components/AuthComponents/AuthWrapper";
import SignInPage from "./pages/SignIn";
import VerificationEmailSuccess from "./pages/VerificationEmailSuccess";
import EmailVerificationPage from "./pages/Verification";
import CommoditiesPage from "./pages/CommoditiesPage";
import PortfolioPage from "./pages/PortfolioPage";
import TransactionPage from "./pages/TransactionPage";
import CommodityPage from "./pages/CommodityPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import PreferencePage from "./pages/PreferencePage";
import { useAuthStore } from "./store/authStore";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <p>Loading user</p>;

  return (
    <Routes>
      <Route
        path="/auth/register"
        element={
          <RedirectAuthenticatedUser>
            <AuthWrapper>
              <SignUpPage />
            </AuthWrapper>
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/auth/login"
        element={
          <RedirectAuthenticatedUser>
            <AuthWrapper>
              <SignInPage />
            </AuthWrapper>
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/auth/verification-email-success"
        element={
          <RedirectAuthenticatedUser>
            <AuthWrapper>
              <VerificationEmailSuccess />
            </AuthWrapper>
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/auth/email-verification"
        element={
          <RedirectAuthenticatedUser>
            <AuthWrapper>
              <EmailVerificationPage />
            </AuthWrapper>
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
      <Route
        path="/dashboard/commodities"
        element={
          <ProtectedRoute>
            <CommoditiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/commodities/:slug"
        element={
          <ProtectedRoute>
            <CommodityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/portfolio"
        element={
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/transaction"
        element={
          <ProtectedRoute>
            <TransactionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/setting/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/setting/notification"
        element={
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/setting/preference"
        element={
          <ProtectedRoute>
            <PreferencePage />
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
