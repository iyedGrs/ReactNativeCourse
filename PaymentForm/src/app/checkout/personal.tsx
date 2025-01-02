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
type FormData = {
  fullName: string;
  city: string;
  postCode: string;
  address: string;
  phoneNumber: string;
};
const PersonalDetails = () => {
  const forms = useForm();
  const onNext: SubmitHandler<any> = (data: FormData) => {
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
