import { Navigate, Outlet } from "react-router-dom";
import { userCredentialsSelector } from "@/store/selectors";
import { useAppSelector } from "@/hooks/redux-hooks";
import Navbar from "../shared/navbar";

interface RouteGuardProps {
  /**
   * Type of guard:
   * - "protected": Requires authentication, redirects to login if not authenticated
   * - "public": Prevents authenticated users, redirects to home if authenticated
   */
  type: "protected" | "public";
}

/**
 * RouteGuard Component
 *
 * A unified wrapper component that handles both protected and public routes.
 *
 * Protected routes (type="protected"):
 * - Requires authentication (access token)
 * - Redirects to /login if not authenticated
 *
 * Public routes (type="public"):
 * - Prevents authenticated users from accessing
 * - Redirects to / if already authenticated
 *
 * Usage:
 * <RouteGuard type="protected" /> - For protected routes
 * <RouteGuard type="public" /> - For public routes like login
 */
export default function RouteGuard({ type }: RouteGuardProps) {
  const { access } = useAppSelector(userCredentialsSelector);
  const isAuthenticated = !!access;

  if (type === "protected") {
    // For protected routes: redirect to login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  } else if (type === "public") {
    // For public routes: redirect to home if already authenticated
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  }

  // Render child routes
  return (
    <div className="h-full relative flex flex-col">
      {type === "protected" && <Navbar />}
      <main className=" flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
