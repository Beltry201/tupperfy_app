import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const LogInView = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  

  const client_username = "david@gmail.com";
  const client_password = "1234";

  const handleLogin = () => {
    if (username === client_username.toLowerCase()) {
      if (password === client_password) {
        console.log("-- Inicio de sesión exitoso");
      }else {
        console.log("-- Contraseña incorrecta");
      }
    } else {
      console.log("-- El usuario no existe, intente de nuevo.");
    }
    console.log("Username:", username);
    console.log("Password:", password);
    navigation.navigate('HomePage')
    
  };

  const handleForgotPassword = () => {};

  const handleUsernameChange = (text: string) => {
    setUsername(text.charAt(0).toLowerCase() + text.slice(1));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text.charAt(0).toLowerCase() + text.slice(1));
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Coloca tu usuario y contraseña para iniciar sesión</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Usuario"
          placeholderTextColor="#003f5c"
          onChangeText={handleUsernameChange}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Contraseña"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordBtn} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    marginBottom: 50,
    marginTop: -70,
    textAlign: "center",
    fontWeight: "bold",
    color: 'black',
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
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
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#006BFF",
    borderRadius: 18, // Ajusta el borderRadius aquí
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    borderColor: 'black', // Agrega el borde negro
    borderWidth: 1.5, // Grosor del borde
    shadowOpacity: 1.5,
    shadowColor: 'gray',
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordBtn: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#004BFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: '90%',
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
    paddingVertical: 15, // Aumenta el espacio vertical dentro del botón
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Tamaño de fuente personalizado
    fontWeight: 'bold',
  },
});

export default LogInView;
