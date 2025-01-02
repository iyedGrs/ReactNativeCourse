import { Link, router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useCheckoutForm } from "../../provider/CheckoutFormProvider";

const ConfirmForm = () => {
  const { personalInfo, paymenInfo, onSubmit } = useCheckoutForm();
  const onNext = () => {
    // Navigate to the next screen
    router.dismissAll(); // remover the unsused screen from the stack
    router.back();
  };
  return (
    <View style={styles.container}>
      <View style={{ gap: 15, flex: 1 }}>
        {personalInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Personal</Text>
              <Link
                href={{
                  pathname: "/checkout/personal",
                  params: { mode: "edit" },
                }}
                style={{ color: "#005055", fontWeight: "600" }}
              >
                Edit
              </Link>
            </View>
            {Object.entries(personalInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}
        {paymenInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Payment</Text>
              <Link
                href={{
                  pathname: "/checkout/payment",
                  params: { mode: "edit" },
                }}
                style={{ color: "#005055", fontWeight: "600" }}
              >
                Edit
              </Link>
            </View>
            {Object.entries(paymenInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}
      </View>
      <CustomButton title="Submit" onPress={onSubmit} style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  button: { marginTop: "auto", marginBottom: 20 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    paddingBottom: 25,
    gap: 15,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    borderRadius: 10,
    gap: 3,
  },
  dataContainerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default ConfirmForm;
