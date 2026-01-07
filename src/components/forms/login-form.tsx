import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginFunction } from "@/services/auth-service";
import { Lock, Mail } from "lucide-react";
import FormErrorMessage from "../ui/form-error-message";
import FormInput from "../ui/form-input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCredentials } from "@/store/slices/auth-slice";
import { loginSchema } from "@/utils.ts/forms-schema";
import FormSubmitButton from "../ui/form-submit-button";
import FormIcon from "../ui/form-icon";
import FormLabel from "../ui/form-label";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const userCredentials = await loginFunction(data.email, data.password);
      if (userCredentials && userCredentials.access) {
        console.log("Login successful:", userCredentials);
        dispatch(
          setCredentials({
            email: data.email,
            password: data.password,
            access: userCredentials.access,
            refresh: userCredentials.refresh,
          })
        );
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-4"
    >
      {/* Email Input */}
      <div>
        <FormLabel htmlFor="email">Email</FormLabel>
        <div className="relative">
          <FormIcon Component={Mail} />
          <FormInput
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
          />
        </div>
        <FormErrorMessage
          isShow={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </div>

      {/* Password Input */}
      <div>
        <FormLabel htmlFor="password">Password</FormLabel>
        <div className="relative">
          <FormIcon Component={Lock} />
          <FormInput
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <FormErrorMessage
          isShow={!!errors.password}
          errorMessage={errors.password?.message}
        />
      </div>

      {/* Login Button */}
      <FormSubmitButton isLoading={isLoading} disabled={isLoading}>
        Login
      </FormSubmitButton>
    </form>
  );
};

export default LoginForm;
