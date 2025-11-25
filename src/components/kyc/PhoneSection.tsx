import { useFieldArray } from "react-hook-form";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DEFAULT_ADDRESS } from "../../models/defaultKycValue";
import PhoneCard from "../PhoneCard";

const PhoneSection = () => {
  const { fields, append, remove } = useFieldArray({
    name: "contactInfo.phones",
  });

  const customTitle = <div className="text-md">Phones</div>;

  return (
    <Card title={customTitle} className="text-sm">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <PhoneCard
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button
          type="button"
          label="Add Phone"
          icon="pi pi-plus"
          size="small"
          onClick={() => append({ DEFAULT_ADDRESS })}
        />
      </div>
    </Card>
  );
};

export default PhoneSection;
