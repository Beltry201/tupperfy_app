import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

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

  // Ref for BottomSheet
  const bottomSheetRef = useRef(null);

  // Variables for BottomSheet snap points
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // Function to open BottomSheet
  const openBottomSheet = () => {
    bottomSheetRef.current.expand();
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

      <TouchableOpacity style={styles.contactButton} onPress={openBottomSheet}>
        <Text style={styles.contactText}>Contactar al repartidor</Text>
      </TouchableOpacity>

      {/* BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundComponent={({ style }) => (
          <View style={[style, styles.bottomSheetBackground]} />
        )}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Detalles del pedido</Text>
          <Text style={styles.bottomSheetText}>Pedido #{order.orderId}</Text>
          <Text style={styles.bottomSheetText}>Estado: {order.status}</Text>
          <Text style={styles.bottomSheetText}>Tiempo estimado: {order.estimatedTime}</Text>
          <Text style={styles.bottomSheetText}>Repartidor: {order.deliveryPerson.name}</Text>
          <Text style={styles.bottomSheetText}>Ubicación de entrega: {order.deliveryLocation}</Text>
          <TouchableOpacity style={styles.bottomSheetButton} onPress={() => console.log('Ver más detalles')}>
            <Text style={styles.bottomSheetButtonText}>Ver más detalles</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  bottomSheetBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  bottomSheetButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  bottomSheetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OrderStatus;
