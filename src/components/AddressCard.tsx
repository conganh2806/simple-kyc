import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Controller, useFormContext } from "react-hook-form";
import { addressTypes } from "../models/kyc";
import Input from "./Input";
import type { KYCFormValues } from "../schemas/kyc";

interface AddressCardProps {
  index: number;
  onRemove: () => void;
}

const AddressCard = ({ index, onRemove }: AddressCardProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<KYCFormValues>();

  return (
    <div className="relative mt-10 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
      <div className="absolute -top-7 left-4 flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1 shadow-sm">
        <span className="text-sm font-bold text-gray-700">
          Address #{index + 1}
        </span>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-text h-6 w-6"
          onClick={onRemove}
          aria-label="Remove"
          tooltip="Remove this address"
          tooltipOptions={{ position: "top" }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="country"
          label="Country *"
          placeholder="United States"
          {...register(`contactInfo.addresses.${index}.country`, {
            required: "First Name is required",
          })}
          error={errors.contactInfo?.addresses?.[index]?.country?.message}
          className="mt-7"
        />
        <Input
          id="city"
          label="City *"
          placeholder="San Francisco"
          {...register(`contactInfo.addresses.${index}.city`, {
            required: "City is required",
          })}
          error={errors.contactInfo?.addresses?.[index]?.city?.message}
          className="mt-7"
        />
        <Input
          id="street"
          label="Street *"
          placeholder="123 Market Street"
          {...register(`contactInfo.addresses.${index}.street`, {
            required: "Street is required",
          })}
          error={errors.contactInfo?.addresses?.[index]?.street?.message}
        />
        <Input
          id="postalCode"
          label="Postal Code"
          placeholder="San Francisco"
          {...register(`contactInfo.addresses.${index}.city`, {
            required: "City is required",
          })}
          error={errors.contactInfo?.addresses?.[index]?.city?.message}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm">Type *</label>
          <Controller
            name={`contactInfo.addresses.${index}.type`}
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                id={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={addressTypes}
                placeholder="Select address type"
                className={`w-full ${fieldState.invalid ? "p-invalid" : ""}`}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
