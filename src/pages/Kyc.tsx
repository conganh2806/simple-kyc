import { useForm, FormProvider } from "react-hook-form";
import { Button } from "primereact/button";

import BasicInfoSection from "../components/kyc/BasicInfoSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycSchema, type KYCFormValues } from "../schemas/kyc";
import ContactInformationSection from "../components/kyc/ContactInformationSection";
import { useToast } from "../contexts/ToastContext";

import supabase from "../services/supabaseClient";
import IdentificationDocumentsSection from "../components/kyc/IdentificationDocumentsSection";

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
            email: "",
            type: "personal",
            preferred: "yes",
          },
        ],
        phones: [{ number: "", type: "mobile", preferred: "yes" }],
      },
      identificationDocuments: [
        {
          type: "passport",
          expiryDate: "",
          uploadDocument: undefined,
        },
      ],
    },
  });

  const onSubmit = async (data: KYCFormValues) => {
    console.log("KYC Data Submitted:", data);
    try {
      // 1. Upload documents
      const updatedDocuments = await Promise.all(
        data.identificationDocuments.map(async (doc) => {
          if (doc.uploadDocument && doc.uploadDocument.length > 0) {
            const file = doc.uploadDocument[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('kyc-documents')
              .upload(filePath, file);

            if (uploadError) {
              throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
              .from('kyc-documents')
              .getPublicUrl(filePath);

            return {
              ...doc,
              documentUrl: publicUrl,
              uploadDocument: undefined
            };
          }
          return doc;
        })
      );

      const payload = {
        ...data,
        identificationDocuments: updatedDocuments
      };

      const { error } = await supabase
        .from('kyc_records')
        .insert([
          {
            first_name: data.basicInfo.firstName,
            last_name: data.basicInfo.lastName,
            payload: payload
          },
        ]);

      if (error) throw error;

      showToast("success", "Success", "Save kyc information successfully!");
    } catch (error) {
      console.error("Error saving KYC:", error);
      showToast("error", "Error", "Error when save kyc information");
    }
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
            <ContactInformationSection />
            <IdentificationDocumentsSection />

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
