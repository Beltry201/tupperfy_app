import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const UserAddresses = () => {
  // Ejemplo de direcciones de usuario
  const [addresses, setAddresses] = useState([
    { id: '1', address: 'Calle 123, Colonia Centro, Monterrey, NL' },
    { id: '2', address: 'Avenida Principal 456, Colonia Moderna, Guadalajara, JAL' },
    { id: '3', address: 'Boulevard Central 789, Colonia Norte, Ciudad de México, CDMX' },
    // Añade más direcciones según sea necesario
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.addressText}>{item.address}</Text>
    </View>
  );

  const handleAddAddress = () => {
    // Aquí puedes agregar la lógica para agregar una nueva dirección
    Alert.alert('Agregar dirección', 'Aquí puedes implementar la funcionalidad para agregar una nueva dirección.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Direcciones</Text>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text style={styles.addButtonText}>Agregar dirección</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatListContainer: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  addressText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserAddresses;
