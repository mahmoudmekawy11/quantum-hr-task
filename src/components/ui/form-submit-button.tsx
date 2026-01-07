import React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const FormSubmitButton = React.forwardRef<
  HTMLButtonElement,
  FormSubmitButtonProps
>(
  (
    {
      className,
      isLoading = false,
      children,
      disabled,
      type = "submit",
      ...rest
    },
    ref
  ) => {
    const btnDisabled = Boolean(disabled) || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={btnDisabled}
        className={cn(
          "w-full py-3.5 px-4 cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors mt-6 flex items-center justify-center gap-2",
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <LoaderCircle className="w-5 h-5 animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

export default FormSubmitButton;
