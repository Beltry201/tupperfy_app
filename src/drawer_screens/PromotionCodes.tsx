import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PromotionCodes = () => {
  const [promoCode, setPromoCode] = useState('');
  const [redeemed, setRedeemed] = useState(false);

  const handleRedeem = () => {
    // Aquí iría la lógica para validar y canjear el código de promoción
    if (promoCode === 'ABC123') {
      setRedeemed(true); // Ejemplo de código válido
    } else {
      alert('Código de promoción inválido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa tu Código de Promoción</Text>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={promoCode}
        onChangeText={setPromoCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleRedeem}>
        <Text style={styles.buttonText}>Canjear</Text>
      </TouchableOpacity>
      {redeemed && <Text style={styles.redeemedMessage}>Código canjeado correctamente</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#006BFF',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  redeemedMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PromotionCodes;
