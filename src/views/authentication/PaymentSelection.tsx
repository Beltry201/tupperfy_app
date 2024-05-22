import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const PaymentSelection = ({ navigation }: { navigation: any }) => {
  const handleCreditCardPayment = () => {
    navigation.navigate('AddPayment')
  };

  const handleMercadoPagoPayment = () => {
    // Lógica para el pago con Mercado Pago
  };

  const handleCashPayment = () => {
    // Lógica para el pago en efectivo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu método de pago</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.creditCardButton]} onPress={handleCreditCardPayment}>
          <Text style={styles.buttonText}>Tarjeta de crédito/débito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMercadoPagoPayment}>
          <Text style={styles.buttonText}>Mercado Pago</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCashPayment}>
          <Text style={styles.buttonText}>Efectivo</Text>
        </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    width: 300,
    paddingVertical: 30,
    borderRadius: 30,
    marginBottom: 30, // Separación aumentada entre los botones
    borderWidth: 3, // Grosor del borde aumentado
    borderColor: "black", // Color del borde
  },
  creditCardButton: {
    marginBottom: 40, // Aumentar el espacio entre este botón y los otros
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20, // Tamaño del texto mantenido
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PaymentSelection;
