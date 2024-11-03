import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Dimensions, Alert, Modal } from 'react-native';
import Animated, { SlideInUp, SlideOutDown } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const UserAddresses = () => {
  const [addresses, setAddresses] = useState([
    { id: '1', address: 'Calle 123, Colonia Centro, Monterrey, NL' },
    { id: '2', address: 'Avenida Principal 456, Colonia Moderna, Guadalajara, JAL' },
    { id: '3', address: 'Boulevard Central 789, Colonia Norte, Ciudad de México, CDMX' },
  ]);
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleSearchBox = () => {
    setSearchBoxVisible(!isSearchBoxVisible);
    setEditingAddressId(null); // Reset editing when opening search box
  };

  const handleSaveAddress = () => {
    if (newAddress.trim()) {
      if (editingAddressId) {
        // Edit existing address
        setAddresses(
          addresses.map((address) =>
            address.id === editingAddressId ? { ...address, address: newAddress } : address
          )
        );
        setEditingAddressId(null);
      } else {
        // Add new address
        setAddresses([...addresses, { id: Date.now().toString(), address: newAddress }]);
      }
      setNewAddress('');
      toggleSearchBox();
    } else {
      Alert.alert('Error', 'Por favor ingresa una dirección válida.');
    }
  };

  const handleDeleteAddress = (id) => {
    Alert.alert(
      'Eliminar Dirección',
      '¿Estás seguro de que deseas eliminar esta dirección?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setAddresses(addresses.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  const handleEditAddress = (id) => {
    const addressToEdit = addresses.find((item) => item.id === id);
    if (addressToEdit) {
      setNewAddress(addressToEdit.address);
      setEditingAddressId(id);
      toggleSearchBox();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.addressText}>{item.address}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.threeDotsButton}
      >
        <Text style={styles.threeDotsText}>•••</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { handleEditAddress(item.id); setModalVisible(false); }}>
              <Text style={styles.modalOption}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { handleDeleteAddress(item.id); setModalVisible(false); }}>
              <Text style={styles.modalOption}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalOption}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Direcciones</Text>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={toggleSearchBox}>
        <Text style={styles.addButtonText}>Agregar dirección</Text>
      </TouchableOpacity>

      {isSearchBoxVisible && (
        <Animated.View
          entering={SlideInUp.duration(600)}
          exiting={SlideOutDown.duration(400)}
          style={styles.searchBoxContainer}
        >
          <Text style={styles.searchTitle}>Buscar Dirección</Text>
          <TextInput
            placeholder="Ingresa tu dirección..."
            style={styles.searchInput}
            value={newAddress}
            onChangeText={setNewAddress}
            autoFocus
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
            <Text style={styles.saveButtonText}>{editingAddressId ? 'Actualizar' : 'Guardar'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleSearchBox}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 18,
    flex: 1,
  },
  threeDotsButton: {
    padding: 10,
  },
  threeDotsText: {
    fontSize: 20,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalOption: {
    paddingVertical: 10,
    fontSize: 18,
    textAlign: 'center',
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
  searchBoxContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.7,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserAddresses;
