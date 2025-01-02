import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import CustomTextInput from "../../components/CustomInput";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const PersonalInfoSchema = z.object({
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

type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
const PersonalDetails = () => {
  const forms = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
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
    console.log("this is error ", forms.formState.errors);
    console.log("this is the data ", data);
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
