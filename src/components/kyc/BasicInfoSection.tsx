import { useFormContext } from "react-hook-form";
import { Card } from "primereact/card";
import Input from "../Input";
import { type KYCFormValues } from "../../schemas/kyc";
import FormCalendar from "../FormCalendar";

const BasicInfoSection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<KYCFormValues>();

  return (
    <Card title="Basic Information" className="shadow-sm">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          id="firstName"
          label="First Name *"
          placeholder="Jane"
          {...register("basicInfo.firstName", {
            required: "First Name is required",
          })}
          error={errors.basicInfo?.firstName?.message}
        />
        <Input
          id="lastName"
          label="Last Name *"
          placeholder="Smith"
          {...register("basicInfo.lastName", {
            required: "Last Name is required",
          })}
          error={errors.basicInfo?.lastName?.message}
        />
        <Input
          id="middleName"
          label="Middle Name *"
          placeholder="Enter your middle name"
          {...register("basicInfo.middleName")}
          error={errors.basicInfo?.lastName?.message}
        />

        <FormCalendar
          name="basicInfo.dateOfBirth"
          control={control}
          label="Date of Birth *"
          placeholder="dd/mm/yyyy"
          maxDate={new Date()}
          showButtonBar
        />
        <Input
          id="age"
          label="Age"
          placeholder="25"
          type="number"
          {...register("basicInfo.age", {
            valueAsNumber: true,
          })}
          error={errors.basicInfo?.age?.message}
          variant="filled"
        />
      </div>
    </Card>
  );
};

export default BasicInfoSection;
