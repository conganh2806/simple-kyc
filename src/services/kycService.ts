import { jsonClient } from "./axiosClient";
import supabase from "./supabaseClient";
import { type KYCFormValues } from "../schemas/kyc";
import { type KycSubmissionData } from "../models/kyc";

export const kycService = {
  uploadDocuments: async (
    documents: KYCFormValues["identificationDocuments"],
  ) => {
    const updatedDocuments = await Promise.all(
      documents.map(async (doc) => {
        if (doc.uploadDocument && doc.uploadDocument.length > 0) {
          const file = doc.uploadDocument[0] as File;
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("kyc-documents")
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const {
            data: { publicUrl },
          } = supabase.storage.from("kyc-documents").getPublicUrl(fileName);

          return {
            ...doc,
            documentUrl: publicUrl,
            uploadDocument: undefined,
          };
        }
        return doc;
      }),
    );
    return updatedDocuments;
  },

  submitKyc: async (data: KYCFormValues) => {
    const documentsWithUrls = await kycService.uploadDocuments(
      data.identificationDocuments,
    );

    const payload = {
      ...data,
      identificationDocuments: documentsWithUrls,
      approved: false,
      createdAt: new Date().toISOString(),
    };

    return jsonClient.post("/kyc", payload);
  },

  getAllSubmissions: async () => {
    return jsonClient.get<KycSubmissionData[]>("/kyc");
  },

  updateStatus: async (id: number, status: "approved" | "rejected") => {
    return jsonClient.patch(`/kyc/${id}`, { status });
  },
};
