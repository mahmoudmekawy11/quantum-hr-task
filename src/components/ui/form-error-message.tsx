import React from "react";
import { cn } from "@/lib/utils";

// type FormErrorMessageProps = React.HTMLAttributes<HTMLParagraphElement>;
interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  errorMessage?: string;
  isShow: boolean;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  className,
  isShow,
  errorMessage,
  ...props
}) => {
  if (!isShow) {
    return null;
  }
  return (
    <p
      className={cn("text-sm font-semibold text-red-500 mt-1", className)}
      {...props}
    >
      {errorMessage}
    </p>
  );
};

export default FormErrorMessage;
