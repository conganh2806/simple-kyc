// ProfileActions.tsx
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

interface ProfileActionsProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isOfficer: boolean;
  onSave: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isEditing,
  setIsEditing,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 flex gap-4">
      {isEditing ? (
        <>
          <Button
            label="Save All"
            icon="pi pi-check"
            type="submit"
            className="border-blue-600 bg-blue-600"
          />
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-outlined p-button-secondary"
            onClick={() => {
              setIsEditing(false);
            }}
            type="button"
          />
        </>
      ) : (
        <>
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="border-blue-600 bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
            type="button"
          />
          <Button
            label="KYC"
            icon="pi pi-id-card"
            type="button"
            className="border-blue-900 bg-blue-900"
            onClick={() => {
              navigate("/kyc");
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProfileActions;
