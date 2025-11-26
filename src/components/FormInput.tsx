import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Input, { type CustomInputProps } from "./Input";

interface FormInputProps<T extends FieldValues>
  extends Omit<CustomInputProps, "error"> {
  control: Control<T>;
  name: Path<T>;
  disabled: boolean;
  errors: FieldErrors<T>;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  id,
  disabled,
  errors,
  ...props
}: FormInputProps<T>) => {
  const error = (errors as any)[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          id={id}
          label={label}
          disabled={disabled}
          error={error}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default FormInput;
