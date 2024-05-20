import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const CodeInput = ({ navigation }: { navigation: any }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleVerification = () => {
    navigation.navigate('ResetPassword')
    const verificationCode = code.join('');
    if (verificationCode.length === 4) {
      alert(`¡Código ingresado: ${verificationCode}`);
    } else {
      alert('Por favor, ingresa un código de 4 dígitos.');
    }
  };

  const handleResendCode = () => {
    // Aquí puedes agregar la lógica para reenviar el código
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
      <Text style={styles.title}>Código de verificación{'\n'}<Text style={styles.subtitle}>Enviamos un código de verificación a tu email</Text></Text>
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 90,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 70,
  },
  input: {
    height: 60,
    width: 60,
    marginHorizontal: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 17,
    paddingHorizontal: 70,
    borderRadius: 15,
    marginBottom: 20,
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
