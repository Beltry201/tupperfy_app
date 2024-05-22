import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ForgotPasswordView = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    Alert.alert('Restablecer contraseña', `Te hemos enviado un código de verificación ${email}`);
    navigation.navigate('CodeInput');
  };

  const setEmailLowerCase = (text: string) => {
    setEmail(text.toLowerCase()); // Convertir el texto a minúsculas antes de establecerlo en el estado
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¿Olvidaste Contraseña?</Text>
        <Text style={styles.subTitle}>Ingresa tu email para recuperar tu contraseña</Text>
      </View>
      <View style={styles.middle}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmailLowerCase} // Usar la función que convierte a minúsculas
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          
        />
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Recibir código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 40, // Asegura que el header esté en la parte superior
  },
  middle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginTop: -20, // Ajuste sutil para subir un poco los elementos
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: 'black',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 100,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 15, // Tamaño de fuente más pequeño
    color: 'black', // Cambio de color a negro
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
    borderRadius: 18,
    borderColor: 'black', // Borde negro
    borderWidth: 2, // Grosor del borde
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ForgotPasswordView;
