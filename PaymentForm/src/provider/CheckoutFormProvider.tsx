import { useContext, createContext, useState, PropsWithChildren } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "expo-router";
export const PersonalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Please enter a valid address"),

  city: z.string().min(1, "City is required").min(2, "City name is too short"),

  postCode: z
    .string()
    .min(1, "Postcode is required")
    .min(4, "enter a valid postcode"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(8, "Please enter a valid phone number"),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export const PaymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .min(16, "Please enter a valid card number"),
  expiryDate: z
    .string()
    .regex(/([0-9]{2})\/([0-9]{2})/, "Please enter a valid expiry date"),
  cvv: z.coerce.number().min(100).max(999),
});

export type PaymentInfo = z.infer<typeof PaymentSchema>;
type CheckoutFormContextType = {
  personalInfo: PersonalInfo | undefined;
  paymenInfo: PaymentInfo | undefined;
  setPersonalInfo: (info: PersonalInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  onSubmit: () => void;
};

const CheckoutFormContext = createContext<CheckoutFormContextType>({
  personalInfo: undefined,
  paymenInfo: undefined,
  setPersonalInfo: () => {},
  setPaymentInfo: () => {},
  onSubmit: () => {},
});

const CheckoutFormProvider = ({ children }: PropsWithChildren) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>(
    undefined
  );
  const [paymenInfo, setPaymentInfo] = useState<PaymentInfo | undefined>(
    undefined
  );
  const onSubmit = () => {
    if (!personalInfo || !paymenInfo) {
      console.log("the form is not  complete");
    }
    setPaymentInfo(undefined);
    setPersonalInfo(undefined);
    router.dismissAll();
    router.back();
  };
  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        paymenInfo,
        setPersonalInfo,
        setPaymentInfo,
        onSubmit,
      }}
    >
      {children}
    </CheckoutFormContext.Provider>
  );
};

export const useCheckoutForm = () => useContext(CheckoutFormContext);

export default CheckoutFormProvider;
