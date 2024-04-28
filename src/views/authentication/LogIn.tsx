import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';


function LogInView(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.sectionContainer}>
        <Text>{"hola"}</Text>
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

export default LogInView;
