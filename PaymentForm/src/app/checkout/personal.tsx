import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import CustomTextInput from "../../components/CustomInput";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  PersonalInfoSchema,
  PersonalInfo,
  useCheckoutForm,
} from "../../provider/CheckoutFormProvider";
import CheckoutFormStepIndicator from "../../components/CheckoutFormStepIndicator";

const PersonalDetails = () => {
  const { setPersonalInfo, personalInfo } = useCheckoutForm();
  const { mode } = useLocalSearchParams();
  const forms = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues:
      mode === "edit"
        ? personalInfo
        : {
            fullName: "",
            address: "",
            city: "",
            postCode: "",
            phoneNumber: "",
          },
  });
  const onNext: SubmitHandler<PersonalInfo> = (data) => {
    //the data is valid and we can navigate to the next screen
    // Navigate to the next screen

    setPersonalInfo(data);
    if (mode === "edit") {
      router.back();
      return;
    }
    router.push("/checkout/payment");
  };
  const checkName = () => {};
  return (
    <ScrollView
      // keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <FormProvider {...forms}>
        {/* <SafeAreaView edges={["bottom"]}> */}
        <CustomTextInput
          label="FullName"
          placeholder="Full name"
          name="fullName"
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <CustomTextInput
            label="City"
            placeholder="City"
            containerStyle={{ flex: 1 }}
            name="city"
          />
          <CustomTextInput
            label="Post Code"
            placeholder="1234"
            containerStyle={{ flex: 1 }}
            name="postCode"
          />
        </View>
        <CustomTextInput label="Address" placeholder="Address" name="address" />
        <CustomTextInput
          label="Phone Number"
          placeholder="+216 xxx xxx xxx"
          keyboardType="phone-pad"
          inputMode="tel"
          name="phoneNumber"
        />

        <CustomButton
          title="Next"
          onPress={forms.handleSubmit(onNext)}
          style={styles.button}
        />
        {/* </SafeAreaView> */}
      </FormProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    padding: 10,
    gap: 5,
  },
  button: { marginTop: "auto" },
});

export default PersonalDetails;
