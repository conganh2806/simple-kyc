import { Card } from "primereact/card";
import { useFieldArray } from "react-hook-form";
import IdentificationDocumentCard from "../IdentificationDocumentCard";
import { Button } from "primereact/button";
import { DEFAULT_DOCUMENT } from "../../models/defaultKycValue";

const IdentificationDocumentsSection = () => {
  const { fields, append, remove } = useFieldArray({
    name: "identificationDocuments",
  });

  const customTitle = <div className="text-md">Identification Documents</div>;

  return (
    <Card title={customTitle} className="text-sm">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <IdentificationDocumentCard
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button
          type="button"
          label="Add Address"
          icon="pi pi-plus"
          size="small"
          onClick={() => append({ DEFAULT_DOCUMENT })}
        />
      </div>
    </Card>
  );
};

export default IdentificationDocumentsSection;
