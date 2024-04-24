/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, useColorScheme, View, Image, Button } from 'react-native';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.sectionContainer}>
        <Image
          style={styles.logo}
          source={require('./assets/logo-tupperfy-v1.png')}
          resizeMode="contain"
        />
        <Text style={styles.title}>{"Tranqui, dejale tus tuppers a tupperfy"}</Text>
      </View>
      <View style={{ ...styles.sectionContainer}}>
        <View style={styles.buttonContainer}>
          <Button
            title="Inicia sesión"
            color='white'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
        <View style={{ ...styles.buttonContainer, marginTop: 20 }}>
          <Button
            title="Crea una cuenta"
            color='white'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logo: {
    flex: 1, // Set flex to 1 to take all available space
    width: '100%', // Set width to 100% to take all available width
    height: '100%', // Set height to 100% to take all available height
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
    width: '100%', // Establece el ancho del contenedor del botón al 100%
    paddingHorizontal: 20,
    backgroundColor:'blue',
  },
});

export default App;
