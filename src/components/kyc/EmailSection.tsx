import { useFieldArray } from "react-hook-form";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import EmailCard from "../EmailCard";

const EmailSection = () => {
  const { fields, append, remove } = useFieldArray({
    name: "contactInfo.emails",
  });

  const customTitle = <div className="text-md">Emails</div>;

  return (
    <Card title={customTitle} className="text-sm">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <EmailCard
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button
          type="button"
          label="Add Email"
          icon="pi pi-plus"
          size="small"
          onClick={() => append({})}
        />
      </div>
    </Card>
  );
};

export default EmailSection;
