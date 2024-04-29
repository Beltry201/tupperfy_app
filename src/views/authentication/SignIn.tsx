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
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Tamaño de fuente personalizado
  },
});

export default SignInView;
