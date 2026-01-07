import React from "react";
import { cn } from "@/lib/utils";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput: React.FC<FormInputProps> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={cn(
        "w-full pl-12 pr-4 py-3.5 bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder:text-gray-500",
        className
      )}
      {...props}
    />
  );
};

export default FormInput;
