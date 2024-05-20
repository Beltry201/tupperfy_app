import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const AddPaymentMethod = ({ navigation }: { navigation: any }) => {

  const handleAddPayment = () => {
    navigation.navigate('PaymentSelection')
  };

  const handleNotNow = () => {
    // Aquí puedes implementar la lógica para continuar sin agregar un método de pago
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Deseas agregar un método de pago ahora?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddPayment}>
          <Text style={styles.buttonText}>+ Agregar método de pago</Text>
        </TouchableOpacity>
        <View style={styles.notNowContainer}>
          <TouchableOpacity onPress={handleNotNow}>
            <Text style={styles.notNowText}>Ahora no</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50, // Separación del título a los botones
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue", // Azul oscuro
    paddingVertical: 15, // Ajuste ligeramente reducido
    paddingHorizontal: 80, // Ajuste para alargar el botón
    borderRadius: 25,
    marginBottom: 20, // Espacio entre los botones
  },
  buttonText: {
    color: "#ffffff", // Blanco
    textAlign: "center",
    fontSize: 20, // Tamaño de fuente original
    fontWeight: "bold",
  },
  notNowContainer: {
    marginTop: 20, // Espacio entre los botones
  },
  notNowText: {
    color: "blue", // Azul oscuro
    fontSize: 20, // Tamaño de fuente original
    fontWeight: "bold",
  },
});

export default AddPaymentMethod;
