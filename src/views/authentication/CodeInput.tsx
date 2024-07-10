import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const CodeInput = ({ navigation }: { navigation: any }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleVerification = () => {
    navigation.navigate('ResetPassword');
    const verificationCode = code.join('');
    if (verificationCode.length === 4) {
      Alert.alert('¡Código ingresado exitosamente!', verificationCode);
    } else {
      Alert.alert('Error', 'Por favor, ingresa un código de 4 dígitos.');
    }
  };

  const handleResendCode = () => {
    Alert.alert('Código reenviado', 'Te hemos reenviado un código.');
  };

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus the next input if available
      if (value.length === 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código de verificación</Text>
      <Text style={styles.subtitle}>Enviamos un código de verificación a tu email</Text>
      <View style={styles.codeContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(index, text)}
          placeholderTextColor="#003f5c"
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
        <Text style={styles.resendButtonText}>¿No recibiste código? Reenviar</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
    width: '100%',
    marginBottom: 70,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 70,
  },
  input: {
    height: 80, // Incremento de la altura para alargar las cajas
    width: 60,
    marginHorizontal: 5,
    borderColor: '#333', // Borde gris oscuro
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de la sombra
    elevation: 5, // Sombra en Android
  },
  button: {
    backgroundColor: '#006BFF',
    paddingVertical: 17,
    paddingHorizontal: 70,
    borderRadius: 18,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1.5,
    shadowOpacity: 1.5,
    shadowColor: 'gray', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendButton: {},
  resendButtonText: {
    color: 'blue',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default CodeInput;
