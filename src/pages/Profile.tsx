import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../app/store";
import { UserRole } from "../models/auth";
import FormCalendar from "../components/FormCalendar";
import FormInput from "../components/FormInput";
import ProfileActions from "../components/ProfileActions";
import { useToast } from "../contexts/ToastContext";
import { updateUser } from "../features/userSlice";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  birthday: string;
  organization: string;
  role: string;
  department: string;
  zipCode: string;
}

const Profile = () => {
  const { showToast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const isOfficer = user?.role === UserRole.Officer;

  const defaultValues: ProfileFormValues = {
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    country: "United States",
    city: "San Francisco",
    address: "California",
    email: user?.email || "",
    phone: "+(12)3456 789",
    birthday: "2002-06-28",
    organization: "Company Name",
    role: "React Developer",
    department: "Development",
    zipCode: "123456",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues,
  });

  const getDisabledState = (field: string) => {
    if (field === "email") return true;
    return !isEditing;
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user?.id) return;
    8;
    const fullName = `${data.firstName} ${data.lastName}`;

    const platziPayload = {
      name: fullName,
      email: data.email,
    };

    const localExtendedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      city: data.city,
      address: data.address,
      phone: data.phone,
      organization: data.organization,
      department: data.department,
      zipCode: data.zipCode,
      birthday: data.birthday,
    };

    try {
      const resultAction = await dispatch(
        updateUser({
          userId: user.id,
          platziPayload,
          extendedPayload: localExtendedData,
        }),
      );

      if (updateUser.fulfilled.match(resultAction)) {
        showToast("success", "Success", "Profile updated successfully!");
        setIsEditing(false);
      } else {
        showToast("error", "Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed: ", error);
      showToast("error", "Error", "Failed to update user profile");
    }

    showToast("success", "Success", "Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Personal Information
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Picture Card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <img
                  src={user?.avatar || "https://imgur.com/a/i9xknax"}
                  alt="Profile"
                  className="mb-4 h-32 w-32 rounded-lg object-cover"
                />
                <h2 className="text-xl font-bold text-gray-900">
                  Profile picture
                </h2>
                <p className="mb-4 text-sm text-gray-500">
                  JPG, GIF or PNG. Max size of 800KB
                </p>
                <div className="flex gap-2">
                  <Button
                    label="Upload picture"
                    icon="pi pi-upload"
                    className="p-button-sm bg-blue-900"
                    disabled={isOfficer || !isEditing}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                  <Button
                    label="Delete"
                    className="p-button-sm p-button-outlined p-button-secondary"
                    disabled={isOfficer || !isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                General information
              </h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormInput
                    name="firstName"
                    control={control}
                    errors={errors}
                    label="First Name"
                    id="firstName"
                    disabled={getDisabledState("firstName")}
                  />
                  <FormInput
                    name="lastName"
                    control={control}
                    errors={errors}
                    label="Last Name"
                    id="lastName"
                    disabled={getDisabledState("lastName")}
                  />
                  <FormInput
                    name="country"
                    control={control}
                    errors={errors}
                    label="Country"
                    id="country"
                    disabled={getDisabledState("country")}
                  />
                  <FormInput
                    name="city"
                    control={control}
                    errors={errors}
                    label="City"
                    id="city"
                    disabled={getDisabledState("city")}
                  />
                  <FormInput
                    name="address"
                    control={control}
                    errors={errors}
                    label="Address"
                    id="address"
                    disabled={getDisabledState("address")}
                  />
                  <FormInput
                    name="email"
                    control={control}
                    errors={errors}
                    label="Email"
                    id="email"
                    disabled={getDisabledState("email")}
                  />
                  <FormInput
                    name="phone"
                    control={control}
                    errors={errors}
                    label="Phone"
                    id="phone"
                    disabled={getDisabledState("phone")}
                  />
                  <FormCalendar
                    name="birthday"
                    control={control}
                    label="Date Of Birth *"
                    placeholder="dd/mm/yyyy"
                    showButtonBar
                  />
                  <FormInput
                    name="organization"
                    control={control}
                    errors={errors}
                    label="Organization"
                    id="organization"
                    disabled={getDisabledState("organization")}
                  />
                  <FormInput
                    name="role"
                    control={control}
                    errors={errors}
                    label="Role"
                    id="role"
                    disabled={getDisabledState("role")}
                  />
                  <FormInput
                    name="department"
                    control={control}
                    errors={errors}
                    label="Department"
                    id="department"
                    disabled={getDisabledState("department")}
                  />
                  <FormInput
                    name="zipCode"
                    control={control}
                    errors={errors}
                    label="Zip/postal code"
                    id="zipCode"
                    disabled={getDisabledState("zipCode")}
                  />
                </div>

                {!isOfficer && (
                  <ProfileActions
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isOfficer={isOfficer}
                    onSave={handleSubmit(onSubmit)}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
