


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ForgotPasswordView = () => {
  const [email, setEmail] = useState('');
  
  const handleResetPassword = () => {
    // Aquí puedes implementar la lógica para enviar un correo electrónico de restablecimiento de contraseña
    // Puedes usar una API o una función para enviar el correo electrónico
    // Por ahora, simplemente mostraremos una alerta con el correo electrónico ingresado
    Alert.alert('Reset Password', `A password reset link has been sent to ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Olvidaste Contraseña?</Text>
      <Text style={styles.subTitle}>Ingresa tu email con el que te registraste para recibir tu código de seguridad</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reestablecer Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    paddingHorizontal: 20,
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

export default ForgotPasswordView;