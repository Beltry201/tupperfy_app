import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartView = () => {
  const navigation = useNavigation();

  // Estado para los ítems en el carrito
  const [cartItems, setCartItems] = useState([
    { id: '3', dish: 'Hamburguesa', price: 55.52, quantity: 1 },
  ]);

  // Calcular el total del carrito
  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemText}>{item.dish}</Text>
      <Text style={styles.itemText}>Cantidad: {item.quantity}</Text>
      <Text style={styles.itemText}>Precio: ${item.price.toFixed(2)}</Text>
      <Text style={styles.itemText}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Carrito de Compras</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.cartList}
        />
        <View style={styles.divider}></View>
        <Text style={styles.subtitle}>Acompaña tu orden</Text>
        <ScrollView horizontal={true} style={styles.recommendedItemsContainer}>
          {/* Cajas recomendadas */}
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          <View style={styles.recommendedItem}>
            <Text style={styles.recommendedItemText}>Product</Text>
          </View>
          {/* Más cajas recomendadas aquí */}
        </ScrollView>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Subtotal: ${getTotal()}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('OrderPayment')} // Navega a la pantalla de pago (a implementar)
        >
          <Text style={styles.checkoutButtonText}>Proceder al pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  recommendedItemsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  recommendedItem: {
    width: 100,
    height: 100,
    backgroundColor: '#007BFF',
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedItemText: {
    color: '#FFF',
    fontSize: 16,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CartView;
