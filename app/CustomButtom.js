import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButtom = ({ label, onPress, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color || "#d1d1d1" }]}
      onPress={() => onPress(label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CustomButtom;
