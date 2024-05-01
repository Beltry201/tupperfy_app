import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";


const LogInView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const client_username = "david@gmail.com"
  const client_password = "1234"

  const handleLogin = () => {
    if (username.toLowerCase() === client_username) {
      if (password === client_password) {
          console.log("-- Inicio de sesión exitoso")
      } else{
        console.log("-- Contraseña incorrecta")
      }
    } else {
      console.log("-- El usuario no existe, intente de nuevo.")
    }
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleForgotPassword = () => {
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
      <TouchableOpacity style={styles.forgotPasswordBtn} onPress={handleForgotPassword}>
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
    textAlign: "center",
    fontWeight: "bold",
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
    backgroundColor: "blue",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
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
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LogInView;