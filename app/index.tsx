import { StatusBar, TouchableOpacity, StyleSheet,  } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Modal,Alert } from "react-native";

const Index = () => {
  const [result, setResult] = useState("0");
  const [calculation, setCalculation] = useState("");
  
  const [modalVisible, setModalVisible] = useState(false);

  const [color1, setcolor]= useState("")

  const handleColorSelect = (color) => {
    Alert.alert(`You selected ${color}`);
    setcolor(color);
    setModalVisible(false);
  };


  const handlePress = (button) => {
    if (button === "=") {
      try {
        setResult(eval(calculation).toString()); // Avoid eval in production; use a math parser
      } catch (error) {
        setResult("Error");
      }
    } else if (button === "C") {
      setCalculation("");
      setResult("0");
    } else {
      // Prevent consecutive operators
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
    <View className="bg-slate-300" style={styles.container}>
          <StatusBar
        barStyle="light-content" // Light content for dark background
        className="bg-orange-200" // Background color of the status bar
        translucent={false} // Ensure it is not overlapping content
      />
      <View style={styles.resultContainer}  className="bg-orange-200" >
        <Text style={styles.resultText}>{result}</Text>
        <Text style={styles.calculationText}>{calculation}</Text>
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
            <Text style={styles.modalTitle}>Choose theme</Text>

            <View style={styles.colors}>
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: 'red' }]}
                onPress={() => handleColorSelect('Red')}
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: 'green' }]}
                onPress={() => handleColorSelect('Green')}
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: 'blue' }]}
                onPress={() => handleColorSelect('Blue')}
              />
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
 

        {/* Model code */}

     
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.dollarSign}>$</Text>
      </TouchableOpacity>



        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  button === "C" && styles.clearButton, // Add red color for "C"
                ]}
                onPress={() => handlePress(button)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button === "C" && styles.clearButtonText, // Optional: change text color for "C"
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
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  resultText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  calculationText: {
    fontSize: 24,
    color: "#888",
  },
  buttonsContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#d2d2d1",
    padding: 30,
    borderRadius: 50, // Retain your current design
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  clearButton: {
    backgroundColor: "red", // Red color for "C"
  },
  clearButtonText: {
    color: "#fff", // Optional: white text for "C"
  },

  // Model color picker
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dollarSign: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  colorPickerContainer: {
    width: 400,
    height: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Index;
