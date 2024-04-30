import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const CreateAccountView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !phoneNumber || !country || !city || !gender || !dateOfBirth) {
      Alert.alert('Campos Obligatorios', 'Todos los campos excepto Dirección y Género son obligatorios.');
      return;
    }

    // Lógica para crear la cuenta
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Country:', country);
    console.log('City:', city);
    console.log('Date of Birth:', dateOfBirth);
    console.log('Gender:', gender);
    console.log('Address:', address);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>¡Crea tu cuenta y pide tu próximo platillo en Tupperfy!</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Nombre"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Apellido"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de Usuario</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Nombre de Usuario"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Teléfono"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>País</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCountry}
            value={country}
            placeholder="País"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ciudad</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCity}
            value={city}
            placeholder="Ciudad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Dirección"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDateOfBirth}
            value={dateOfBirth}
            placeholder="Fecha de Nacimiento"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Género</Text>
          <TextInput
            style={styles.input}
            onChangeText={setGender}
            value={gender}
            placeholder="Género (Hombre/Mujer/Otro)"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={setPassword}
              value={password}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showHide}>{showPassword ? "Ocultar" : "Mostrar"} contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirmar contraseña"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text style={styles.showHide}>{showConfirmPassword ? "Ocultar" : "Mostrar"} contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#333',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  showHide: {
    marginLeft: 10,
    color: 'blue',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 115, // Ancho ajustado aquí
    borderRadius: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateAccountView;