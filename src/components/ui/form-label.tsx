import { cn } from "@/lib/utils";
import React from "react";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

const FormLabel = ({
  children,
  htmlFor,
  className,
  ...props
}: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
    >
      {children}
    </label>
  );
};

export default FormLabel;
