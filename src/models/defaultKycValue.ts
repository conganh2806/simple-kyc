import type {
  AddressFormValues,
  EmailFormValues,
  PhoneFormValues,
} from "../schemas/kyc/contactInformation";
import type { DocumentFormValue } from "../schemas/kyc/identificationDocuments";
import type { OccupationFormValues } from "../schemas/kyc/occupation";
import { DOCUMENT_KEYS, EMAIL_KEYS, OCCUPATION_KEYS, PHONE_KEYS } from "./kyc";

export const DEFAULT_ADDRESS: AddressFormValues = {
  country: "",
  city: "",
  street: "",
  postalCode: "",
  type: "home",
};

export const DEFAULT_EMAIL: EmailFormValues = {
  email: "",
  type: EMAIL_KEYS[0],
  preferred: "yes",
};

export const DEFAULT_DOCUMENT: DocumentFormValue = {
  type: DOCUMENT_KEYS[0],
  expiryDate: "",
  uploadDocument: undefined as unknown as FileList,
};

export const DEFAULT_PHONE: PhoneFormValues = {
  number: "",
  type: PHONE_KEYS[0],
  preferred: "yes",
};

export const DEFAULT_OCCUPATION_TYPE: OccupationFormValues = {
  occupation: OCCUPATION_KEYS[0],
  fromDate: "",
  toDate: undefined,
};
