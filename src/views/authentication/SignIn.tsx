import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const SignInView = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.sectionContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo-tupperfy-v1.png')}
          resizeMode="contain"
        />
        <Text style={styles.title}>{"Tranqui, dejale tus tuppers a tupperfy"}</Text>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={[styles.buttonContainer, styles.buttonSignIn]} onPress={() => navigation.navigate('LogIn')}>
          <Text style={[styles.buttonText, styles.buttonTextSignIn]}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.buttonText}>Crea una cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Thin',
    color: 'black',
  },
  buttonSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '90%',
    paddingHorizontal: 20,
    backgroundColor: '#d3d3d3',  // Color de fondo gris clarito para "Crea una cuenta"
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 15,
    // Propiedades de sombra
    elevation: 5, // Sombra en Android
    shadowColor: 'black', // Color de la sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra en iOS
    shadowOpacity: 1.5, // Opacidad de la sombra en iOS
    shadowRadius: 3, // Radio de la sombra en iOS
    // Propiedades de borde
    borderWidth: 1.5, // Grosor del borde
    borderColor: 'black', // Color del borde
  },
  buttonSignIn: {
    backgroundColor: '#005BFF',  // Color de fondo azul original para "Iniciar sesión"
    marginBottom: 15,
  },
  buttonText: {
    color: 'black',  // Color del texto por defecto (para "Crea una cuenta")
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextSignIn: {
    color: 'white',  // Color del texto para "Iniciar sesión"
  },
});

export default SignInView;
