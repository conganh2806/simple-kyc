import { Button } from "primereact/button";
import { useFormContext } from "react-hook-form";
import Input from "./Input";
import type { KYCFormValues } from "../schemas/kyc";
import FormDropdown from "./FormDropdown";
import { phoneType, yesNoTypes } from "../models/kyc";

interface PhoneCardProps {
  index: number;
  onRemove: () => void;
}

const PhoneCard = ({ index, onRemove }: PhoneCardProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<KYCFormValues>();

  return (
    <div className="relative mt-10 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
      <div className="absolute -top-7 left-4 flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1 shadow-sm">
        <span className="text-sm font-bold text-gray-700">
          Phone #{index + 1}
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
          id="phoneNumber"
          label="Phone Number *"
          placeholder="123456789"
          {...register(`contactInfo.phones.${index}.number`, {
            required: "Phone Number is required",
          })}
          error={errors.contactInfo?.addresses?.[index]?.country?.message}
          className="mt-7"
        />
        <FormDropdown
          name={`contactInfo.phones.${index}.type`}
          control={control}
          label="Type *"
          placeholder="Select phone type"
          containerClassName="mt-7"
          options={phoneType}
        />
        <FormDropdown
          name={`contactInfo.phones.${index}.preferred`}
          control={control}
          label="Preferred *"
          placeholder="Select preferred type"
          options={yesNoTypes}
        />
      </div>
    </div>
  );
};

export default PhoneCard;
