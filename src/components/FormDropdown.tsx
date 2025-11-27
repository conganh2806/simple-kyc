import { Dropdown, type DropdownProps } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormDropdownProps<T extends FieldValues>
  extends Omit<DropdownProps, "name" | "value" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  id?: string;
  containerClassName?: string;
}

const FormDropdown = <T extends FieldValues>({
  control,
  name,
  label,
  id,
  options,
  containerClassName = "",
  className = "",
  placeholder = "Select an option",
  ...props
}: FormDropdownProps<T>) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <label htmlFor={id || name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Dropdown
              id={id || name}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              options={options}
              optionLabel="label"
              optionValue="value"
              placeholder={placeholder}
              onBlur={field.onBlur}
              className={classNames(
                className,
                { "p-invalid": fieldState.invalid },
                "w-full",
              )}
              {...props}
            />

            {fieldState.error && (
              <small className="p-error">{fieldState.error.message}</small>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FormDropdown;
