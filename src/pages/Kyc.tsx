import { useForm, FormProvider } from "react-hook-form";
import { Button } from "primereact/button";

import BasicInfoSection from "../components/kyc/BasicInfoSection";
import AddressSection from "../components/kyc/AddressSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycSchema, type KYCFormValues } from "../schemas/kyc";

const Kyc = () => {
  const methods = useForm<KYCFormValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      basicInfo: {
        firstName: "",
        lastName: "",
        middleName: "",
        dateOfBirth: "",
      },
      contactInfo: {
        addresses: [
          {
            country: "",
            city: "",
            street: "",
            type: "home",
            postalCode: "",
          },
        ],
        emails: [
          {
            address: "",
            type: "personal",
          },
        ],
        phones: [{ number: "", type: "mobile" }],
      },
    },
  });

  const onSubmit = (data: KYCFormValues) => {
    console.log("KYC Data Submitted:", data);
  };

  const onError = (errors: any) => {
    console.log("Form errors: ", errors);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto mt-11 max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-600">
            Financial Status KYC
          </h2>

          <form
            onSubmit={methods.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <BasicInfoSection />
            <AddressSection />

            <div className="flex justify-end pt-4">
              <Button
                label="Submit KYC"
                size="large"
                icon="pi pi-check"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default Kyc;
