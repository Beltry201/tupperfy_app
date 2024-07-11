import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const CartView = ({ navigation }: { navigation: any }) => {
  const [cartItems, setCartItems] = useState([
    { id: '3', dish: 'Hamburguesa', price: 55.52, quantity: 1 },
    // Add more items as needed
  ]);

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemText}>{item.dish}</Text>
      <Text style={styles.itemText}>Cantidad: {item.quantity}</Text>
      <Text style={styles.itemText}>Precio: ${item.price.toFixed(2)}</Text>
      <Text style={styles.itemText}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  const renderRecommendedItem = ({ item }: { item: any }) => (
    <View style={styles.recommendedItem}>
      <Text style={styles.recommendedItemText}>{item.name}</Text>
    </View>
  );

  const recommendedItems = [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' },
    { id: '4', name: 'Product 4' },
    { id: '5', name: 'Product 5' },
    { id: '6', name: 'Product 6' },
    { id: '7', name: 'Product 7' },
    { id: '8', name: 'Product 8' },
    { id: '9', name: 'Product 9' },

    // Add more recommended items
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
      />
      <View style={styles.divider}></View>
      <Text style={styles.subtitle}>Acompaña tu orden</Text>
      <FlatList
        data={recommendedItems}
        renderItem={renderRecommendedItem}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.recommendedItemsContainer}
      />
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Subtotal: ${getTotal()}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('OrderPayment')}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    position: 'absolute',
    top: 250,
    left: 20,
    right: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20, // Ajusta el margen inferior del subtítulo
  },
  recommendedItemsContainer: {
    marginBottom: 200, // Ajusta el margen inferior de las cajas recomendadas
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
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CartView;
