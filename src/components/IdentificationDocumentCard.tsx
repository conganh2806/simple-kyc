import { Button } from "primereact/button";
import { useFormContext } from "react-hook-form";
import { documentTypes } from "../models/kyc";
import type { KYCFormValues } from "../schemas/kyc";
import FormDropdown from "./FormDropdown";
import CustomFileInput from "./CustomFileInput";
import FormCalendar from "./FormCalendar";

interface IdentificationDocumentCardProps {
  index: number;
  onRemove: () => void;
}

const IdentificationDocumentCard = ({
  index,
  onRemove,
}: IdentificationDocumentCardProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<KYCFormValues>();

  return (
    <div className="relative mt-10 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
      <div className="absolute -top-7 left-4 flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1 shadow-sm">
        <span className="text-sm font-bold text-gray-700">
          Document #{index + 1}
        </span>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-text h-6 w-6"
          onClick={onRemove}
          aria-label="Remove"
          tooltip="Remove this document"
          tooltipOptions={{ position: "top" }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormDropdown
          name={`identificationDocuments.${index}.type`}
          control={control}
          label="Type *"
          options={documentTypes}
          placeholder="Select type"
          containerClassName="mt-7"
        />
        <FormCalendar
          name={`identificationDocuments.${index}.expiryDate`}
          control={control}
          label="Expiry Date *"
          placeholder="dd/mm/yyyy"
          showButtonBar
          containerClassName="mt-7"
          minDate={new Date()}
        />
        <CustomFileInput
          id={`document-upload-${index}`}
          label="Upload Document *"
          registration={register(
            `identificationDocuments.${index}.uploadDocument`,
            {
              required: "Please upload a file",
            },
          )}
          error={
            errors.identificationDocuments?.[0]?.uploadDocument
              ?.message as string
          }
          containerClassName="mt-7"
        />
      </div>
    </div>
  );
};

export default IdentificationDocumentCard;
