import type { UserProfile } from "./auth";

export interface UserPlatziUpdatePayload {
  email?: string;
  name?: string;
  avatar?: string;
  password?: string;
  role?: string;
}

export interface ExtendedUserProfile extends UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  organization?: string;
  department?: string;
  zipCode?: string;
  birthday?: string;
}
