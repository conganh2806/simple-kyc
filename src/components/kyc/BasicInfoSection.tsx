import { Controller, useFormContext } from "react-hook-form";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import Input from "../Input";
import { type KYCFormValues } from "../../schemas/kyc";

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
          placeholder="Enter your middel name"
          {...register("basicInfo.middleName")}
          error={errors.basicInfo?.lastName?.message}
        />

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Date of Birth*</label>
          <Controller
            name="basicInfo.dateOfBirth"
            control={control}
            render={({ field }) => (
              <Calendar
                id={field.name}
                value={field.value ? new Date(field.value) : null}
                onChange={(e) =>
                  field.onChange(e.value ? (e.value as Date).toISOString() : "")
                }
                dateFormat="dd/mm/yy"
                showIcon
                className="w-full"
              />
            )}
          />
        </div>
        <Input
          id="age"
          label="Age"
          placeholder="25"
          {...register("basicInfo.age")}
          error={errors.basicInfo?.age?.message}
          variant="filled"
        />
      </div>
    </Card>
  );
};

export default BasicInfoSection;
