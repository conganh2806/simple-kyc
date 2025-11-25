import { useFieldArray } from "react-hook-form";
import { Button } from "primereact/button";
import AddressCard from "../AddressCard";
import { Card } from "primereact/card";
import { DEFAULT_ADDRESS } from "../../models/defaultKycValue";

const AddressSection = () => {
  const { fields, append, remove } = useFieldArray({
    name: "contactInfo.addresses",
  });

  const customTitle = <div className="text-md">Addresses</div>;

  return (
    <Card title={customTitle} className="text-sm">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <AddressCard
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
          onClick={() => append({ DEFAULT_ADDRESS })}
        />
      </div>
    </Card>
  );
};

export default AddressSection;
