import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const OrderStatus = ({ navigation }: { navigation: any }) => {
  // Datos simulados del pedido
  const order = {
    orderId: '12345',
    status: 'En camino',
    estimatedTime: '10 minutos',
    driver: {
      name: 'Juan Pérez',
      vehicle: 'Moto',
      licensePlate: 'ABC123',
    },
    deliveryAddress: 'Calle Principal 123, Ciudad',
  };

  // Función para manejar el cierre de la pantalla
  const handleClose = () => {
    navigation.navigate('HomePage'); // Navegar de regreso al HomePage
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón de cerrar */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <IoniconsIcon name="close" size={24} color="#333" />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.orderId}>Pedido #{order.orderId}</Text>
        <Text style={styles.status}>{order.status}</Text>
        <Text style={styles.estimatedTime}>Tiempo estimado: {order.estimatedTime}</Text>
      </View>
      <View style={styles.deliveryInfo}>
        <Text style={styles.sectionTitle}>Información de la entrega</Text>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatarContainer}>
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{order.driver.name}</Text>
            <Text style={styles.driverVehicle}>{order.driver.vehicle} - {order.driver.licensePlate}</Text>
          </View>
        </View>
        <Text style={styles.deliveryAddress}>{order.deliveryAddress}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  header: {
    marginBottom: 20,
  },
  orderId: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 10,
  },
  estimatedTime: {
    fontSize: 16,
    marginBottom: 10,
  },
  deliveryInfo: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  driverAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 10,
  },
  driverAvatar: {
    width: '100%',
    height: '100%',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  driverVehicle: {
    fontSize: 14,
    color: '#666',
  },
  deliveryAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default OrderStatus;
