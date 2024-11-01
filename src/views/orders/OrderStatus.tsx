import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderStatus = () => {
  const orderDetails = {
    status: 'En camino', // Estado del pedido
    deliveryPerson: {
      name: 'Juan Pérez',
      rating: 4.8,
    },
    estimatedDeliveryTime: '25 minutos',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Estado de tu Pedido</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.status}>Estado: {orderDetails.status}</Text>
        <View style={styles.deliveryInfo}>
          <Text style={styles.label}>Repartidor:</Text>
          <Text style={styles.deliveryPersonName}>{orderDetails.deliveryPerson.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={15} color="#FFD700" />
            <Text style={styles.rating}>{orderDetails.deliveryPerson.rating}</Text>
          </View>
        </View>
        <Text style={styles.estimatedTime}>Tiempo estimado de entrega: {orderDetails.estimatedDeliveryTime}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  deliveryInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  deliveryPersonName: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333333',
  },
  estimatedTime: {
    fontSize: 18,
    color: '#333333',
  },
});

export default OrderStatus;
