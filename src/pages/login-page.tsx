import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/store/slices/auth-slice";
import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login - replace with actual authentication logic
    dispatch(
      setCredentials({
        email: "user@example.com",
        password: "",
        access: "sample-access-token",
        refresh: "sample-refresh-token",
      })
    );
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-linear-to-r/decreasing from-indigo-300 to-teal-300 items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-gray-300 bg-linear-to-r/decreasing from-indigo-200 to-teal-200 backdrop-blur-lg shadow-xl p-8">
        <h1 className="text-2xl text-center font-semibold">Login</h1>
        <p className="text-gray-600 text-center">Please log in to continue</p>
        <LoginForm />
      </div>
    </div>
  );
}
