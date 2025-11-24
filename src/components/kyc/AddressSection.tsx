import { useFieldArray } from "react-hook-form";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import AddressCard from "../AddressCard";

const AddressSection = () => {
  const { fields, append, remove } = useFieldArray({
    name: "contactInfo.addresses",
  });

  return (
    <Card title="Contact Information" className="shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Addresses</h3>

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
          onClick={() =>
            append({
              country: "",
              city: "",
              street: "",
              postalCode: "",
              type: "home",
            })
          }
        />
      </div>
    </Card>
  );
};

export default AddressSection;
