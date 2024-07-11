import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OrderStatus = () => {
  // Simulated order data
  const order = {
    orderId: '123ABC',
    status: 'En camino',
    estimatedTime: '15 min',
    deliveryPerson: {
      name: 'Juan Pérez',
    },
    deliveryLocation: 'Av. Principal 123, Monterrey, MX', // Ubicación de entrega
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderId}>Pedido #{order.orderId}</Text>
        <Text style={styles.status}>{order.status}</Text>
        <Text style={styles.estimatedTime}>Tiempo estimado: {order.estimatedTime}</Text>
        <Text style={styles.deliveryLocation}>Entregar en: {order.deliveryLocation}</Text>
      </View>
      
      <View style={styles.deliveryPerson}>
        <Text style={styles.deliveryPersonName}>{order.deliveryPerson.name}</Text>
      </View>

      {/* Aquí podrías incluir un mapa con la ubicación del repartidor o del destino */}
      
      <TouchableOpacity style={styles.contactButton} onPress={() => console.log('Contactar al repartidor')}>
        <Text style={styles.contactText}>Contactar al repartidor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  orderDetails: {
    alignItems: 'center',
  },
  orderId: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  estimatedTime: {
    fontSize: 16,
    marginBottom: 10,
  },
  deliveryLocation: {
    fontSize: 16,
    marginBottom: 20,
  },
  deliveryPerson: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  deliveryPersonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderStatus;
