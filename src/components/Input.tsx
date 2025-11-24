import { forwardRef } from "react";
import { InputText, type InputTextProps } from "primereact/inputtext";

interface CustomInputProps extends InputTextProps {
  label: string;
  id: string;
  error?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    { label, id, className = "", inputClassName = "", error, ...props },
    ref,
  ) => {
    return (
      <div className={`mb-4 flex flex-col gap-2 ${className}`}>
        <label htmlFor={id} className="text-sm font-medium text-gray-600">
          {label}
        </label>

        <InputText
          id={id}
          ref={ref}
          {...props}
          className={`w-full ${error ? "p-invalid" : ""} ${inputClassName}`}
        />
        {error && <small className="text-red-500">{error}</small>}
      </div>
    );
  },
);

export default Input;
