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
      <View style={{ ...styles.sectionContainer }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.buttonContainer, marginTop: 20 }} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.buttonText}>Crea una cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Thin',
    color: 'black',
  },
  buttonContainer: {
    width: '90%',
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
    paddingVertical: 15, // Aumenta el espacio vertical dentro del botón
    // Propiedades de sombra
    elevation: 5, // Sombra en Android
    shadowColor: 'black', // Color de la sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra en iOS
    shadowOpacity: 0.25, // Opacidad de la sombra en iOS
    shadowRadius: 3.84, // Radio de la sombra en iOS
    // Propiedades de borde
    borderWidth: 2, // Grosor del borde
    borderColor: 'black', // Color del borde
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Tamaño de fuente personalizado
    fontWeight: 'bold',
  },
});

export default SignInView;
