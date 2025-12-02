import { useFormContext } from "react-hook-form";
import { Card } from "primereact/card";
import { type KYCFormValues } from "../../schemas/kyc";
import FormCalendar from "../FormCalendar";
import { useEffect } from "react";
import { calculateAge } from "../../utils/dateUtils";
import FormDropdown from "../FormDropdown";
import { occupationType } from "../../models/kyc";

const OccupationSection = () => {
  const { watch, setValue, control } = useFormContext<KYCFormValues>();

  const dob = watch("basicInfo.dateOfBirth");

  useEffect(() => {
    if (dob) {
      const age = calculateAge(dob);
      setValue("basicInfo.age", age, { shouldValidate: true });
    }
  }, [dob, setValue]);

  return (
    <Card title="Occupation" className="shadow-sm">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <FormDropdown
          name={`occupation.occupation`}
          control={control}
          label="Type *"
          placeholder="Select address type"
          options={occupationType}
        />
        <FormCalendar
          name="occupation.fromDate"
          control={control}
          label="Date of Birth *"
          placeholder="dd/mm/yyyy"
          maxDate={new Date()}
          showButtonBar
        />
        <FormCalendar
          name="occupation.toDate"
          control={control}
          label="Date of Birth *"
          placeholder="dd/mm/yyyy"
          showButtonBar
        />
      </div>
    </Card>
  );
};

export default OccupationSection;
