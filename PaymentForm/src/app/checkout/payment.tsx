import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CustomTextInput from "../../components/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaymentInfo,
  PaymentSchema,
  useCheckoutForm,
} from "../../provider/CheckoutFormProvider";

const PaymentDetails = () => {
  const { setPaymentInfo, paymenInfo } = useCheckoutForm();
  const { mode } = useLocalSearchParams();
  const forms = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentSchema),
    defaultValues:
      mode === "edit"
        ? paymenInfo
        : {
            cardNumber: "",
            expiryDate: "",
            cvv: 0,
          },
  });
  const onNext: SubmitHandler<PaymentInfo> = (data: PaymentInfo) => {
    // Navigate to the next screen
    setPaymentInfo(data);
    router.push("/checkout/confirm");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormProvider {...forms}>
        <CustomTextInput
          name="cardNumber"
          placeholder="Card Number"
          label="Card Number"
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <CustomTextInput
            label="Expires"
            name="expiryDate"
            placeholder="Expiry Date"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            containerStyle={{ flex: 1 }}
            label="CVV"
            name="cvv"
            placeholder="CVV"
            inputMode="numeric"
          />
        </View>
        {/* <CustomTextInput  /> */}
      </FormProvider>

      <CustomButton
        title="Next"
        onPress={forms.handleSubmit(onNext)}
        style={styles.button}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  button: { marginTop: "auto" },
});

export default PaymentDetails;
