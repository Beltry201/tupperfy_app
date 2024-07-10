import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentSelection = ({ navigation }: { navigation: any }) => {
  const handleCreditCardPayment = () => {
    navigation.navigate('AddPayment');
  };

  const handleMercadoPagoPayment = () => {
    // Lógica para el pago con Mercado Pago
  };

  const handleCashPayment = () => {
    navigation.navigate('HomePage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu método de pago</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.creditCardButton]} onPress={handleCreditCardPayment}>
          <Icon name="credit-card" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.buttonText}>Tarjeta de crédito/débito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMercadoPagoPayment}>
          <Text style={styles.buttonText}>Mercado Pago</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCashPayment}>
          <Icon name="money" size={20} color="#ffffff" style={styles.icon} />
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
    backgroundColor: "#006BFF",
    width: 300,
    paddingVertical: 30,
    borderRadius: 30,
    marginBottom: 30,
    borderWidth: 1.5,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1.5,
    shadowColor: 'gray',
  },
  creditCardButton: {
    marginBottom: 40,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default PaymentSelection;
