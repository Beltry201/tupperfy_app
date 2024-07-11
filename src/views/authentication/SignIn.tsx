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
    fontFamily: 'Montserrat-Thin', // Asegúrate de que este nombre sea correcto
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
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.5,
    shadowRadius: 3,
    borderWidth: 1.5,
    borderColor: 'black',
  },
  buttonSignIn: {
    backgroundColor: '#005BFF',
    marginBottom: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextSignIn: {
    color: 'white',
  },
});


export default SignInView;
