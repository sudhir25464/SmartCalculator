import { StatusBar, TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { useState } from "react";
import { Modal, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 

const Index = () => {
  const [result, setResult] = useState("0");
  const [calculation, setCalculation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FFC300"); // Default background color
  const [resultTextColor, setResultTextColor] = useState("#333"); // Default result text color

  const themes = [
    { background: "#FFC300", text: "#333" },
    { background: "#FF5733", text: "#FFF" },
    { background: "#C70039", text: "#FFC300" },
    { background: "#900C3F", text: "#DAF7A6" },
    { background: "#581845", text: "#FF33A8" },
    { background: "#DAF7A6", text: "#C70039" },
    { background: "#33FF57", text: "#581845" },
    { background: "#33FFF5", text: "#900C3F" },
    { background: "#5733FF", text: "#DAF7A6" },
    { background: "#F533FF", text: "#FFC300" },
    { background: "#FF33A8", text: "#FF5733" },
    { background: "#FFA533", text: "#33FFF5" },
  ];

  const handleColorSelect = (theme) => {
    Alert.alert(`Theme selected`);
    setBackgroundColor(theme.background);
    setResultTextColor(theme.text);
    setModalVisible(false);
  };

  const handlePress = (button) => {
    if (button === "=") {
      try {
        setResult(eval(calculation).toString()); // Avoid eval in production; use a math parser
      } catch (error) {
        setResult("");
      }
    } else if (button === "C") {
      setCalculation("");
      setResult("0");
    } else {
      setCalculation((prev) => {
        if (
          ["+", "-", "*", "/"].includes(button) &&
          ["+", "-", "*", "/"].includes(prev.slice(-1))
        ) {
          return prev; // Do nothing if last character is an operator
        }
        return prev + button; // Append valid input
      });
    }
  };

  const buttons = [
    ["C", "(", ")", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" translucent={false} />
      <View style={styles.resultContainer}>
        <Text style={[styles.resultText, { color: resultTextColor }]}>
          {result}
        </Text>
        <Text style={[styles.calculationText, { color: resultTextColor }]}>
          {calculation}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.colorPickerContainer}>
              <Text style={styles.modalTitle}>Choose a Theme</Text>
              <View style={styles.colors}>
                {themes.map((theme, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: theme.background },
                    ]}
                    onPress={() => handleColorSelect(theme)}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ alignItems: "flex-end" }}
        >
             <Icon name="palette" size={40} color="#000" />
        </TouchableOpacity>

        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  button === "C" && styles.clearButton,
                ]}
                onPress={() => handlePress(button)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button === "C" && styles.clearButtonText,
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  resultText: { fontSize: 50, fontWeight: "bold" },
  calculationText: { fontSize: 24 },
  buttonsContainer: { flex: 2, padding: 10, marginBottom: 5 },
  row: { flexDirection: "row", justifyContent: "space-around", marginBottom: 13 },
  button: {
    backgroundColor: "#ecb89d",
    padding: 30,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontSize: 24, fontWeight: "bold", color: "#333" },
  clearButton: { backgroundColor: "red" },
  clearButtonText: { color: "#fff" },
  dollarSign: { fontSize: 40, fontWeight: "bold", color: "#000" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  colorPickerContainer: {
    width: 400,
    height: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  colors: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", width: "100%", marginBottom: 20 },
  colorCircle: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#000", margin: 5 },
  closeButton: {width:"100%", justifyContent:"center", alignItems:"center", marginTop: 10, backgroundColor: "#dddd", padding: 10, borderRadius: 5 },
  closeButtonText: { fontSize: 16, fontWeight: "bold" },
});

export default Index;
