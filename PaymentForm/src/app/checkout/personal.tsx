import React, { useEffect, useState } from "react";
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
import RNPickerSelect from "react-native-picker-select";
interface Country {
  label: string;
  value: string;
}
const PersonalDetails = () => {
  const { setPersonalInfo, personalInfo } = useCheckoutForm();
  const { mode } = useLocalSearchParams();
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        const data = await response.json();
        const formattedCountries = data
          .map((country: any) => ({
            label: country.name.common,
            value: country.cca2,
          }))
          .sort((a: Country, b: Country) => a.label.localeCompare(b.label));

        setCountries(formattedCountries);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);
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
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={countries}
          placeholder={{ label: "Select a country", value: null }}
          disabled={isLoading}
          style={{
            placeholder: { color: "#9EA0A4" },
            inputIOS: { color: "black" },
            inputAndroid: { color: "black" },
          }}
        />
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
