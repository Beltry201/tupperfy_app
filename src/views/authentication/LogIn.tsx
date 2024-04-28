import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LogInView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para verificar las credenciales del usuario
    // Por ejemplo, enviar una solicitud a un servidor para autenticar al usuario
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Coloca tu usuario y contraseña para iniciar sesión</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Usuario"
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Contraseña"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  headerText:{
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'blue', // Cambiando el color a azul
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LogInView;