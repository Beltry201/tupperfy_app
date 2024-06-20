import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuView = () => {
  const handleCustomizeMenu = () => {
    // Aquí puedes implementar la lógica para personalizar el menú
    console.log('Personalizando menú...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mi Menú Personalizado</Text>
        <TouchableOpacity style={styles.customizeButton} onPress={handleCustomizeMenu}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.emptyMenuText}>Aún no has creado ningún menú</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  customizeButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMenuText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default MenuView;
