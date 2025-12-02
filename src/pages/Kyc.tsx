import { useForm, FormProvider, type FieldErrors } from "react-hook-form";
import { Button } from "primereact/button";
import BasicInfoSection from "../components/kyc/BasicInfoSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycSchema, type KYCFormValues } from "../schemas/kyc";
import ContactInformationSection from "../components/kyc/ContactInformationSection";
import { useToast } from "../contexts/ToastContext";
import IdentificationDocumentsSection from "../components/kyc/IdentificationDocumentsSection";
import { kycService } from "../services/kycService";
import { DOCUMENT_KEYS } from "../models/kyc";
import {
  DEFAULT_ADDRESS,
  DEFAULT_EMAIL,
  DEFAULT_OCCUPATION_TYPE,
  DEFAULT_PHONE,
} from "../models/defaultKycValue";
import OccupationSection from "../components/kyc/OccupationSection";

const Kyc = () => {
  const { showToast } = useToast();
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
        addresses: [DEFAULT_ADDRESS],
        emails: [DEFAULT_EMAIL],
        phones: [DEFAULT_PHONE],
      },
      identificationDocuments: [
        {
          type: DOCUMENT_KEYS[0],
          expiryDate: "",
          uploadDocument: undefined,
        },
      ],
      occupation: DEFAULT_OCCUPATION_TYPE,
    },
  });

  const onSubmit = async (data: KYCFormValues) => {
    console.log("KYC Data Submitted:", data);
    try {
      await kycService.submitKyc(data);
      showToast("success", "Success", "Save kyc information successfully!");
    } catch (error) {
      console.error("Error saving KYC:", error);
      showToast("error", "Error", "Error when save kyc information");
    }
  };

  const onError = (errors: FieldErrors) => {
    console.log("Form errors: ", errors);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto mt-11 max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-600">
            Financial Status KYC
          </h2>

          <form
            onSubmit={methods.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <BasicInfoSection />
            <ContactInformationSection />
            <IdentificationDocumentsSection />
            <OccupationSection />

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
