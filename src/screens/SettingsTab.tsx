// Ruta: src/views/tabs/SettingsTab.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuraciones</Text>
      {/* Agrega aquí tus configuraciones */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SettingsTab;
