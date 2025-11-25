import { Card } from "primereact/card";
import AddressSection from "./AddressSection";
import EmailSection from "./EmailSection";
import PhoneSection from "./PhoneSection";

const ContactInformationSection = () => {
  return (
    <Card title="Contact Information" className="shadow-sm">
      <AddressSection />
      <div className="mt-5"></div>
      <EmailSection />
      <div className="mt-5"></div>
      <PhoneSection />
    </Card>
  );
};

export default ContactInformationSection;
