import { Button } from "primereact/button";
import { useFormContext } from "react-hook-form";
import Input from "./Input";
import type { KYCFormValues } from "../schemas/kyc";
import FormDropdown from "./FormDropdown";
import { emailTypes, yesNoTypes } from "../models/kyc";

interface EmailCardProps {
  index: number;
  onRemove: () => void;
}

const EmailCard = ({ index, onRemove }: EmailCardProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<KYCFormValues>();

  return (
    <div className="relative mt-10 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
      <div className="absolute -top-7 left-4 flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1 shadow-sm">
        <span className="text-sm font-bold text-gray-700">
          Email #{index + 1}
        </span>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-text h-6 w-6"
          onClick={onRemove}
          aria-label="Remove"
          tooltip="Remove this email"
          tooltipOptions={{ position: "top" }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="email"
          label="Email Address *"
          placeholder="client1@gmail.com"
          {...register(`contactInfo.emails.${index}.email`, {
            required: "Email is required",
          })}
          error={errors.contactInfo?.addresses?.[index]?.country?.message}
          className="mt-7"
        />
        <FormDropdown
          name={`contactInfo.emails.${index}.type`}
          control={control}
          label="Type *"
          placeholder="Select address type"
          containerClassName="mt-7"
          options={emailTypes}
        />
        <FormDropdown
          name={`contactInfo.emails.${index}.preferred`}
          control={control}
          label="Preferred *"
          placeholder="Select preferred type"
          options={yesNoTypes}
        />
      </div>
    </div>
  );
};

export default EmailCard;
