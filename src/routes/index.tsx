import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login-page";
import HomePage from "@/pages/home-page";
import RouteGuard from "@/components/guards/RouteGuard";

/**
 * Application Routes Configuration
 *
 * Routes are organized as follows:
 * - /login: Public route (redirects to home if already authenticated)
 * - /: Protected route (requires authentication)
 * - /edit-user: Protected route (requires authentication)
 *
 * RouteGuard handles both protected and public route logic:
 * - type="public": Prevents authenticated users from accessing
 * - type="protected": Requires authentication
 */
export const router = createBrowserRouter([
  {
    // Public routes wrapper (prevents authenticated users from accessing)
    element: <RouteGuard type="public" />,
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
    ],
  },
  {
    // Protected routes wrapper (requires authentication)
    element: <RouteGuard type="protected" />,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
    ],
  },
  {
    path: "*",
    Component: () => <Navigate to="/login" replace />,
  },
]);
