import { cn } from "@/lib/utils";
import React from "react";

interface FormIconProps {
  Component: React.ElementType;
  className?: string;
}

const FormIcon = ({ Component, className }: FormIconProps) => {
  return (
    <Component
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10",
        className
      )}
    />
  );
};

export default FormIcon;
