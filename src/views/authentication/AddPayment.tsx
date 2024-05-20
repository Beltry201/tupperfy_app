import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const AddPayment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const formatCardNumber = (input) => {
    // Asegurar que solo se permitan números
    const cleaned = input.replace(/\D/g, '');
    // Dividir el número de tarjeta en grupos de 4 dígitos
    const cardGroups = cleaned.match(/.{1,4}/g);
    // Unir los grupos con un espacio entre ellos
    if (cardGroups) {
      return cardGroups.join(' ');
    }
    return cleaned;
  };

  const handleCardNumberChange = (input) => {
    setCardNumber(formatCardNumber(input));
  };

  const formatExpiryDate = (input) => {
    // Asegurar que solo se permitan números
    const cleaned = input.replace(/\D/g, '');
    // Insertar el "/" después del segundo número
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const handleExpiryDateChange = (input) => {
    setExpiryDate(formatExpiryDate(input));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Título "Agregar tarjeta" */}
        <Text style={styles.title}>Agregar tarjeta</Text>

        {/* Tarjeta de crédito */}
        <View style={styles.card}>
          <Text style={styles.cardText}>{cardNumber || 'XXXX XXXX XXXX XXXX'}</Text>
          <Text style={styles.cardText}>{cardName || 'Nombre en la tarjeta'}</Text>
          <Text style={styles.cardText}>{expiryDate || 'MM/YY'}</Text>
          <Text style={styles.cardText}>{cvv || 'CVV'}</Text>
        </View>

        {/* Formulario para ingresar datos de la tarjeta */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Número de tarjeta *</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de tarjeta"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />
          <Text style={styles.label}>Nombre en la tarjeta *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre en la tarjeta"
            value={cardName}
            onChangeText={setCardName}
          />
          <Text style={styles.label}>Fecha de expiración *</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
            maxLength={5} // Máximo de 5 caracteres (MM/YY)
          />
          <Text style={styles.label}>CVV *</Text>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCVV}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          {/* Agregar margen inferior */}
          <View style={{ marginBottom: 20 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    padding: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  formContainer: {},
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddPayment;
