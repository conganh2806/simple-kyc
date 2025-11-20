import { forwardRef } from "react";
import { InputText, type InputTextProps } from "primereact/inputtext";

interface CustomInputProps extends InputTextProps {
  label: string;
  id: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, id, className = "", error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor={id} className="text-sm font-medium text-gray-600">
          {label}
        </label>

        <InputText
          id={id}
          ref={ref}
          {...props}
          className={`w-full ${error ? "p-invalid" : ""} ${className}`}
        />
        <small className="text-red-500">{error}</small>
      </div>
    );
  }
);

export default Input;
