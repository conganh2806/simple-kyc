import type {
  AddressFormValues,
  EmailFormValues,
} from "../schemas/kyc/contactInformation";
import type { DocumentFormValue } from "../schemas/kyc/identificationDocuments";

export const DEFAULT_ADDRESS: AddressFormValues = {
  country: "",
  city: "",
  street: "",
  postalCode: "",
  type: "home",
};

export const DEFAULT_EMAIL: EmailFormValues = {
  email: "",
  type: "work",
  preferred: "yes",
};

export const DEFAULT_DOCUMENT: DocumentFormValue = {
  type: "Passport",
  expiryDate: new Date(),
  uploadDocument: new File([], ""),
};
