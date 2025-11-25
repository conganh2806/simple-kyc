import { Calendar, type CalendarProps } from "primereact/calendar";
import { classNames } from "primereact/utils";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormCalendarProps<T extends FieldValues>
  extends Omit<CalendarProps, "name" | "value" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  id?: string;
  containerClassName?: string;
}

const FormCalendar = <T extends FieldValues>({
  control,
  name,
  label,
  id,
  containerClassName = "",
  className = "",
  dateFormat = "dd/mm/yy",
  showIcon = true,
  ...props
}: FormCalendarProps<T>) => {
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
            <Calendar
              id={id || name}
              {...props}
              value={field.value ? new Date(field.value) : null}
              onChange={(e) => {
                const dateVal = e.value as Date | null;
                if (dateVal) {
                  field.onChange(dateVal.toISOString());
                } else {
                  field.onChange(null);
                }
              }}
              dateFormat={dateFormat}
              showIcon={showIcon}
              className={classNames(
                className,
                { "p-invalid": fieldState.invalid },
                "w-full",
              )}
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
export default FormCalendar;
