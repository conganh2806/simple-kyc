import { useState, forwardRef } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

interface CustomFileInputProps {
  label: string;
  id: string;
  error?: string;
  registration: Partial<UseFormRegisterReturn>;
  accept?: string;
  containerClassName?: string;
}

const CustomFileInput = forwardRef<HTMLInputElement, CustomFileInputProps>(
  (
    {
      label,
      id,
      error,
      registration,
      accept = "image/*,.pdf",
      containerClassName = "",
    },
    ref,
  ) => {
    const [fileName, setFileName] = useState("No file chosen");

    return (
      <div className={`flex w-full flex-col gap-2 ${containerClassName}`}>
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <div
          className={`flex w-full items-center overflow-hidden rounded-md border bg-white ${error ? "border-red-500" : "border-gray-300"} h-12`}
        >
          <label
            htmlFor={id}
            className="flex h-full cursor-pointer items-center justify-center bg-slate-900 px-4 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-slate-800"
          >
            Choose File
          </label>

          <span className="flex-1 truncate px-4 text-sm text-gray-500">
            {fileName}
          </span>
        </div>

        <input
          id={id}
          type="file"
          className="hidden"
          accept={accept}
          {...registration}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFileName(e.target.files[0].name);
            } else {
              setFileName("No file chosen");
            }
            registration.onChange?.(e);
          }}
          ref={(e) => {
            registration.ref?.(e);
            if (typeof ref === "function") ref(e);
          }}
        />

        {error && <small className="text-red-500">{error}</small>}
      </div>
    );
  },
);

export default CustomFileInput;
